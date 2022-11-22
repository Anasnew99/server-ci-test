const {
  getToDos,
  getToDo,
  createToDo,
  updateToDo,
  deleteToDo,
} = require("../controllers/todo");

const router = require("express").Router();
// const query = require('../db');

router.get("/", async (req, res) => {
  try {
    const todos = await getToDos();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await getToDo(req.params.id);
    if (todo[0]) {
      res.json(todo[0]);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (title) {
      const newTodo = await createToDo(title);
      res.json(newTodo);
    } else {
      res.status(400).send("Bad request");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, completed } = req.body;
    const { id } = req.params;
    const updatedTodo = await updateToDo(id, title, completed);
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await deleteToDo(id);
    res.json(deletedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
