import React, { useState } from 'react';

export default function AddTodo({ onClose, onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTodo = {
            id: Date.now(), // temporary ID generation
            title: title.trim(),
            description: description.trim(),
            completed: false
        };

        onAdd(newTodo);
        setTitle('');
        setDescription('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Todo</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label 
                            htmlFor="title" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter todo title"
                            required
                        />
                    </div>

                    <div>
                        <label 
                            htmlFor="description" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter todo description"
                            rows="3"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                            Add Todo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}