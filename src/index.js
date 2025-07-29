 const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

// ✅ Proper DB connection with promise chain
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB is connected"))
  .catch((error) => {
    console.log('DB is not connected');
    console.log(error.message);
    process.exit(1);
  });

// ✅ Start server (no missing function call)
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});
