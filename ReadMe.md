# Tech Gadget Store: E-Commerce SPA

## 1. Project Overview
This project implements a dynamic, Single-Page Application (SPA) designed to simulate a modern e-commerce environment. The primary problem this application solves is reducing user friction during the shopping experience. By decoupling the frontend from the backend and utilizing asynchronous data fetching, the system allows users to browse products, manipulate cart quantities, and view real-time total calculations without experiencing disruptive page reloads.

## 2. Technical Stack
**Frontend Architecture**
* **Library:** React.js (Bootstrapped with Vite)
* **Styling:** Vanilla CSS with responsive CSS Grid/Flexbox layouts
* **State Management:** React Hooks (`useState`, `useEffect`)

**Backend Architecture**
* **Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose 

**Network / API**
* RESTful API design handling native JSON payloads
* Cross-Origin Resource Sharing (CORS) enabled for decoupled port communication

## 3. Core Features
* **True SPA Behavior:** Zero page reloads; dynamic DOM rendering based on state.
* **Full CRUD Implementation:**
  * **Create:** Add new items to the shopping cart.
  * **Read:** Fetch product catalogs and current cart states from the database.
  * **Update:** Modify existing cart item quantities.
  * **Delete:** Remove items entirely when quantity drops below one or upon explicit request.
* **Dynamic Cart Calculation:** Real-time financial totals computed securely on state changes.
* **Responsive UI:** Mobile-first layout adaptations using modern CSS practices.

## 4. Folder Structure
```
32516_Assignment1/
│
├── backend/
│   ├── .env               # Environment variables (Port, MongoDB URI)
│   ├── package.json       # Backend dependencies
│   ├── seed.js            # Initial database population script
│   └── server.js          # Express server setup and REST API routes
│
└── frontend/
    ├── package.json       # Frontend dependencies (Vite, React)
    ├── index.html         # Single HTML entry point
    ├── .gitignore         # Git ignore file
    ├── public/
    │   └── images/        # Product images
    │       ├── headphone.png   
    │       ├── keyboard.png
    │       ├── monitor.png
    │       └── mouse.png
    └── src/
        ├── App.jsx        # Main application logic and API integration
        ├── App.css        # Global styles and UI layout
        └── main.jsx       # React DOM rendering
```
## 5. Installation & Setup Instructions

### Prerequisites

* **Node.js** (v14 or higher)
* **MongoDB Community Server** (v4.4 or higher)

**Step 1:** Install and Configure MongoDB (Local Windows Setup)

* Navigate to the [MongoDB Download Center](https://www.mongodb.com/try/download/community).

* Download the MongoDB Community Server .msi installer for Windows.

* Run the installer. During the setup:

  * Ensure **"Install MongoDB as a Service"** is checked.

  * Ensure **"Install MongoDB Compass"** is checked.

* Open MongoDB Compass and connect to the default local URI: `mongodb://localhost:27017` or `mongodb://127.0.0.1:27017`.

**Step 2:** Backend Setup

* Open a terminal and navigate to the backend directory:

    ```bash
    cd backend
    ```

* Install the required dependencies:

    ```bash
    npm install
    ```

* Create a `.env` file in the `backend/` folder and add your configuration:

    ```
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/shopping-cart
    ```

* Seed the database with initial product data (run this only once):

    ```bash
    node seed.js
    ```

* Start the backend server:

    ```bash
    npm run dev
    ```
    The backend will run on `http://localhost:5000`

**Step 3:** Frontend Setup

* Open a new terminal window and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

* Install the required dependencies:

    ```bash
    npm install
    ```

* Start the Vite development server:

    ```bash
    npm run dev
    ```

* The frontend will be available at the URL displayed in the terminal (typically `http://localhost:5173`).

## 6. API Endpoints

The backend provides the following RESTful API endpoints:

* **GET `/api/products`** — Retrieve all products from the catalog
* **GET `/api/cart`** — Fetch the current shopping cart
* **POST `/api/cart`** — Add a new item to the cart
* **PUT `/api/cart/:id`** — Update the quantity of an existing cart item
* **DELETE `/api/cart/:id`** — Remove an item from the cart

All requests/responses use JSON format with CORS enabled for frontend integration.

## 7. Challenges Overcome
The most significant technical challenge was managing asynchronous state synchronization between the React frontend and the Express backend. When a user rapidly clicks the quantity adjustment buttons, it risked creating race conditions where the UI state desynchronized from the database state. This was resolved by implementing strict asynchronous fetch calls utilizing the PUT method, ensuring the local React state was only updated after receiving a successful HTTP 200 OK confirmation from the MongoDB cluster.

## 8. Troubleshooting

### MongoDB Connection Issues
* **Error:** `MongoError: connect ECONNREFUSED 127.0.0.1:27017`
  * **Solution:** Ensure MongoDB is running. On Windows, check that the MongoDB service is started (Services > MongoDB Server or restart using `net start MongoDB`).

### Port Already in Use
* **Error:** `EADDRINUSE: address already in use :::5000` (Backend)
  * **Solution:** Change the `PORT` in `.env` to an available port (e.g., `5001`) or kill the process using the port.
* **Error:** Port 5173 already in use (Frontend)
  * **Solution:** Vite will automatically try the next available port. Check the terminal output for the correct URL.

### Dependencies Installation Fails
* **Error:** `npm ERR! code E404` or missing dependencies
  * **Solution:** Clear npm cache and reinstall:
    ```bash
    npm cache clean --force
    npm install
    ```

### Database Not Seeded
* **Error:** No products displaying in the cart UI
  * **Solution:** Ensure you ran `node seed.js` in the backend directory and verify data is present in MongoDB Compass.

### CORS Errors in Browser Console
* **Error:** `Access to XMLHttpRequest blocked by CORS policy`
  * **Solution:** Verify the backend server is running on `http://localhost:5000` and the CORS configuration in `server.js` includes your frontend's origin.

## 9. Running in Production

For production deployment:
* Set `NODE_ENV=production`
* Update `MONGO_URI` to point to a production MongoDB instance (e.g., MongoDB Atlas)
* Build the frontend: `cd frontend && npm run build`
* Serve the built frontend files from the backend or use a separate hosting service
* Use environment variables from a secure configuration management system (never commit `.env` files)
