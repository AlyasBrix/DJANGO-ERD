import { useEffect, useState } from "react"
import { Employee, Project } from "../types/types"
import { getEmployees, getProjects, assignEmployeeToProject } from "../api/api"

interface Props {
  refresh: () => void
}

const EmployeeProjectForm = ({ refresh }: Props) => {

  const [employees, setEmployees] = useState<Employee[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  const [employee, setEmployee] = useState(0)
  const [project, setProject] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {

    try {

      const emp = await getEmployees()
      const proj = await getProjects()

      setEmployees(emp)
      setProjects(proj)

    } catch {

      alert("Failed to load data")

    }

  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!employee || !project) {
      alert("Please select employee and project")
      return
    }

    try {

      await assignEmployeeToProject({
        employee,
        project
      })

      setEmployee(0)
      setProject(0)

      refresh()

    } catch {

      alert("Assignment failed")

    }

  }

  return (

    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">

      <h2 className="text-xl font-semibold">
        Assign Employee to Project
      </h2>

      {/* EMPLOYEE */}

      <select
        value={employee}
        onChange={(e) => setEmployee(Number(e.target.value))}
        className="border p-2 rounded w-full"
      >

        <option value="">Select Employee</option>

        {employees.map(emp => (

          <option key={emp.employee_id} value={emp.employee_id}>
            {emp.first_name} {emp.last_name}
          </option>

        ))}

      </select>

      {/* PROJECT */}

      <select
        value={project}
        onChange={(e) => setProject(Number(e.target.value))}
        className="border p-2 rounded w-full"
      >

        <option value="">Select Project</option>

        {projects.map(proj => (

          <option key={proj.project_id} value={proj.project_id}>
            {proj.project_name}
          </option>

        ))}

      </select>

      {/* BUTTON */}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Assign
      </button>

    </form>

  )
}

export default EmployeeProjectForm