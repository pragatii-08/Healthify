

# Healthify - Healthcare & Hospital Management System

**Healthify** is a comprehensive, full-stack web application designed to connect patients, doctors, diagnostic labs, and administrators into an integrated healthcare platform. Built with modern web technologies, dark-mode glassmorphic design, responsive layouts, and multi-role authentication.

---

## ✨ Features

- 👤 **Multi-Role Authentication**:
  - **User / Patient Portal**: Registration, account login, appointment & lab booking.
  - **Doctor Portal**: Doctor registration and consultation directory.
  - **Lab Portal**: Diagnostic test booking and lab registrations.
  - **Admin Portal**: System administration dashboard (`admin@gmail.com`).
- 🎨 **Modern Glassmorphism UI**: High-contrast dark theme powered by Bootstrap 5, custom CSS, and interactive background particle animations (`Particles.js`).
- 🛒 **Booking Cart System**: Easily add and manage doctor appointments and lab tests in your cart.
- ⚡ **Firebase & SQLite Support**: Real-time cloud datastore integration via Firebase Firestore alongside optional local SQLite persistence.

---

## 📁 Project Structure

```text
├── css/                   # Bootstrap stylesheet assets
├── js/                    # Bootstrap JavaScript libraries
├── admin-pg.html          # Admin Dashboard & Management
├── booking_cart-pg.html   # Shopping/Booking Cart & Checkout
├── doctor-pg.html         # Doctor List & Consultation Booking
├── doctor-sign-pg.html    # Doctor Registration Page
├── home-pg.html           # Landing Page / Home Portal
├── lab-pg.html            # Diagnostic Lab Services & Test Booking
├── lab-sign-up-pg.html    # Lab Partner Registration Page
├── login-pg.html          # Universal Login Page
├── mainweb-pg.html        # Main User Dashboard
├── sign-up page.html      # Patient / User Registration Page
├── db.js                  # SQLite database configuration & schema
├── firebase-config.txt    # Firebase Firestore SDK configuration
├── main.js                # Electron app main launcher script
├── server.js              # Node.js HTTP server script
└── package.json           # Project manifest and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14.x or higher) installed on your system.

### Running the Application

1. **Start the Dev Server**:
   ```bash
   npm start
   ```
   *Alternatively, run:*
   ```bash
   node server.js
   ```

2. **Access in Browser**:
   Open your browser and navigate to:
   - 🌐 **Home Page**: [http://localhost:3000](http://localhost:3000)
   - 🔐 **Login Page**: [http://localhost:3000/login-pg.html](http://localhost:3000/login-pg.html)

---

## 🔐 Sign Up Target Pages & Portals

| Role | Sign-Up Target Page | Login Page | Credentials | Dashboard Portal |
| :--- | :--- | :--- | :--- | :--- |
| 👨‍⚕️ **Doctor** | `/doctor-sign-pg.html` | `/login-pg.html` | `ananya.roy@healthify.com` / `Doctor@1234` | `/doctor-pg.html` |
| 🧪 **Lab Partner** | `/lab-sign-up-pg.html` | `/login-pg.html` | `contact@metropolislab.com` / `Lab@1234` | `/lab-pg.html` |
| 👤 **Patient / User** | `/sign-up page.html` | `/login-pg.html` | `rahul.sharma@gmail.com` / `Rahul@1234` | `/mainweb-pg.html` |
| 🛠️ **Admin** | N/A | `/login-pg.html` | `admin@gmail.com` / `123` | `/admin-pg.html` |

---

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Particles.js
- **Backend / Server**: Node.js (HTTP Server)
- **Database / Cloud**: Firebase Firestore, SQLite3
- **Desktop Packaging**: Electron.js support (`main.js`)
