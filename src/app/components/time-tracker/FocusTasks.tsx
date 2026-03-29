"use client";

import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

const FocusTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');

    // Load tasks from local storage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('focusTasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('focusTasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim() === '') return;

        const task: Task = {
            id: Date.now().toString(),
            text: newTask,
            completed: false,
        };

        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Focus Tasks</h2>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Add a new task..."
                    className="flex-1 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-zinc-400"
                />
                <button
                    onClick={addTask}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-colors flex items-center justify-center min-w-[3rem]"
                >
                    <FaPlus />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {tasks.length === 0 && (
                    <div className="text-center text-zinc-400 py-8 italic">
                        No tasks yet. Stay focused!
                    </div>
                )}
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`group flex items-center justify-between p-3 rounded-xl transition-all ${task.completed
                                ? 'bg-zinc-50 dark:bg-zinc-800/50 opacity-60'
                                : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700/80'
                            }`}
                    >
                        <div className="flex items-center gap-3 flex-1 overflow-hidden">
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'border-zinc-300 dark:border-zinc-600 hover:border-orange-500'
                                    }`}
                            >
                                {task.completed && <FaCheck size={10} />}
                            </button>
                            <span className={`truncate ${task.completed ? 'line-through text-zinc-400' : 'text-zinc-700 dark:text-zinc-200'}`}>
                                {task.text}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="text-zinc-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs text-zinc-400">
                <span>{tasks.filter(t => !t.completed).length} pending</span>
                <span>{tasks.filter(t => t.completed).length} completed</span>
            </div>
        </div>
    );
};

export default FocusTasks;
