const { Task } = require('./schemas/task.schema');

const errorHandler = (err) => {
  const errors = {};
  if (err.message.includes('validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.code == 11000) {
    errors.email = 'Title or description already exists';
  }
  return errors;
};

const getOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).send({ statusCode: 404, message: 'The task not found' });
    } else {
      res.status(200).send({ statusCode: 200, task });
    }
  } catch (err) {
    res.status(400).send({ statusCode: 400, message: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send({ statusCode: 200, tasks });
  } catch (err) {
    const error = errorHandler(err);
    res.status(400).send({ statusCode: 400, message: error });
  }
};

const createTask = async (req, res) => {
  const { title, description, status, deadline } = req.body;

  try {
    await Task.create({ title, description, status, deadline });
    res
      .status(201)
      .send({ statusCode: 201, message: 'The task created Successfully' });
  } catch (err) {
    const error = errorHandler(err);
    res.status(400).send({ statusCode: 400, message: error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body);
    if (updatedTask) {
      res
        .status(200)
        .send({ statusCode: 200, message: 'The task updated Successfully' });
    } else {
      res.status(404).send({ statusCode: 404, message: 'The task not found' });
    }
  } catch (error) {
    res.status(400).send({ statusCode: 400, message: error.message });
  }
};

const deleteOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      res
        .status(200)
        .send({ statusCode: 200, message: 'The task deleted Successfully' });
    } else {
      res.status(404).send({ statusCode: 404, message: 'The task not found' });
    }
  } catch (error) {
    res.status(400).send({ statusCode: 400, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const isDeleted = await Task.deleteMany();
    if (isDeleted.deletedCount > 0) {
      res.status(200).send({
        statusCode: 200,
        message: 'The tasks are deleted Successfully',
      });
    } else {
      res
        .status(404)
        .send({ statusCode: 404, message: 'There are is no tasks created' });
    }
  } catch (error) {
    res.status(400).send({ statusCode: 400, message: error.message });
  }
};

module.exports = {
  getOneTask,
  getTasks,
  createTask,
  updateTask,
  deleteOneTask,
  deleteTask,
};
