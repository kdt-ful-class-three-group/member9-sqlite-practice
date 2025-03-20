//* 라우터 API 설정
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../db/database.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post("/", async(req, res) => {
  console.log("밴픽 서버 데이터:", JSON.stringify(req.body, null, 2))

  try {
    const { blue, red } = req.body;

    for (const champ of blue.ban) {
      await db.run("INSERT INTO ban (team, type, name) VALUES ('Blue', 'ban', ?)", champ.name);
    }
    for (const champ of blue.pick) {
      await db.run("INSERT INTO pick (team, type, name) VALUES ('Blue', 'pick', ?)", champ.name);
    }
    for (const champ of red.ban) {
      await db.run("INSERT INTO ban (team, type, name) VALUES ('Red', 'ban', ?)", champ.name);
    }
    for (const champ of red.pick) {
      await db.run("INSERT INTO pick (team, type, name) VALUES ('Red', 'pick', ?)", champ.name);
    }
    console.log('성공!ㅋ')

    res.json({ message: "성공"})
  } catch (error) {
  console.error('오류 발생:', error);
  res.status(500).json({ message: "서버 오류", error: error.message });
}


});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export { router };
