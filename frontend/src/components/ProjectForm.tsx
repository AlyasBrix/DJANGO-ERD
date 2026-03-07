import { useEffect, useState } from "react"
import { Project, Department } from "../types/types"
import { createProject, updateProject, getDepartments } from "../api/api"

interface Props {
  selected: Project | null
  refresh: () => void
}

interface Errors {
  project_name?: string
  department?: string
}

const ProjectForm = ({ selected, refresh }: Props) => {

  const [departments, setDepartments] = useState<Department[]>([])

  const [form, setForm] = useState<Project>({
    project_id: 0,
    project_name: "",
    department: 0
  })

  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {

    fetchDepartments()

    if (selected) {
      setForm(selected)
    }

  }, [selected])

  const fetchDepartments = async () => {

    try {

      const data = await getDepartments()
      setDepartments(data)

    } catch {

      alert("Failed to load departments")

    }

  }

  const validate = () => {

    const newErrors: Errors = {}

    if (!form.project_name.trim())
      newErrors.project_name = "Project name is required"

    if (!form.department)
      newErrors.department = "Please select a department"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!validate()) return

    try {

      if (selected) {

        await updateProject(selected.project_id, form)

      } else {

        await createProject(form)

      }

      refresh()

      setForm({
        project_id: 0,
        project_name: "",
        department: 0
      })

    } catch {

      alert("Error saving project")

    }

  }

  return (

    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">

      <h2 className="text-xl font-semibold">
        {selected ? "Edit Project" : "Add Project"}
      </h2>

      {/* PROJECT NAME */}

      <div>

        <input
          type="text"
          placeholder="Project Name"
          value={form.project_name}
          onChange={(e) =>
            setForm({ ...form, project_name: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        {errors.project_name && (
          <p className="text-red-500 text-sm">
            {errors.project_name}
          </p>
        )}

      </div>

      {/* DEPARTMENT */}

      <div>

        <select
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: Number(e.target.value) })
          }
          className="border p-2 rounded w-full"
        >

          <option value="">Select Department</option>

          {departments.map((dep) => (

            <option key={dep.department_id} value={dep.department_id}>
              {dep.department_name}
            </option>

          ))}

        </select>

        {errors.department && (
          <p className="text-red-500 text-sm">
            {errors.department}
          </p>
        )}

      </div>

      {/* SAVE BUTTON */}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {selected ? "Update Project" : "Add Project"}
      </button>

    </form>

  )
}

export default ProjectForm