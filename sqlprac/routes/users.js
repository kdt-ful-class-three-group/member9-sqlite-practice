import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../db/database.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.post("/", (req, res) => {
  console.log("밴픽 서버 데이터:", JSON.stringify(req.body, null, 2));
  //시간 변경 sv-SE 와 ko-KR 줒ㅇ에 sv-SE방식으로 채택함. 시간위치는 서울(한국으로 찍으려했는데 지역명을 써야했음)
  const koreaTime = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" }).replace('T', ' ');
  // INSERT문으로 db파일에 저장함. 
  const insertBan = db.prepare("INSERT INTO ban (team, name, created_at) VALUES (?, ?, ?)");
  const insertPick = db.prepare("INSERT INTO pick (team, name, created_at) VALUES (?, ?, ?)");
  // prepare메서드로 반복요소를 쉽게 작성할 수 있음. forEach와 함께 사용하면 좋음
  ["blue", "red"].forEach(team => {
    req.body[team].ban.forEach(champ => insertBan.run(team, champ.name, koreaTime));
    req.body[team].pick.forEach(champ => insertPick.run(team, champ.name, koreaTime));
  });

  insertBan.finalize();
  insertPick.finalize();
  // 201은POST로 뭔가 새로 만들었을 때, 200은 그냥 일반적인 성공. (200 = ok, 201 = 생성 이라고 생각해보자)
  res.status(201).json({ message: "저장 완료" });
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get('/data', (req, res) => {

  const banPick = { ban: [], pick: [] };

  db.all("SELECT * FROM ban ORDER BY id ASC", (err, banRows) => {
    if (err) {
      console.log("/data ban에러")
      return;
    }
    banPick.ban = banRows;

  db.all("SELECT * FROM pick ORDER BY id ASC", (err, pickRows) => {
    if (err) {
      console.log("/data pick에러")
      return;
    }
    banPick.pick = pickRows;
  
    res.status(200).json(banPick);
  })
  })
});

router.post("/delete", (req, res) => {
  const { indexes } = req.body;

  if (!Array.isArray(indexes) || indexes.length === 0) {
    return res.status(400).json({ message: "삭제할 인덱스가 없습니다." });
  }

  const deleteBan = db.prepare("DELETE FROM ban WHERE id BETWEEN ? AND ?");
  const deletePick = db.prepare("DELETE FROM pick WHERE id BETWEEN ? AND ?");

  db.serialize(() => {
    indexes.forEach(index => {
      const banStartId = index * 10 + 1;
      const banEndId = banStartId + 9;

      deleteBan.run(banStartId, banEndId);
      deletePick.run(banStartId, banEndId);
    });

    deleteBan.finalize();
    deletePick.finalize();

    res.status(200).json({ message: "삭제 완료" });
  });
});

export { router };
