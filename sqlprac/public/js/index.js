import { loadData } from "./loadData.js";
import { btnEvent } from "./btnEvent.js";

window.addEventListener("load", () => {
  btnEvent();
  loadData();
});