import express from "express";
import router from "./routes/router.js";
const app = express();
const PORT = process.env.PORT || 3005;


app.use(express.static("views"));
app.use(express.static("assets"));
app.use('/', router);


app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);