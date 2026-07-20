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

## Detailed API Reference (for frontend developers)

Base path: `/api/v1`

Global response wrappers (used throughout):

- Success wrapper

```json
{
  "successResponse": {
    "error": {},
    "data": {},
    "message": "<human message>",
    "success": true
  }
}
```

- Error wrapper

```json
{
  "errorResponse": {
    "error": {},
    "data": {},
    "message": "<error message>",
    "success": false
  }
}
```

Authentication notes:
- Login returns an accessToken in `successResponse.data.accessToken` and sets a refreshToken cookie (cookie name `refreshToken`).
- Send the access token on protected requests via header: `Authorization: Bearer <accessToken>`
- Role-based routes use `restrictTo(...)` (e.g., `customer`, `vendor`, `admin`).

---

1) Products

GET /api/v1/products?page=&limit=&search=
- Auth: public
- Query params: page (number, default 1), limit (number, default 12), search (string)

Request: (no body)

Response success (200):

```json
{
  "successResponse": {
    "data": {
      "products": [ { /* product */ }, ... ],
      "pagination": {
        "total": 123,
        "page": 1,
        "limit": 12,
        "totalPages": 11,
        "hasNextPage": true,
        "hasPrevPage": false
      }
    },
    "message": "This is the result for the pagination",
    "success": true
  }
}
```

GET /api/v1/products/:id
- Auth: public
- Path param: id

Request: (no body)

Response success (200):

```json
{
  "successResponse": {
    "data": {
      "_id": "<productId>",
      "productName": "Gold Heart Necklace",
      "productDescription": "...",
      "price": 2500,
      "discountPrice": null,
      "category": "necklaces",
      "stockQuantity": 10,
      "productImageUrl": ["https://..."],
      "vendorId": "<vendorId>",
      "slug": "gold-heart-necklace",
      "inStock": true
    },
    "message": "Product detail for the product is <id>",
    "success": true
  }
}
```

POST /api/v1/products
- Auth: intended for vendor (route currently not enforcing role in code)
- Body (JSON):

```json
{
  "productName": "string",
  "productDescription": "string",
  "price": 1234.5,
  "category": "rings|necklaces|earrings|bracelets|anklets|other",
  "productImageUrl": ["https://..."],
  "discountPrice": 1000,         // optional
  "stockQuantity": 10            // optional
}
```

Response success (201):

```json
{
  "successResponse": {
    "data": { /* created product object */ },
    "message": "Product created successfully",
    "success": true
  }
}
```

PATCH /api/v1/products/:id
- Auth: intended for vendor
- Body: partial product JSON (fields to update)

Request example:

```json
{
  "price": 1999,
  "stockQuantity": 5
}
```

Response success (200):

```json
{
  "successResponse": {
    "data": { /* updated product */ },
    "message": "Product is updated sucessfully",
    "success": true
  }
}
```

DELETE /api/v1/products/:id
- Auth: intended for vendor
- Request: (no body)
- Response success (200):

```json
{
  "successResponse": {
    "data": { /* deleted product or delete result */ },
    "message": "Product is deleted",
    "success": true
  }
}
```

---

2) Cart (all /api/v1/cart routes require Authorization: Bearer <accessToken> and role `customer`)

GET /api/v1/cart
- Auth: required (customer)
- Request: (no body)

Response success (200):

```json
{
  "successResponse": {
    "data": {
      "_id": "<cartId>",
      "userId": "<userId>",
      "items": [
        {
          "productId": "<productId>",
          "vendorId": "<vendorId>",
          "quantity": 2,
          "priceAtAdd": 2500
        }
      ],
      "totalAmount": 5000
    },
    "message": "Cart fetched successfully",
    "success": true
  }
}
```

POST /api/v1/cart/items
- Auth: required (customer)
- Body:

```json
{
  "productId": "<productId>",
  "quantity": 2   // optional, default 1
}
```

Response success (200):

```json
{
  "successResponse": {
    "data": { /* updated cart object */ },
    "message": "Item added to cart successfully",
    "success": true
  }
}
```

PATCH /api/v1/cart/items/:productId
- Auth: required (customer)
- Body:

```json
{ "quantity": 3 }
```

Response success (200):

```json
{
  "successResponse": {
    "data": { /* updated cart */ },
    "message": "Cart item updated successfully",
    "success": true
  }
}
```

