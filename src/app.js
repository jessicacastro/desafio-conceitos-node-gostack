const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.status(200).json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ error: "You must enter a title to continue." });
  }

  if (!url) {
    return res.status(400).json({ error: "You must enter a url to continue." });
  }

  if (!techs) {
    return res
      .status(400)
      .json({ error: "You must enter the techs to continue." });
  }

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repositorie);

  return res.status(200).json(repositorie);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repoIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repoIndex < 0) {
    return res.status(400).json({ error: "Repositorie not found." });
  }

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories[repoIndex] = repositorie;

  return res.status(200).json(repositorie);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repoIndex < 0) {
    return res.status(400).json({ error: "Repositorie not found." });
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repoIndex < 0) {
    return res.status(400).json({ error: "Repositorie not found." });
  }

  repositories[repoIndex].likes += 1;

  return res.status(200).json(repositories[repoIndex]);
});

module.exports = app;
