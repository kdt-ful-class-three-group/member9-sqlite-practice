import { db } from "./sqlprac/db/database.js";
import express from "express";
import dotenv from "dotenv";
// cors(Cross-Origin Resource Sharing) 다른 도메인에서 오는 요청을 허용하기위해 필요함.
import cors from "cors";
// 클라이언트가 보낸 JSON 데이터를 서버에서 읽을 수 있도록 도와줌
import bodyParser from "body-parser";

dotenv.config();

const app = express();
// cors 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());


app.listen(process.env.PORT, () => {
  console.log(`로딩중... http://localhost:${process.env.PORT}`)
})
