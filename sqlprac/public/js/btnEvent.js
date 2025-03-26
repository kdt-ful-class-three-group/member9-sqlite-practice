import { loadData } from "./loadData.js";
import { deleteData } from "./deleteData.js";

export function btnEvent() {
  document.getElementById("refresh-btn").addEventListener("click", loadData);
  document.getElementById("delete-btn").addEventListener("click", deleteData);
}