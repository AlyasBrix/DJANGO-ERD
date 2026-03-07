import { useEffect, useState } from "react"
import { Employee, Project, EmployeeProject } from "../types/types"
import {
  getEmployees,
  getProjects,
  getEmployeeProjects,
  assignEmployeeToProject,
  deleteEmployeeProject
} from "../api/api"

const EmployeeProjects = () => {

  const [employees, setEmployees] = useState<Employee[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [assignments, setAssignments] = useState<EmployeeProject[]>([])

  const [employee, setEmployee] = useState(0)
  const [project, setProject] = useState(0)

  const fetchData = async () => {

    try {

      const emp = await getEmployees()
      const proj = await getProjects()
      const ass = await getEmployeeProjects()

      setEmployees(emp)
      setProjects(proj)
      setAssignments(ass)

    } catch {

      alert("Failed to load data")

    }

  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAssign = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!employee || !project) {
      alert("Select employee and project")
      return
    }

    try {

      await assignEmployeeToProject({
        employee,
        project
      })

      setEmployee(0)
      setProject(0)

      fetchData()

    } catch {

      alert("Assignment failed")

    }

  }

  const handleDelete = async (id?: number) => {

    if (!id) return

    if (!window.confirm("Remove assignment?")) return

    await deleteEmployeeProject(id)

    fetchData()

  }

  const getEmployeeName = (id: number) => {
    const emp = employees.find(e => e.employee_id === id)
    return emp ? `${emp.first_name} ${emp.last_name}` : "N/A"
  }

  const getProjectName = (id: number) => {
    const proj = projects.find(p => p.project_id === id)
    return proj ? proj.project_name : "N/A"
  }

  return (

    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Employee Project Assignments</h1>

      {/* ASSIGN FORM */}

      <form onSubmit={handleAssign} className="flex gap-3">

        <select
          value={employee}
          onChange={(e) => setEmployee(Number(e.target.value))}
          className="border p-2 rounded"
        >

          <option value="">Select Employee</option>

          {employees.map(emp => (
            <option key={emp.employee_id} value={emp.employee_id}>
              {emp.first_name} {emp.last_name}
            </option>
          ))}

        </select>

        <select
          value={project}
          onChange={(e) => setProject(Number(e.target.value))}
          className="border p-2 rounded"
        >

          <option value="">Select Project</option>

          {projects.map(proj => (
            <option key={proj.project_id} value={proj.project_id}>
              {proj.project_name}
            </option>
          ))}

        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded"
        >
          Assign
        </button>

      </form>

      {/* ASSIGNMENTS TABLE */}

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="border p-2">Employee</th>
            <th className="border p-2">Project</th>
            <th className="border p-2">Action</th>
          </tr>

        </thead>

        <tbody>

          {assignments.map(a => (

            <tr key={a.id} className="text-center">

              <td className="border p-2">
                {getEmployeeName(a.employee)}
              </td>

              <td className="border p-2">
                {getProjectName(a.project)}
              </td>

              <td className="border p-2">

                <button
                  onClick={() => handleDelete(a.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default EmployeeProjects