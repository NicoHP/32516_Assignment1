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
32516——Assignment1/
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
    └── src/
        ├── App.jsx        # Main application logic and API integration
        ├── App.css        # Global styles and UI layout
        └── main.jsx       # React DOM rendering
```
## 5. Installation & Setup Instructions
Prerequisites

* **Node.js**
* **MongoDB Community Server**

**Step 1:** Install and Configure MongoDB (Local Windows Setup)

* Navigate to the MongoDB Download Center.

* Download the MongoDB Community Server .msi installer for Windows.

* Run the installer. During the setup:

* Ensure **"Install MongoDB as a Service"** is checked.

* Ensure **"Install MongoDB Compass"** is checked.

* Open MongoDB Compass and connect to the default local URI: `mongodb://localhost:27017` or `mongodb://127.0.0.1:27017`.

**Step 2:** Backend Setup

* Open a terminal and navigate to the backend directory.

* Install the required dependencies:

    `npm install`

* Create a .env file in the root of the backend folder and add your connection string:

    `PORT=5000`
    `MONGO_URI=mongodb://127.0.0.1:27017/shopping-cart`

* Seed the database with initial product data (run this only once):

    `node seed.js`

* Start the backend server:

    `npm run dev`

**Step 3:** Frontend Setup

* Open a new terminal window and navigate to the frontend directory.

* Install the required dependencies:

    `npm install`

* Start the Vite development server:

    `npm run dev`

* Click the URL provided by the Vite.

## 6. Challenges Overcome
The most significant technical challenge was managing asynchronous state synchronization between the React frontend and the Express backend. When a user rapidly clicks the quantity adjustment buttons, it risked creating race conditions where the UI state desynchronized from the database state. This was resolved by implementing strict asynchronous fetch calls utilizing the PUT method, ensuring the local React state was only updated after receiving a successful HTTP 200 OK confirmation from the MongoDB cluster.
