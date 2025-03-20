import { db } from "./sqlprac/db/database.js";
import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();









app.listen(process.env.PORT, () => {
  console.log(`로딩중... http://localhost:${process.env.PORT}`)
})
