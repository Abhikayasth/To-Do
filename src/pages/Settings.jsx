"use client"

import { motion } from "framer-motion"
import { Sun, Moon, Bell, BellOff } from "lucide-react"
import { useTaskContext } from "../context/TaskContext.jsx"
import { useState } from "react"

export default function Settings() {
  const { theme, toggleTheme } = useTaskContext()
  const [notifications, setNotifications] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container px-4 py-8 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
        Settings
      </h1>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">Select your preferred theme</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTheme()}
                  className={`p-2 rounded-lg flex items-center gap-2 ${
                    theme === "light" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  <span className="text-sm">Light</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTheme()}
                  className={`p-2 rounded-lg flex items-center gap-2 ${
                    theme === "dark" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  <span className="text-sm">Dark</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Task Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified about upcoming tasks</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotifications(!notifications)}
                className={`p-2 rounded-lg flex items-center gap-2 ${
                  notifications ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                <span className="text-sm">{notifications ? "Enabled" : "Disabled"}</span>
              </motion.button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              TaskMaster is a modern task management application built with React and Tailwind CSS.
            </p>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

