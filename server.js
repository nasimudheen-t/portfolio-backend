import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "nasimudheent22@gmail.com",
      subject: `Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      replyTo: email,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});