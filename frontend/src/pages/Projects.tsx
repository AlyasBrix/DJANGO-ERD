import { useEffect, useState } from "react"
import { Project, Department } from "../types/types"
import { getProjects, deleteProject, getDepartments } from "../api/api"
import ProjectForm from "../components/ProjectForm"

const Projects = () => {

  const [projects, setProjects] = useState<Project[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [selected, setSelected] = useState<Project | null>(null)
  const [search, setSearch] = useState("")

  const fetchProjects = async () => {

    try {

      const data = await getProjects()
      setProjects(data)

    } catch {

      alert("Failed to load projects")

    }

  }

  const fetchDepartments = async () => {

    try {

      const data = await getDepartments()
      setDepartments(data)

    } catch {

      alert("Failed to load departments")

    }

  }

  useEffect(() => {

    fetchProjects()
    fetchDepartments()

  }, [])

  const handleDelete = async (id: number) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    )

    if (!confirmDelete) return

    try {

      await deleteProject(id)
      fetchProjects()

    } catch {

      alert("Failed to delete project")

    }

  }

  const getDepartmentName = (id: number) => {
    const dep = departments.find((d) => d.department_id === id)
    return dep ? dep.department_name : "N/A"
  }

  const filteredProjects = projects.filter((proj) =>
    proj.project_name.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Projects</h1>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search project..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-2">Project Name</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProjects.map((proj) => (

              <tr key={proj.project_id} className="text-center">

                <td className="border p-2">{proj.project_name}</td>

                <td className="border p-2">
                  {getDepartmentName(proj.department)}
                </td>

                <td className="border p-2 space-x-2">

                  <button
                    onClick={() => setSelected(proj)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(proj.project_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* FORM */}

      <ProjectForm
        selected={selected}
        refresh={fetchProjects}
      />

    </div>

  )
}

export default Projects