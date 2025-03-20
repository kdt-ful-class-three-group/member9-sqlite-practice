//* DB서버 생성 //
import express from "express";
import dotenv from "dotenv";
// cors(Cross-Origin Resource Sharing) 다른 도메인에서 오는 요청을 허용하기위해 필요함.
import cors from "cors";
// 클라이언트가 보낸 JSON 데이터를 서버에서 읽을 수 있도록 도와줌
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./sqlprac/routes/users.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// cors 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 정적파일 제공
app.use(express.static(path.join(__dirname, "sqlprac/public")));
// 라우터 등록
app.use("/users", router);



app.listen(process.env.PORT, () => {
  console.log(`로딩중... http://localhost:${process.env.PORT}`)
})
