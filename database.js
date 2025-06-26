const mongoose = require("mongoose");

//* Connection String For MongoDB Atlas

// Reconnect Timeout
const reconnectTimeout = 5000;

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: process.env.dbName,
    })
    .catch((err) => {
      console.log(err, "ERROR mongoose");
    });
};

const db = mongoose.connection;

db.on("connecting", () => {
  console.info("Connecting to MongoDB...");
});

db.on("error", (error) => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect();
});

db.on("connected", () => {
  console.info("Connected to MongoDB!");
  console.info("Database: " + process.env.MONGO_URL + process.env.dbName);
});

db.once("open", () => {
  console.info("MongoDB connection opened!");
});

db.on("reconnected", () => {
  console.info("MongoDB reconnected!");
});

db.on("disconnected", () => {
  console.error(
    `MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`
  );
  setTimeout(() => connect(), reconnectTimeout);
});

connect();
