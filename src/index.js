const express = require("express");
const cors = require("cors");

const connection = require("./config/connection");
const router = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(router);

const init = async () => {
  try {
    await connection.sync();
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.log(`Connection to DB failed: ${err.message}`);
  }
};

init();
