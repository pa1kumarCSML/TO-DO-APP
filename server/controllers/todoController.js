const asyncHandler = require("express-async-handler")

const collectionName = require("../models/todoModel")


const createTodo = asyncHandler(async (req, res) => {
    const Item = await collectionName.create(req.body);
    if (!Item) {
        res.status(400)
        throw new Error("Item not created")
    }
    res.status(200).json(Item)
})

const getTodoList = asyncHandler(async (req, res) => {
    const List = await collectionName.find();
    if (List) {
        res.status(200).json(List)
    }
})


const updateTodo = asyncHandler(async (req, res) => {
    const Item = await collectionName.findById(req.params.id)

    if (!Item) {
        res.status(400)
        throw new Error("Todo item not found")
    }
    const updatedItem = await collectionName.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedItem)
})



const deleteTodo = asyncHandler(async (req, res) => {
    const Item = await collectionName.findById(req.params.id)
    if (!Item) {
        res.status(400)
        throw new Error("Item not found")
    }
    await collectionName.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    createTodo, getTodoList,
    updateTodo, deleteTodo
}