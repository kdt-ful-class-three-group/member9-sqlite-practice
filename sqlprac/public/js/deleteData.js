import { loadData } from "./loadData.js";

export function deleteData() {
      const checkboxes = document.querySelectorAll(".group-checkbox");
      const deleteData = [];
  
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          indexesToDelete.push(index);
        }
      });
  
      if (deleteData.length === 0) {
        alert("삭제할 그룹을 선택하세요.");
        return;
      }
  
      fetch("/users/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ indexes: deleteData })
      })
      .then(res => {
        if (!res.ok) throw new Error("삭제 요청 실패");
        return res.json();
      })
      .then(result => {
        alert("삭제가 완료되었습니다.");
        loadData();
      })
      .catch(err => {
        console.error("삭제 중 오류 발생:", err);
        alert("삭제 중 오류가 발생했습니다.");
      });
    }