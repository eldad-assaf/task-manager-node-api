const Task = require("../models/Tasks");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
  //res.status(201).json({ tasks  , amount: tasks.length});
  //res.status(201).json({success :true, data: {tasks, nbHits: tasks.length} });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params;
  const task = await Task.findOne({ _id: TaskId });
  if (!task) {
    return res.status(404).json({ msg: `Not found for id : ${TaskId}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: TaskId });
  if (!task) {
    return res.status(404).json({ msg: `Not found for id : ${TaskId}` });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params;
  console.log(req.body);

  const task = await Task.findByIdAndUpdate({ _id: TaskId }, req.body, {
    new: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `Not found for id : ${TaskId}` });
  }
  res.status(200).json({ task });
});

//this function is temporary and in the rest of the course the 'updateTask' (PATCH and not PUT) will be used
const editTask = async (req, res) => {
  try {
    const { id: TaskId } = req.params;
    console.log(req.body);

    const task = await Task.findByIdAndUpdate({ _id: TaskId }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `Not found for id : ${TaskId}` });
    }
    res.status(200).json({ task });
  } catch (err) {}
};
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
