const getAllTasks = (req, res) => {
  res.send("all items");
};

const createTask = (req, res) => {
  //res.send("create Task");
  res.json(req.body)
};
const getTask = (req, res) => {
    const id = req.params.id
    console.log(`get task for the id : ${id}`);

  res.json({id : req.params.id});
};

const updateTask = (req, res) => {
  res.send("update Task");
};

const deleteTask = (req, res) => {
  res.send("delete Task");
};
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
