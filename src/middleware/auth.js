import { pool } from "../config/db.js";
import { createHash } from "crypto";

export async function authMiddleware(req, res, next) {
  try {
    const rawKey = req.headers.authorization?.replace("Bearer ", "");

    if (!rawKey) {
      return res.status(401).json({ error: "Missing API key" });
    }

    const keyHash = createHash("sha256").update(rawKey).digest("hex");

    const result = await pool.query(
      "SELECT id FROM api_keys WHERE key_hash = $1 AND revoked = false",
      [keyHash],
    );

    if (result.rowCount === 0) {
      return res.status(403).json({ error: "Invalid API key" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
}
