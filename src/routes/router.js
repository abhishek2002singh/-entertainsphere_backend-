const express = require("express");
const handlerouter = express.Router();
const { userAuth } = require("../middleware/auth");

// user controller
const { login, signup, logout } = require("../controller/auth");

handlerouter.post("/login", login);
handlerouter.post("/signup", signup);
handlerouter.post("/logout", logout);

handlerouter.get("/me", userAuth, (req, res) => {
  res.status(200).json(req.user);
});

// movies upload  yha pr hai

const {
  postHindiMovies,
  getHindiMovies,
} = require("../controller/movies/hindimovies");
const {
  postSouthMovies,
  getSouthMovies,
} = require("../controller/movies/southMovies");
const {
  postTrandingMovies,
  getTrandingMovies,
} = require("../controller/movies/trandingMovies");

handlerouter.post("/postHindiMovies", userAuth, postHindiMovies);
handlerouter.get("/getHindiMovies", userAuth, getHindiMovies);

handlerouter.post("/postSouthMovies", userAuth, postSouthMovies);
handlerouter.get("/getSouthMovies", userAuth, getSouthMovies);

handlerouter.post("/postTrandingMovies", userAuth, postTrandingMovies);
handlerouter.get("/getTrandingMovies", userAuth, getTrandingMovies);

// image upload  yha pr hai
const uploadController = require("../controller/upload/upload");
const upload = require("../middleware/upload");

handlerouter.post(
  "/upload",
  upload.single("image"),
  uploadController.uploadImage
);
handlerouter.get("/images", uploadController.getAllImages);
handlerouter.delete("/images/:public_id", uploadController.deleteImage);

//song yah pr hai

const {
  postBhojpuriSong,
  getBhojpuriSong,
} = require("../controller/song/phojpuriSong");
const {
  postHindiNewSong,
  getHindiNewSong,
} = require("../controller/song/hindiSong");
const {
  postHindiOldSong,
  getHindiOldSong,
} = require("../controller/song/hindiOldSong");
const {
  postPanjabiSong,
  getPanjabiSong,
} = require("../controller/song/panjabiSong");

handlerouter.post("/postBhojpuriSong", userAuth, postBhojpuriSong);
handlerouter.get("/getBhojpuriSong", userAuth, getBhojpuriSong);

handlerouter.post("/postHindiNewSong", userAuth, postHindiNewSong);
handlerouter.get("/getHindiNewSong", userAuth, getHindiNewSong);

handlerouter.post("/postHindiOldSong", userAuth, postHindiOldSong);
handlerouter.get("/getHindiOldSong", userAuth, getHindiOldSong);

handlerouter.post("/postPanjabiSong", userAuth, postPanjabiSong);
handlerouter.get("/getPanjabiSong"), userAuth, getPanjabiSong;

// comment and like yha pr hai

module.exports = handlerouter;
