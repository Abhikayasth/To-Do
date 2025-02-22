"use client"

import { motion } from "framer-motion"
import { Check, Trash2, Clock, AlertCircle, Edit2 } from "lucide-react"
import { useState } from "react"
import { useTaskContext } from "../context/TaskContext.jsx"

export default function TaskItem({ task }) {
  const { updateTask, deleteTask } = useTaskContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      medium: "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      low: "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    }
    return colors[priority] || "bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
  }

  const getPriorityIcon = (priority) => {
    const icons = {
      high: <AlertCircle className="h-4 w-4 text-red-500" />,
      medium: <Clock className="h-4 w-4 text-yellow-500" />,
      low: <Check className="h-4 w-4 text-green-500" />,
    }
    return icons[priority] || null
  }

  const handleSave = () => {
    updateTask(task.id, editedTask)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <motion.div layout className={`rounded-lg border p-4 shadow-sm ${getPriorityColor(task.priority)}`}>
        <div className="space-y-4">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full p-2 rounded-md border bg-background"
            placeholder="Task title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full p-2 rounded-md border bg-background"
            placeholder="Task description"
            rows={2}
          />
          <div className="flex gap-4">
            <select
              value={editedTask.priority}
              onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
              className="p-2 rounded-md border bg-background"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <select
              value={editedTask.category}
              onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
              className="p-2 rounded-md border bg-background"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 rounded-md bg-muted hover:bg-muted/80">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${getPriorityColor(task.priority)}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateTask(task.id, { completed: !task.completed })}
              className={`flex h-5 w-5 items-center justify-center rounded border ${
                task.completed
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              {task.completed && <Check className="h-3 w-3" />}
            </button>
            <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
              {task.title}
            </h3>
            {getPriorityIcon(task.priority)}
          </div>
          {task.description && <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => deleteTask(task.id)}>
            <Trash2 className="h-4 w-4 text-destructive hover:text-destructive/80" />
          </motion.button>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="capitalize">{task.category}</span>
        {task.dueDate && (
          <>
            <span>•</span>
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </>
        )}
      </div>
    </motion.div>
  )
}

