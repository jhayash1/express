const express = require('express')
const app = express()
const PORT = 8080
// Middleware to parse JSON bodies
app.use(express.json());
// In-memory todo list
let todoList = ["Apple"]

app.get('/',(req,res)=>{
    res.status(200).send(todoList)
})
// Fetch API to add a new task to the todo list
app.post('/todo',(req,res)=>{
    let newTodo = req.body.item;
    todoList.push(newTodo);
    res.status(201).send({
        message:'Task added'
    })
})
// Fetch API to delete a task from the todo list

app.delete('/todo',(req,res)=>{
    let deleteTodo = req.body.item;
    todoList = todoList.filter(item=>item !== deleteTodo);
    res.status(204).send({message:"Delete Sucessfully"})
})

// Fetch API to update a task in the todo list
app.patch('/todo', (req, res) => {
    let oldTodo = req.body.oldItem;
    let newTodo = req.body.newItem;

    let index = todoList.findIndex(
    item => item.toLowerCase().trim() === oldTodo.toLowerCase().trim()
);

    if (index === -1) {
        return res.status(404).json({ message: "Item not found" });
    }
    console.log(todoList);
console.log(oldTodo);

    todoList[index] = newTodo;

    res.status(200).json({ message: "Task updated" });
});
app.listen(PORT,()=>{
    console.log(`Server is started http://localhost:${PORT}`)
})