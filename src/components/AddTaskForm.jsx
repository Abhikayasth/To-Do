"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useTaskContext } from "../context/TaskContext.jsx"

export default function AddTaskForm({ onClose }) {
  const { addTask } = useTaskContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const task = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      priority: formData.get("priority"),
      completed: false,
      dueDate: formData.get("dueDate"),
    }
    addTask(task)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4 p-1 hover:bg-muted rounded-full">
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full p-2 rounded-md border bg-background"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full p-2 rounded-md border bg-background"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full p-2 rounded-md border bg-background"
                defaultValue="daily"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="w-full p-2 rounded-md border bg-background"
                defaultValue="medium"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <input id="dueDate" name="dueDate" type="date" className="w-full p-2 rounded-md border bg-background" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-muted hover:bg-muted/80">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

