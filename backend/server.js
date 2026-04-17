const app = require("./src/api/index");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});