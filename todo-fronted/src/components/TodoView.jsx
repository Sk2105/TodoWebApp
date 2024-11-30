import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import AddTodo from './AddTodo';

export default function TodoView() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/todo')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error(error));
    }, []);

    const [todoDialogOpen, setTodoDialogOpen] = useState(false);

    const toggleTodoStatus = (id) => {
        const todo = todos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        fetch(`http://localhost:8080/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        })
            .then(response => response.json())
            .then(data => {
                setTodos(todos.map(todo => todo.id === id ? data : todo));
            })
            .catch(error => console.error(error));

    };

    const deleteTodo = (id) => {
        fetch(`http://localhost:8080/todo/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => console.error(error));
    };

    const handleOnAdd = (newTodo) => {
        fetch('http://localhost:8080/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
            .then(response => response.json())
            .then(data => {
                setTodos([...todos, data]);
                setTodoDialogOpen(false);
            })
            .catch(error => console.error(error));
        setTodoDialogOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Todo List</h1>

                <button
                    onClick={() => setTodoDialogOpen(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                    <FaPlus className="mr-2" />
                    Add New Todo
                </button>
                {todoDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <AddTodo onClose={() => setTodoDialogOpen(false)} onAdd={handleOnAdd} />
                    </div>
                )}

            </div>
            <div className="grid gap-4">
                {todos.map(todo => (
                    <div
                        key={todo.id}
                        className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${todo.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h2 className={`text-xl font-semibold ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                                    }`}>
                                    {todo.title}
                                </h2>
                                <p className={`mt-2 ${todo.completed ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {todo.description}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => toggleTodoStatus(todo.id)}
                                    className={`p-2 rounded-full transition-colors duration-200 ${todo.completed
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                        : 'bg-green-100 hover:bg-green-200 text-green-600'
                                        }`}
                                >
                                    {todo.completed ? <FaUndo /> : <FaCheck />}
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {todos.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No todos yet. Add some tasks to get started!</p>
                </div>
            )}
        </div>
    );
}