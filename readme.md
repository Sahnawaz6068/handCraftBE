# Handcraft Backend
 
Multi-vendor handmade jewelry marketplace — backend API built with Node.js, Express, and MongoDB, following an MVC + Service Layer architecture.
 
## Tech Stack
 
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT, bcryptjs
- **Validation:** Joi
- **Security:** Helmet, CORS, express-mongo-sanitize
- **Logging:** Winston (production)
## Folder Structure
 
```
src/
├── config/         # DB connection, env validation, logger
├── models/         # Mongoose schemas (User, Product, Order, Vendor)
├── controllers/    # HTTP request/response handling only
├── services/       # Business logic
├── routes/         # Route definitions per module
├── middlewares/     # auth, role-based access, error handling, validation
├── utils/          # ApiError, ApiResponse, asyncHandler
├── validators/     # Joi schemas
├── index.js          # Entry point
```
 
## Roles
 
- `customer` — browse, cart, checkout, orders
- `vendor` — manage own products, view sub-orders, payouts
- `admin` — approve vendors, manage commissions, platform analytics
## Getting Started
 
### 1. Clone and install
```bash
git clone <https://github.com/Sahnawaz6068/handCraftBE>
cd handCraftBE
npm install
```
 
### 2. Environment variables
Create a `.env` file in the root (see `.env.example`):
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/handcraft
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```
 
### 3. Run the server
```bash
# development (with nodemon)
npm run dev
 
# production
npm start
```
 
## API Base URL
 
```
/api/v1
```
 
## Modules Implemented
 
- [x] Project structure (MVC + Service Layer)
- [x] DB connection with retry/fail-fast logic
- [ ] Centralized error handling
- [ ] Standardized API response format
- [ ] Auth module (signup/login/JWT) — in progress
- [ ] Vendor module
- [ ] Product module
- [ ] Order / SubOrder module
- [ ] Payments
- [ ] Reviews
- [ ] Admin analytics
