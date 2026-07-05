function restrictTo(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        errorResponse: {
          message: "Access denied: insufficient permissions",
          success: false,
        },
      });
    }
    next();
  };
}

export default restrictTo;