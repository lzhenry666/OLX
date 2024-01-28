const express = require("express");
const router = express.Router();

const UserController = require("./controllers/UserController.js");
const AuthController = require("./controllers/AuthController.js");
const AdsController = require("./controllers/AdController.js");
const Auth = require("./middlewares/Auth.js");
const AuthValidator = require("./validators/AuthValidator.js");
const UserValidaators = require("./validators/UserValidaators.js");

router.get("/online", (req, res) => {
  res.json({ status: "OK" });
});


router.get("/states",  UserController.getStates);

router.post("/user/signin",AuthValidator.signin,AuthController.signin);
router.post("/user/signup",AuthValidator.signup, AuthController.signup);


router.get('/user/me',Auth.private, UserController.info);
router.put('/user/me',UserValidaators.editAction,Auth.private, UserController.editAction);

router.get("/categories", AdsController.getCategories);

router.post("/ad/add", Auth.private,AdsController.addAction);
router.get("/ad/list", AdsController.getList);
router.get("/ad/:id", AdsController.getItem);
router.post("/ad/:id", Auth.private, AdsController.editAction);

module.exports = router;