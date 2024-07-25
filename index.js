const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const multer = require("multer");
const path = require("path");
const { addProduct } = require("./Controllers/product"); // Import your controller

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define where to store the files
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}` // Rename the file
    );
  },
});

// Initialize multer with defined storage
const upload = multer({ storage });

// Middleware to parse JSON requests
app.use(express.json());

// Route to add product with images
app.post("/products", upload.array("images", 5), addProduct);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));
const url =
  "mongodb+srv://mongodb:mongodb@mongodbcluster.njohajb.mongodb.net/?retryWrites=true&w=majority&appName=MongoDBCluster";
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

app.use(express.json());

try {
  con.on("open", () => {
    console.log("Connected to the database");
  });
} catch (error) {
  console.log("Error: " + error);
}

const port = 9000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const productRoute = require("./Routes/products");
const userRoute = require("./Routes/user");
const favoritesRoute = require("./Routes/favorites");
app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/favorites", favoritesRoute);
