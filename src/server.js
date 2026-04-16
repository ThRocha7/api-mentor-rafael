// src/server.js
import express from "express";
import { generatePdf } from "./controllers/pdfController.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
const port = process.env.PORT;

app.get("/report/:id", authMiddleware, generatePdf);

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
