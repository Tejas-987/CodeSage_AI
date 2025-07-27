require("dotenv").config();

const express = require("express");
const cors = require("cors");
const geminiRoute = require("./src/routes/geminiRoute");
const articleRoute = require("./src/routes/articleRoute");
const app = express();
app.head("/ping", (req, res) => {
  res.status(200).end();  
});
app.use(
  cors({
    origin: ["http://localhost:5173","https://code-sage-ai-sigma.vercel.app","https://code-sage-obpjabwry-tejas-projects-f0a944f2.vercel.app"],
  })
);
app.get("/", (req, res) => {
  res.send("✅ Backend is running fine!");
});
app.use(express.json());
app.use("/ai", geminiRoute);
app.use("/articles", articleRoute);
const PORT = process.env.PORT || 8080;
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log("Listening successfully");
});
