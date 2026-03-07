import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Employees from "./pages/Employees"
import Departments from "./pages/Departments"
import Projects from "./pages/Projects"
import EmployeeProjects from "./pages/EmployeeProjects"

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/employee-projects" element={<EmployeeProjects />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App