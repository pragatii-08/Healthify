const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, doc, setDoc } = require("firebase/firestore");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const firebaseConfig = {
  apiKey: "AIzaSyAYzmBXm6U3Mwrq1vXCBk9Nlt85ydVGQpc",
  authDomain: "healtify-cd401.firebaseapp.com",
  projectId: "healtify-cd401"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Data sets - 5 items per category
const usersData = [
  { name: "Rahul Sharma", email: "rahul.sharma@gmail.com", mobile: "+919876543210", dob: "1992-04-12", password: "Rahul@1234", createdAt: new Date().toISOString() },
  { name: "Priya Patel", email: "priya.patel@gmail.com", mobile: "+919812345678", dob: "1995-08-23", password: "Priya@5678", createdAt: new Date().toISOString() },
  { name: "Amit Verma", email: "amit.verma@gmail.com", mobile: "+919765432109", dob: "1988-11-05", password: "Amit@9012", createdAt: new Date().toISOString() },
  { name: "Sneha Kulkarni", email: "sneha.kulkarni@gmail.com", mobile: "+919654321098", dob: "1997-03-30", password: "Sneha@3456", createdAt: new Date().toISOString() },
  { name: "Vikram Singh", email: "vikram.singh@gmail.com", mobile: "+919543210987", dob: "1990-09-18", password: "Vikram@7890", createdAt: new Date().toISOString() }
];

const doctorsData = [
  { name: "Dr. Ananya Roy", age: "42", gender: "female", contact: "+919811122233", email: "ananya.roy@healthify.com", experience: "12", expertise: "Cardiology", regNo: "MC10234", stateCouncil: "Maharashtra Medical Council", rating: 4.9, bookings: 142, createdAt: Date.now() },
  { name: "Dr. Rajesh Mehta", age: "48", gender: "male", contact: "+919822233344", email: "rajesh.mehta@healthify.com", experience: "15", expertise: "Neurology", regNo: "MC10567", stateCouncil: "Delhi Medical Council", rating: 4.8, bookings: 128, createdAt: Date.now() },
  { name: "Dr. Sunita Rao", age: "36", gender: "female", contact: "+919833344455", email: "sunita.rao@healthify.com", experience: "8", expertise: "Pediatrics", regNo: "MC10890", stateCouncil: "Karnataka Medical Council", rating: 4.7, bookings: 95, createdAt: Date.now() },
  { name: "Dr. Vikramaditya Joshi", age: "40", gender: "male", contact: "+919844455566", email: "vikram.joshi@healthify.com", experience: "10", expertise: "Orthopedics", regNo: "MC11223", stateCouncil: "Gujarat Medical Council", rating: 4.6, bookings: 110, createdAt: Date.now() },
  { name: "Dr. Kavita Nair", age: "34", gender: "female", contact: "+919855566677", email: "kavita.nair@healthify.com", experience: "6", expertise: "Dermatology", regNo: "MC11556", stateCouncil: "Tamil Nadu Medical Council", rating: 4.5, bookings: 87, createdAt: Date.now() }
];

const newDoctorsData = [
  { name: "Dr. Suresh Kumar", age: "32", gender: "male", contact: "+919866677788", email: "suresh.kumar@gmail.com", experience: "5", expertise: "General Physician", regNo: "MC12001", stateCouncil: "Telangana Medical Council", createdAt: Date.now() },
  { name: "Dr. Meera Iyer", age: "38", gender: "female", contact: "+919877788899", email: "meera.iyer@gmail.com", experience: "9", expertise: "Gynecology", regNo: "MC12002", stateCouncil: "Kerala Medical Council", createdAt: Date.now() },
  { name: "Dr. Rohan Gupta", age: "35", gender: "male", contact: "+919888899900", email: "rohan.gupta@gmail.com", experience: "7", expertise: "Ophthalmology", regNo: "MC12003", stateCouncil: "Uttar Pradesh Medical Council", createdAt: Date.now() },
  { name: "Dr. Neha Sharma", age: "31", gender: "female", contact: "+919899900011", email: "neha.sharma@gmail.com", experience: "4", expertise: "ENT Specialist", regNo: "MC12004", stateCouncil: "Punjab Medical Council", createdAt: Date.now() },
  { name: "Dr. Alok Pandey", age: "43", gender: "male", contact: "+919900011122", email: "alok.pandey@gmail.com", experience: "11", expertise: "Psychiatry", regNo: "MC12005", stateCouncil: "West Bengal Medical Council", createdAt: Date.now() }
];

const labsData = [
  { name: "Metropolis Healthcare Lab", contact: "+919911122233", email: "contact@metropolislab.com", area: "Andheri West, Mumbai", coordinates: "19.1197, 72.8464", rating: 4.8, createdAt: Date.now() },
  { name: "Thyrocare Diagnostic Center", contact: "+919922233344", email: "info@thyrocarelab.com", area: "Connaught Place, New Delhi", coordinates: "28.6315, 77.2167", rating: 4.7, createdAt: Date.now() },
  { name: "Dr. Lal PathLabs", contact: "+919933344455", email: "support@lalpathlabs.com", area: "Koramangala, Bengaluru", coordinates: "12.9352, 77.6245", rating: 4.9, createdAt: Date.now() },
  { name: "SRL Diagnostics", contact: "+919944455566", email: "care@srl.com", area: "Banjara Hills, Hyderabad", coordinates: "17.4156, 78.4347", rating: 4.6, createdAt: Date.now() },
  { name: "Suburban Diagnostics", contact: "+919955566677", email: "help@suburbandiagnostics.com", area: "Shivajinagar, Pune", coordinates: "18.5308, 73.8474", rating: 4.8, createdAt: Date.now() }
];

const newLabsData = [
  { name: "Apex Clinical Laboratory", contact: "+919966677788", email: "info@apexlab.com", area: "Salt Lake, Kolkata", coordinates: "22.5867, 88.4171", createdAt: Date.now() },
  { name: "CareVision Diagnostics", contact: "+919977788899", email: "support@carevision.com", area: "Satellite, Ahmedabad", coordinates: "23.0300, 72.5178", createdAt: Date.now() },
  { name: "HealthCheck Pathology Lab", contact: "+919988899900", email: "admin@healthchecklab.com", area: "Hazratganj, Lucknow", coordinates: "26.8467, 80.9462", createdAt: Date.now() },
  { name: "Precision Diagnostic Center", contact: "+919999900011", email: "contact@precisionlab.com", area: "T. Nagar, Chennai", coordinates: "13.0418, 80.2341", createdAt: Date.now() },
  { name: "Lifecare PathLab", contact: "+919900099988", email: "service@lifecarelab.com", area: "Raja Park, Jaipur", coordinates: "26.8962, 75.8236", createdAt: Date.now() }
];

const bookingsData = [
  { patientName: "Rahul Sharma", doctorName: "Dr. Ananya Roy", department: "Cardiology", date: "2026-08-15", time: "10:00 AM", status: "Confirmed", createdAt: Date.now() },
  { patientName: "Priya Patel", doctorName: "Dr. Rajesh Mehta", department: "Neurology", date: "2026-08-16", time: "11:30 AM", status: "Confirmed", createdAt: Date.now() },
  { patientName: "Amit Verma", doctorName: "Dr. Sunita Rao", department: "Pediatrics", date: "2026-08-17", time: "02:00 PM", status: "Pending", createdAt: Date.now() },
  { patientName: "Sneha Kulkarni", doctorName: "Dr. Vikramaditya Joshi", department: "Orthopedics", date: "2026-08-18", time: "04:00 PM", status: "Confirmed", createdAt: Date.now() },
  { patientName: "Vikram Singh", doctorName: "Dr. Kavita Nair", department: "Dermatology", date: "2026-08-19", time: "09:30 AM", status: "Completed", createdAt: Date.now() }
];

async function seedFirebaseCollection(colName, dataset) {
  console.log(`\n🌱 Seeding Firebase Firestore Collection '${colName}'...`);
  let count = 0;
  for (const item of dataset) {
    try {
      await addDoc(collection(db, colName), item);
      count++;
    } catch (err) {
      console.error(`Error adding to ${colName}:`, err.message);
    }
  }
  console.log(`✅ Added ${count}/${dataset.length} items into '${colName}'.`);
}

function seedSQLite() {
  console.log("\n🌱 Seeding local SQLite database ('database.db')...");
  const sqliteDb = new sqlite3.Database("database.db");

  sqliteDb.serialize(() => {
    sqliteDb.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      mobile TEXT,
      dob TEXT,
      password TEXT
    )`);

    sqliteDb.run(`CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      expertise TEXT,
      experience TEXT,
      rating REAL
    )`);

    sqliteDb.run(`CREATE TABLE IF NOT EXISTS labs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      area TEXT,
      rating REAL
    )`);

    sqliteDb.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientName TEXT,
      doctorName TEXT,
      date TEXT,
      time TEXT,
      status TEXT
    )`);

    const userStmt = sqliteDb.prepare("INSERT OR REPLACE INTO users (name, email, mobile, dob, password) VALUES (?, ?, ?, ?, ?)");
    usersData.forEach(u => userStmt.run(u.name, u.email, u.mobile, u.dob, u.password));
    userStmt.finalize();

    const docStmt = sqliteDb.prepare("INSERT OR REPLACE INTO doctors (name, email, expertise, experience, rating) VALUES (?, ?, ?, ?, ?)");
    doctorsData.forEach(d => docStmt.run(d.name, d.email, d.expertise, d.experience, d.rating));
    docStmt.finalize();

    const labStmt = sqliteDb.prepare("INSERT OR REPLACE INTO labs (name, email, area, rating) VALUES (?, ?, ?, ?)");
    labsData.forEach(l => labStmt.run(l.name, l.email, l.area, l.rating));
    labStmt.finalize();

    const bookStmt = sqliteDb.prepare("INSERT OR REPLACE INTO bookings (patientName, doctorName, date, time, status) VALUES (?, ?, ?, ?, ?)");
    bookingsData.forEach(b => bookStmt.run(b.patientName, b.doctorName, b.date, b.time, b.status));
    bookStmt.finalize();

    console.log("✅ SQLite database seeded successfully!");
  });

  sqliteDb.close();
}

async function runSeeder() {
  console.log("==================================================");
  console.log(" 🚀 STARTING DATABASE SEEDING FOR ALL CATEGORIES ");
  console.log("==================================================");

  await seedFirebaseCollection("users", usersData);
  await seedFirebaseCollection("doctors", doctorsData);
  await seedFirebaseCollection("newdoctor", newDoctorsData);
  await seedFirebaseCollection("labs", labsData);
  await seedFirebaseCollection("newlab", newLabsData);
  await seedFirebaseCollection("bookings", bookingsData);

  seedSQLite();

  console.log("\n==================================================");
  console.log(" 🎉 ALL 6 CATEGORIES SEEDED WITH 5+ RECORDS EACH! ");
  console.log("==================================================");
  process.exit(0);
}

runSeeder().catch(err => {
  console.error("Seeder Exception:", err);
  process.exit(1);
});
