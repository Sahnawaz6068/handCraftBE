# HandCraft — Backend API

Backend API for HandCraft, a multi-vendor handmade jewelry marketplace. This project provides the server-side implementation (Node.js + Express + MongoDB) with an MVC + Service Layer architecture, JWT-based authentication, role-based access control, and core modules for products, cart, and users.

> Note: This repository contains an existing lowercase `readme.md` with implementation notes and a checklist. This README is a polished, user-facing overview and quick start.

## Key information

- Language & runtime: Node.js (ES modules)
- Framework: Express
- Database: MongoDB (Mongoose)
- Auth: JSON Web Tokens (JWT) with cookie-based access/refresh pattern
- Validation: Joi (planned)
- Logging & security: Helmet, CORS, express-mongo-sanitize (patterns used/planned)

## Table of contents

- Features
- Project structure
- Getting started
- Environment variables
- Available scripts
- API overview
- Implemented modules and TODOs
- Contributing
- License

## Features

- User authentication: signup, signin, refresh token, logout (cookie-based tokens)
- Role-based access control: customer, vendor, admin
- Product module: vendor-scoped CRUD, search & filtering, pagination
- Cart module: add/update/remove items, price snapshot at add-time
- Standardized API response shapes

## Project structure

```
src/
├── config/         # DB connection, env validation, logger
├── models/         # Mongoose schemas (User, Product, Order, Vendor)
├── controllers/    # HTTP request/response handling only
├── services/       # Business logic
├── routes/         # Route definitions per module
├── middlewares/    # auth, role-based access, error handling, validation
├── utils/          # ApiError, ApiResponse, asyncHandler
├── validators/     # Joi schemas (planned)
index.js             # Entry point (root)
```

## Getting started (local)

Prerequisites:
- Node.js (v18+ recommended)
- MongoDB running locally or accessible via URI

1. Clone the repository

```bash
git clone https://github.com/Sahnawaz6068/handCraftBE.git
cd handCraftBE
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root with the necessary variables (example below)

4. Run the server in development

```bash
npm run dev
```

The default entry point is `index.js`.

## Environment variables

Create a `.env` file at the project root. Example variables used by the app:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/handcraft
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

Adjust values to match your environment and secrets management policy.

## Available scripts

From package.json:

- `npm run dev` — start with nodemon (development)
- `npm test` — placeholder: currently prints an error (no tests configured)

Add/adjust scripts as CI or deployment needs evolve (e.g., `start`, `lint`, `build`, `test`).

## API overview (high level)

Auth endpoints (examples):
- POST `/auth/signup` — register a new user (customer/vendor)
- POST `/auth/signin` — login and receive tokens (cookies)
- POST `/auth/refresh-token` — rotate/refresh access token (requires refresh cookie)
- POST `/auth/logout` — clear tokens

Products (examples):
- POST `/products` — create product (vendor)
- GET `/products` — list products with filters (public)
- GET `/products/:id` — get single product (public)
- PATCH `/products/:id` — update product (vendor only)
- DELETE `/products/:id` — delete product (vendor only)

Cart (examples):
- GET `/cart` — get current cart (buyer)
- POST `/cart/items` — add item to cart (buyer)
- PATCH `/cart/items/:productId` — update item quantity
- DELETE `/cart/items/:productId` — remove item from cart

Refer to the code in `src/routes` and `src/controllers` for complete route lists and request/response shapes.

## Implemented modules & current roadmap

Implemented / verified:
- Project structure (MVC + Service Layer)
- DB connection with retry/fail-fast logic
- Auth module (signup/signin, cookie-based JWT access + refresh tokens)
- Role-based access middleware (`restrictTo`)
- Standardized API response format (`successResponse` / `errorResponse` patterns)
- Product module (CRUD scoped to vendor)
- Product search & filter (category, price range, text search, pagination)
- Cart module (add/update/remove items, price snapshot at add-time)

Planned / TODO (non-exhaustive):
- Centralized Express error-handling middleware (to replace repetitive try/catch)
- Refresh token rotation + secure logout / token invalidation
- Vendor onboarding + admin approval flow
- Checkout flow (Order + SubOrder creation, payment integration)
- Payment integration (e.g., Razorpay)
- Atomic stock decrement and transaction safety for checkout
- Reviews & ratings, vendor dashboard, admin analytics

## Contributing

- For small fixes or docs improvements, open an issue or a PR with a clear description.
- For code changes: follow the existing project style, run local smoke tests, and describe migration or environment changes in the PR.

If you'd like, an initial contributor checklist or guidelines can be added to simplify onboarding.

## Notes

- There is an existing `readme.md` file in the repository with implementation notes and a checklist. This README aims to be a polished, user-facing entry point while the existing file remains as an internal tracker.

## License

Private — portfolio/freelance project. Not open source.

---

If you'd like, the README can be extended with:
- Detailed API reference (OpenAPI / Postman collection)
- Environment-specific setup (Docker, Docker Compose)
- Testing & CI guidelines
- Deployment steps (Heroku / VPS / Docker)

If that sounds helpful, say which sections to expand and any preferences (e.g., include Docker, OpenAPI, or examples).
 
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