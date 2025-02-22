import { useState } from "react"
import { motion } from "framer-motion"
import { useTaskContext } from "../context/TaskContext.jsx"
import { Sun, Moon, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

export default function Header() {
  const { theme, toggleTheme } = useTaskContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { title: "Daily Tasks", path: "/daily" },
    { title: "Weekly Tasks", path: "/weekly" },
    { title: "Monthly Tasks", path: "/monthly" },
    { title: "Settings", path: "/settings" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent"
          >
            TaskMaster
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className="text-sm font-medium transition-colors hover:text-primary">
              {item.title}
            </Link>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-muted hover:bg-muted/80"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-background border-b md:hidden"
          >
            <nav className="container flex flex-col py-4 px-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="py-2 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

