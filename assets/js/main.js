import { App } from "./classes.js";
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Loaded: Init()");
  const app = new App();
  app.init();
});
