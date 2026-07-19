import otpGenerator from "otp-generator";
import otpRepository from "../repositories/otp.repository.js";
import User from "../Model/user.model.js";
import { sendEmailOtp } from "../utils/notify.js";

const OTP_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 60;

function generateOtp() {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });
}

async function sendEmailVerificationOtp(identifier) {
  const user = await User.findOne({email:identifier});

  if (!user) {
    throw new Error("User with this mail does not exist ");
  }

  if (user.isVerified) {
    throw new Error("Email is already verified");
  }

  const existing = await otpRepository.findLatestByIdentifier(
    identifier,
    "email_verification",
  );
  if (existing) {
    const secondsSinceLastSent =
      (Date.now() - existing.createdAt.getTime()) / 1000;
    if (secondsSinceLastSent < RESEND_COOLDOWN_SECONDS) {
      throw new Error(
        `Please wait ${Math.ceil(RESEND_COOLDOWN_SECONDS - secondsSinceLastSent)}s before requesting another OTP`,
      );
    }
  }

  await otpRepository.deleteByIdentifier(identifier, "email_verification");

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await otpRepository.create({
    identifier,
    otp,
    purpose: "email_verification",
    expiresAt,
  });

  await sendEmailOtp(identifier, otp);

  return { message: `OTP sent to ${identifier}` };
}

async function verifyEmailOtp(identifier, submittedOtp) {
  const record = await otpRepository.findLatestByIdentifier(
    identifier,
    "email_verification",
  );
  if (!record) {
    throw new Error("No OTP found. Please request a new one.");
  }

  if (record.expiresAt < new Date()) {
    throw new Error("OTP has expired. Please request a new one.");
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await otpRepository.deleteByIdentifier(identifier, "email_verification");
    throw new Error("Too many incorrect attempts. Please request a new OTP.");
  }

  if (record.otp !== submittedOtp) {
    record.attempts += 1;
    await record.save();
    throw new Error(
      `Incorrect OTP. ${MAX_ATTEMPTS - record.attempts} attempt(s) remaining.`,
    );
  }

  await otpRepository.deleteByIdentifier(identifier, "email_verification");

  const user = await User.findOne({ email:identifier });
  if (!user) throw new Error("User not found");

  user.isVerified = true;
  await user.save();

  return { message: "Email verified successfully" };
}

export default {sendEmailVerificationOtp,verifyEmailOtp}
