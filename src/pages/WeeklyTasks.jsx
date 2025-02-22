"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useTaskContext } from "../context/TaskContext.jsx"
import TaskList from "../components/TaskList.jsx"
import AddTaskForm from "../components/AddTaskForm.jsx"

export default function WeeklyTasks() {
  const { tasks } = useTaskContext()
  const [showAddTask, setShowAddTask] = useState(false)
  const weeklyTasks = tasks.filter((task) => task.category === "weekly")

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Weekly Tasks
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-5 w-5" />
            Add Task
          </motion.button>
        </div>

        <TaskList tasks={weeklyTasks} />
      </motion.div>

      {showAddTask && <AddTaskForm onClose={() => setShowAddTask(false)} />}
    </>
  )
}

