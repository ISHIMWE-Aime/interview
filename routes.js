const express = require('express')
const { createTask, deleteTask, updateTask, deleteOneTask, getOneTask, getTasks } = require("./requestHandlers")

const router = express.Router();

router.get('/get-one-task/:id',getOneTask)

router.get('/get-tasks',getTasks)

router.post('/create-task', createTask)

router.put('/update-task/:id', updateTask)

router.delete('/delete-one-task/:id', deleteOneTask)

router.delete('/delete-tasks',deleteTask)

module.exports = { router }

