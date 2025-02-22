"use client"

import { motion, AnimatePresence } from "framer-motion"
import TaskItem from "./TaskItem.jsx"

export default function TaskList({ tasks }) {
  return (
    <motion.div layout className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No tasks found. Add some tasks to get started!</p>
          </motion.div>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </AnimatePresence>
    </motion.div>
  )
}

