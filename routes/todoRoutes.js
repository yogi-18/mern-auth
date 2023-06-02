const {
  getTodo,
  updateTodo,
  deleteTodo,
  destroyTodos,
  addTodo,
} = require("../controllers/todoController");
const { protect } = require("../middlewares/protect");

const router = require("express").Router();

router
  .get("/", getTodo)
  .post("/add", addTodo)
  .put("/update/:todoId", updateTodo)
  .delete("/delete/:todoId", deleteTodo)
  .delete("/destroy", destroyTodos);

module.exports = router;
