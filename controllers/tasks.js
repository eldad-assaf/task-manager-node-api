const Task = require("../models/Tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  console.log('getAllTasks');

  const tasks = await Task.find({});

  // Map tasks to change '_id' to 'id'
  const transformedTasks = tasks.map(task => {
    const { _id, ...rest } = task.toObject(); // Convert Mongoose document to plain JavaScript object
    return { id: _id, ...rest }; // Map '_id' to 'id'
  });
res.status(200).json( transformedTasks );
  //res.status(201).json({ tasks  , amount: tasks.length});
  //res.status(200).json({success :true, data: {tasks, nbHits: tasks.length} });
});

const createTask = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const task = await Task.create(req.body);
  console.log(task);
    // Transform the task object to change '_id' to 'id'
    const { _id, ...transformedTask } = task.toObject();
    const responseTask = { id: _id, ...transformedTask };
  res.status(200).json(responseTask);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    console.log(taskId)
    return next( createCustomError(`No task with id :  ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  console.log(req.params.id);
  const { id: TaskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: TaskId });
  if (!task) {
    return next(createCustomError(`No task with id :  ${id}`, 404));
  }
  const { _id, ...transformedTask } = task.toObject();
  const responseTask = { id: _id, ...transformedTask };
  res.status(200).json( responseTask );
});

const updateTask = asyncWrapper(async (req, res) => {
  console.log('updateTask');
  const { id: TaskId } = req.params;
  console.log(req.body);

  const task = await Task.findByIdAndUpdate({ _id: TaskId }, req.body, {
    new: true,
  });
  if (!task) {
    console.log('no task');
    return next(createCustomError(`No task with id :  ${id}`, 404));
  }
  console.log('yes task');
  const { _id, ...transformedTask } = task.toObject();
  const responseTask = { id: _id, ...transformedTask };
  res.status(200).json(responseTask);
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
      return next(createCustomError(`No task with id :${id}`, 404));
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
