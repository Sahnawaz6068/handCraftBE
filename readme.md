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
 
## API Endpoints (implemented so far)

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/signup` | Public | Register new user (buyer/vendor) |
| POST | `/auth/signin` | Public | Login, sets accessToken + refreshToken cookies |
| POST | `/auth/refresh-token` | Public (needs refreshToken cookie) | Issue new accessToken |
| POST | `/auth/logout` | Authenticated | Clear auth cookies |

### Products
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/products` | Vendor | Create product |
| GET | `/products` | Public | List products with filters (category, price, search, pagination) |
| GET | `/products/:id` | Public | Get single product |
| PATCH | `/products/:id` | Vendor (owner only) | Update product |
| DELETE | `/products/:id` | Vendor (owner only) | Delete product |

### Cart
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/cart` | Buyer | Get current cart |
| POST | `/cart/items` | Buyer | Add item to cart |
| PATCH | `/cart/items/:productId` | Buyer | Update item quantity |
| DELETE | `/cart/items/:productId` | Buyer | Remove item from cart |
| DELETE | `/cart` | Buyer | Clear cart |

## Modules Implemented

- [x] Project structure (MVC + Service Layer)
- [x] DB connection with retry/fail-fast logic
- [x] Auth module (signup/signin, cookie-based JWT with access + refresh tokens)
- [x] Role-based access middleware (`restrictTo`)
- [x] Standardized API response format (`responsebody` — successResponse/errorResponse pattern)
- [x] Product module (CRUD scoped to vendor)
- [x] Product search & filter (category, price range, text search, pagination)
- [x] Cart module (add/update/remove items, price snapshot at add-time)
- [ ] Centralized error-handling middleware (currently per-controller try/catch using `responsebody`, not a single Express error middleware)
- [ ] Refresh token rotation + logout (blacklist/invalidate on logout)
- [ ] Vendor onboarding + admin approval flow
- [ ] Checkout (cart → Order + SubOrder, price/stock re-validation)
- [ ] Order / SubOrder module
- [ ] Payment integration (Razorpay)
- [ ] Stock decrement on payment success (transaction-safe, race-condition safe)
- [ ] Reviews & ratings
- [ ] Vendor dashboard (sales, payouts)
- [ ] Admin analytics dashboard

## Known Gaps / Tech Debt

- Error handling is standardized in *shape* (`responsebody`) but not yet centralized — every controller repeats its own try/catch instead of one Express error-handling middleware catching everything
- No request validation middleware yet — Joi schemas are planned (`validators/`) but not wired into routes
- No transaction handling for multi-collection writes yet — required before Checkout is safe to build (Order + SubOrder + stock decrement must succeed or roll back together)
- Stock race condition not yet handled — two buyers checking out the last unit simultaneously needs an atomic `findOneAndUpdate` with a stock guard, not a read-then-write check

## License

Private — portfolio/freelance project, not open source.