DELETE /api/v1/cart/items/:productId
- Auth: required (customer)
- Request: (no body)

Response success (200):

```json
{
  "successResponse": {
    "data": { /* updated cart */ },
    "message": "Item removed from cart successfully",
    "success": true
  }
}
```

DELETE /api/v1/cart
- Auth: required (customer)
- Request: (no body)

Response success (200):

```json
{
  "successResponse": {
    "data": { "items": [] },
    "message": "Cart cleared successfully",
    "success": true
  }
}
```

---

3) Auth / User

POST /api/v1/user/signUp
- Auth: public
- Body:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "9876543210",
  "password": "password123",
  "role": "customer"   // optional
}
```

Response success (201):

```json
{
  "successResponse": {
    "data": { /* created user (no password) */ },
    "message": "User Register sucessfully",
    "success": true
  }
}
```

POST /api/v1/user/signin
- Auth: public
- Body:

```json
{ "identifier": "alice@example.com", "password": "password123" }
```

Response success (200):

```json
{
  "successResponse": {
    "data": {
      "user": { /* user object */ },
      "accessToken": "<jwt>"
    },
    "message": "User signed in successfully",
    "success": true
  }
}
```

GET /api/v1/user/:id
- Auth: public (in current code)
- Request: (no body)

Response success (200):

```json
{
  "successResponse": {
    "data": { /* user object */ },
    "message": "User Detail",
    "success": true
  }
}
```

---

4) Orders

POST /api/v1/orders/buy-now
- Auth: required (customer)
- Body:

```json
{
  "productId": "<productId>",
  "quantity": 1,
  "shippingAddress": {
    "fullName": "Alice",
    "phone": "9876543210",
    "addressLine": "123 Street",
    "city": "City",
    "state": "State",
    "pincode": "000000"
  }
}
```

Response success (201):

```json
{
  "successResponse": {
    "data": {
      "orderId": "<orderId>",
      "amount": 2500
    },
    "message": "Order prepared, proceed to payment",
    "success": true
  }
}
```

Note: Payment integration (Razorpay) is stubbed/commented out in code.

---

5) SubOrder (vendor-facing)

GET /api/v1/suborder/:vendorid
- Auth: intended for vendor/admin
- Request: (no body)

Response success (200):

```json
{
  "successResponse": {
    "data": [ /* subOrder objects */ ],
    "message": "All the suborders for you",
    "success": true
  }
}
```

PATCH /api/v1/suborder/:id
- Auth: intended for vendor
- Body:

```json
{ "status": "confirmed" }
```

Response success (200):

```json
{
  "successResponse": {
    "data": { /* updated subOrder */ },
    "message": "updated suborder f",
    "success": true
  }
}
```

DELETE /api/v1/suborder/:id
- Auth: intended for vendor/admin
- Request: (no body)

Response success (200):

```json
{
  "successResponse": {
    "data": { /* deletion result */ },
    "message": "Suborder deleted Sucessfull",
    "success": true
  }
}
```

---

6) OTP

POST /api/v1/otp/send
- Auth: public
- Body:

```json
{ "identifier": "alice@example.com" }
```

Response success (200):

```json
{
  "successResponse": {
    "data": { "message": "OTP sent to alice@example.com" },
    "message": "OTP sent to alice@example.com",
    "success": true
  }
}
```

POST /api/v1/otp/verify
- Auth: public
- Body:

```json
{ "identifier": "alice@example.com", "otp": "123456" }
```

Response success (200):

```json
{
  "successResponse": {
    "data": { "message": "Email verified successfully" },
    "message": "Email verified successfully",
    "success": true
  }
}
```

---

7) Vendor

POST /api/v1/vendor/apply
- Auth: required (customer)
- Body:

```json
{ "shopName": "Alice's Jewelry", "description": "Handcrafted ...", "logo": "https://..." }
```

Response success (200):

```json
{
  "successResponse": {
    "data": { /* user object with vendorProfile */ },
    "message": "Vendor application submitted. Awaiting admin approval.",
    "success": true
  }
}
```

GET /api/v1/vendor/profile
- Auth: required (vendor)
- Request: (no body)

Response success (200):

```json
{
  "successResponse": {
    "data": { /* vendor user object */ },
    "message": "Vendor profile fetched successfully",
    "success": true
  }
}
```

---

8) Admin

GET /api/v1/admin/vendors/pending
- Auth: required (should be admin; current route does not enforce role but controller expects it)

Response success (200):

```json
{
  "successResponse": {
    "data": [ /* user vendor objects */ ],
    "message": "Pending vendor applications fetched successfully",
    "success": true
  }
}
```

PATCH /api/v1/admin/vendors/:vendorId/approve
- Auth: required (should be admin)
- Path param: vendorId

Response success (200):

```json
{
  "successResponse": {
    "data": { /* updated user */ },
    "message": "Vendor approved successfully",
    "success": true
  }
}
```

Base path: `/api/v1`

Global response wrappers (used throughout):
- Success:

{
  "successResponse": {
    "error": {},
    "data": <object|array>,
    "message": "<human message>",
    "success": true
  }
}

- Error:

{
  "errorResponse": {
    "error": {},
    "data": {},
    "message": "<error message>",
    "success": false
  }
}

Authentication notes:
- Login returns an accessToken in successResponse.data.accessToken and sets a refreshToken cookie (cookie name `refreshToken`).
- Send the access token on protected requests via header: `Authorization: Bearer <accessToken>`
- Role-based routes use `restrictTo(...)` (e.g., `customer`, `vendor`, `admin`)

---

1) Products

GET /api/v1/products?page=&limit=&search=
- Public. Query params:
  - page (number, optional, default 1)
  - limit (number, optional, default 12)
  - search (string, optional)
- Response.data:
  {
    "products": [ {product}, ... ],
    "pagination": { total, page, limit, totalPages, hasNextPage, hasPrevPage }
  }

GET /api/v1/products/:id
- Public. Path param: id
- Response.data: single product object

POST /api/v1/products
- Create a product (intended for vendor).
- Body (application/json):
  {
    "productName": "string",
    "productDescription": "string",
    "price": number,
    "category": "rings|necklaces|earrings|bracelets|anklets|other",
    "productImageUrl": ["string"],
    "vendorId": "<vendorId>",
    // optional: discountPrice, weight, dimensions, stockQuantity, tags, status
  }
- Response.data: created product

PATCH /api/v1/products/:id
- Body: partial product fields to update
- Response.data: updated product

DELETE /api/v1/products/:id
- Response.data: deletion result / deleted product

Note: The code registers two handlers on GET /products (paginated and getAll). Use the paginated query (page/limit/search) for lists.

---

2) Cart (all /api/v1/cart routes require Authorization: Bearer <accessToken> and role `customer`)

GET /api/v1/cart
- Returns the current user's cart (or creates an empty cart)
- Response.data example:
  {
    "_id": "...",
    "userId": "...",
    "items": [ { productId, vendorId, quantity, priceAtAdd } ],
    "totalAmount": number
  }

POST /api/v1/cart/items
- Body:
  { "productId": "<id>", "quantity": number (optional, default 1) }
- Validations: product must exist, status must be "active", quantity > 0 and <= stock
- Response.data: updated cart

PATCH /api/v1/cart/items/:productId
- Body: { "quantity": number }
- If quantity <= 0, item is removed
- Response.data: updated cart

DELETE /api/v1/cart/items/:productId
- Removes the specified item
- Response.data: updated cart

DELETE /api/v1/cart
- Clears the cart
- Response.data: cleared cart (items: [])

---

3) Auth / User

POST /api/v1/user/signUp
- Body:
  {
    "name": "string",
    "email": "string",   // or phone
    "phone": "string",
    "password": "string (min 8)",
    // optional: role
  }
- Response: 201 created with created user in successResponse.data

POST /api/v1/user/signin
- Body:
  { "identifier": "email_or_phone", "password": "string" }
- Response: 200 with successResponse.data = { user: {...}, accessToken: "..." }
  - refreshToken is set as a cookie named `refreshToken`

GET /api/v1/user/:id
- Public in current code; returns user detail
- Response.data: user object

Note: There is also a `src/routes/v1/user.routes.js` file that defines createUser/getAllUser — verify which route set the team intends to use; current v1 index mounts `auth.routes.js` at `/user`.

---

4) Orders

POST /api/v1/orders/buy-now
- Auth required (customer)
- Body:
  {
    "productId": "string",
    "quantity": number,
    "shippingAddress": { fullName, phone, addressLine, city, state, pincode }
  }
- Validations: productId, quantity, shippingAddress required; product must be active and have enough stock
- Response (201):
  {
    "orderId": "<id>",
    "amount": number
  }
- Note: Payment integration (Razorpay) is stubbed/commented out. Frontend should call payment gateway once backend returns order preparation response.

---

5) SubOrder (vendor-facing)

GET /api/v1/suborder/:vendorid
- Returns all suborders for vendor id (path param)
- Response.data: [ subOrder, ... ]

PATCH /api/v1/suborder/:id
- Body: { "status": "placed|confirmed|shipped|delivered|cancelled" }
- Response.data: updated subOrder

DELETE /api/v1/suborder/:id
- Deletes suborder
- Response.data: deletion result

Note: Routes currently don't consistently enforce auth/role checks in code — coordinate with backend team for intended protections.

---

6) OTP

POST /api/v1/otp/send
- Body: { "identifier": "email@example.com" }
- Sends email OTP for verification; rate-limited (60s cooldown)
- Response.data: { message: "OTP sent to <identifier>" }

POST /api/v1/otp/verify
- Body: { "identifier": "email@example.com", "otp": "123456" }
- Verifies OTP, marks user.isVerified = true on success
- Response.data: { message: "Email verified successfully" }

---

7) Vendor

POST /api/v1/vendor/apply
- Auth required (customer)
- Body: { shopName: string, description: string, logo?: string }
- Behavior: converts user.role -> vendor and creates vendorProfile.isApproved = false; notifies admin
- Response.data: user object with vendorProfile

GET /api/v1/vendor/profile
- Auth required (vendor)
- Returns vendor profile for logged-in user

---

8) Admin

GET /api/v1/admin/vendors/pending
- Auth required (should be admin; current route does not enforce role but controller expects it)
- Response.data: [ user vendor objects ]

PATCH /api/v1/admin/vendors/:vendorId/approve
- Auth required (should be admin)
- Path param: vendorId
- Approves vendor (sets vendorProfile.isApproved = true and approvedAt)
- Response.data: updated user

---

Frontend integration notes & gotchas
- Always include: `Authorization: Bearer <accessToken>` for protected routes.
- Access token verification uses environment secret (JWT) in backend. Refresh token is set as an HttpOnly cookie (name `refreshToken`).
- Response shape is mostly standardized, but some endpoints may return alternative shapes (e.g., `getAllUser` uses `{ allUser: [...] }`). Handle responses defensively.
- Several routes in code lack explicit role enforcement in the route file — verify intended access rules with backend team before relying on them in UI.
- Product.create requires `vendorId` in model — in a secured implementation vendorId should be derived from `req.user` not the request body.
- Checkout / payment flow: backend returns an `orderId` and `amount` in buy-now. Payment provider integration is currently commented/stubbed.

---

Appendix: Example requests/responses

Sign in
POST /api/v1/user/signin
Request:
{
  "identifier": "alice@example.com",
  "password": "password123"
}
Response 200:
{
  "successResponse": {
    "data": { "user": { /* user object */ }, "accessToken": "ey..." },
    "message": "User signed in successfully",
    "success": true
  }
}

Add item to cart
POST /api/v1/cart/items
Headers: Authorization: Bearer <accessToken>
Request:
{ "productId": "64abcd...", "quantity": 2 }
Response 200:
{
  "successResponse": {
    "data": { "_id": "...", "userId": "...", "items": [ { "productId": "...", "quantity": 2, "priceAtAdd": 2500 } ], "totalAmount": 5000 },
    "message": "Item added to cart successfully",
    "success": true
  }
}

Buy now
POST /api/v1/orders/buy-now
Headers: Authorization: Bearer <accessToken>
Request:
{
  "productId": "64abcd...",
  "quantity": 1,
  "shippingAddress": { "fullName": "Alice", "phone": "9876543210", "addressLine": "123 St", "city": "City", "state": "State", "pincode": "000000" }
}
Response 201:
{
  "successResponse": {
    "data": { "orderId": "65ef...", "amount": 2500 },
    "message": "Order prepared, proceed to payment",
    "success": true
  }
}

---

## Contributing

- For small fixes or docs improvements, open an issue or a PR with a clear description.
- For code changes: follow the existing project style, run local smoke tests, and describe migration or environment changes in the PR.

## Notes

- Error handling is standardized in *shape* (`responsebody`) but not yet centralized — every controller repeats its own try/catch instead of one Express error-handling middleware catching everything.

## License

Private — freelance project, open source.
