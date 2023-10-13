const express = require('express')
const router = express.Router()
const { createTodo, getTodoList,
    updateTodo, deleteTodo
} = require('../controllers/todoController')

router.post('/', createTodo)
router.get('/', getTodoList)
router.put('/:id', updateTodo)

router.delete('/:id', deleteTodo)

module.exports = router