const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// ✅ Create Razorpay instance once
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Order API
app.post("/order", async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    // ✅ Always validate + build options explicitly
    const options = {
      amount: amount, // in paise
      currency: currency || "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: "Failed to create order" });
    }

    res.json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
