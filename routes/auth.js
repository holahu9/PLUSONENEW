const express = require('express');
const router = express.Router();
var multer  = require('multer');
let path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      //path save file
      cb(null, path.join(__dirname,"../public/avatar"))
  },
  filename: function (req, file, cb) {
      // save file name
      cb(null,  Date.now()+ file.originalname)
  }
})
var upload = multer({storage:storage});

const authController = require('../controllers/auth');

//router.post("/signup", authController.signup);
//router.post("/signup", authController.login);
//router.get('/logout', authController.logout);


router.post("/signup",  authController.signup);

router.post("/login", authController.login);
router.get("/logout",authController.logout);
router.post("/change-avatar",authController.isLoggedIn,upload.single("file"),authController.changeAvatar);

module.exports = router;