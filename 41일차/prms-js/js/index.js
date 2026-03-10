import { initStore } from "./store.js";
import { initHistoryList } from "./components/history-list";
import { initCurrentAsset } from "./components/current-asset";
import { initAddItem } from "./components/add-item";

init();

function init() {
  initStore();

  initCurrentAsset();
  initAddItem();
  initHistoryList();
}
