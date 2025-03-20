//* 라우터 API 설정
import express from "express";
import { db } from "../db/database.js";

const router = express.Router();

router.post("/users", (req, res) => {
  console.log("밴픽 서버에서 받은 데이터:", req.body);

  res.json({ message: "데이터 수신 완료", receivedData: req.body });
});
//기본 메인페이지
router.post("/", (req, res) => {
  console.log("밴픽 서버에서 받은 데이터:", req.body);

  res.json({ message: "데이터 수신 완료", receivedData: req.body });
});

router.get('/', (req, res) => {
  res.send('/index.html')
})


export { router };
