import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { TaskProvider } from "./context/TaskContext.jsx"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import DailyTasks from "./pages/DailyTasks.jsx"
import WeeklyTasks from "./pages/WeeklyTasks.jsx"
import MonthlyTasks from "./pages/MonthlyTasks.jsx"
import Settings from "./pages/Settings.jsx"

export default function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<DailyTasks />} />
              <Route path="/daily" element={<DailyTasks />} />
              <Route path="/weekly" element={<WeeklyTasks />} />
              <Route path="/monthly" element={<MonthlyTasks />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TaskProvider>
  )
}

