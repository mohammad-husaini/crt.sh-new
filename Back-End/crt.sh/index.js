import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

const fetchData = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

app.get("/", async (req, res) => {
  const search = req.query.search;
  const response = await fetchData(`https://crt.sh/?q=${search}&output=json`);
  res.status(200).send(response);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
