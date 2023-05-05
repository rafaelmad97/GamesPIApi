const {
  fetchApiVideogames,
  fetchDBVideogames,
  fetchApiVideogamesbyid,
  fetchDbVideogamesbyid,
  fetchVideogameApibyName,
  fetchVideogameDbbyName,
  createVideoGame,
} = require("../controllers/videogames");

async function getVideogames(req, res) {
  const { name } = req.query;
  try {
    if (name === undefined) {
      const db = await fetchDBVideogames();
      const api = await fetchApiVideogames();
      res.status(200).json({ api: api, db: db, name });
    } else {
      const db = await fetchVideogameDbbyName(name);
      const api = await fetchVideogameApibyName(name);
      res.status(200).json({ api: api, db: db, name });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getVideoGamesbyId(req, res) {
  const { idVideogame } = req.params;
  // try {
  //   const api = await fetchApiVideogamesbyid(idVideogame);
  //   const db = await fetchDbVideogamesbyid(idVideogame);
  //   res.status(200).json({ api, db });
  // } catch (error) {
  //   res.status(500).json(error);
  // }
  Promise.all([fetchApiVideogamesbyid(idVideogame)])
    .then((response) =>
      res.status(200).json({
        api: response[0],
        //, db: response[1]
      })
    )
    .catch((error) => res.status(500).json({ e: JSON.stringify(error) }))
    .finally();
}
async function postVideogame(req, res) {
  try {
    const result = await createVideoGame(req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getVideogames,
  getVideoGamesbyId,
  postVideogame,
};
