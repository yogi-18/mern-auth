const todo = require("../models/todo");
const jwt = require("jsonwebtoken");

exports.addTodo = async (req, res) => {
  try {
    console.log(req.body);
    await todo.create(req.body);
    res.json({
      message: "todo Add success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error" + error,
    });
  }
};
exports.getTodo = async (req, res) => {
  try {
    const result = await todo.find();
    res.json({
      message: "todo add success",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error" + error,
    });
  }
};
exports.updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const result = await todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
    });
    res.json({
      message: "todo update  success",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error" + error,
    });
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    await todo.findByIdAndDelete(todoId);
    res.json({
      message: "todo delete success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error" + error,
    });
  }
};
exports.destroyTodos = async (req, res) => {
  try {
    await todo.deleteMany();
    res.json({
      message: "todo destroy success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error" + error,
    });
  }
};
