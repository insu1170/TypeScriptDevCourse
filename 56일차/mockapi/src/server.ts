import app from "./app.js";
import router from "./route.js";

const PORT = 9999;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use("/", router);