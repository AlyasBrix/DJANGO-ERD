import { Link, useLocation } from "react-router-dom"

const Navbar = () => {

  const location = useLocation()

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`

  return (

    <nav className="bg-gray-900 shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <h1 className="text-white text-lg font-semibold tracking-wide">
            Company Manager
          </h1>

          {/* Navigation */}
          <div className="flex gap-3">

            <Link to="/" className={linkClass("/")}>
              Employees
            </Link>

            <Link to="/departments" className={linkClass("/departments")}>
              Departments
            </Link>

            <Link to="/projects" className={linkClass("/projects")}>
              Projects
            </Link>

            <Link to="/employee-projects" className={linkClass("/employee-projects")}>
              Assignments
            </Link>

          </div>

        </div>

      </div>

    </nav>

  )
}

export default Navbar