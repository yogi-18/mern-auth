const {
  fetchUsers,
  register,
  login,
  destroy,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/", fetchUsers);
router.post("/register", register);
router.post("/login", login);
router.delete("/delete", destroy);

module.exports = router;
