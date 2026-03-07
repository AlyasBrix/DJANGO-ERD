import { useEffect, useState } from "react"
import { Department } from "../types/types"
import { getDepartments, deleteDepartment } from "../api/api"
import DepartmentForm from "../components/DepartmentForm"

const Departments = () => {

  const [departments, setDepartments] = useState<Department[]>([])
  const [selected, setSelected] = useState<Department | null>(null)
  const [search, setSearch] = useState("")

  const fetchDepartments = async () => {

    try {

      const data = await getDepartments()
      setDepartments(data)

    } catch {

      alert("Failed to load departments")

    }

  }

  useEffect(() => {

    fetchDepartments()

  }, [])

  const handleDelete = async (id: number) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    )

    if (!confirmDelete) return

    try {

      await deleteDepartment(id)
      fetchDepartments()

    } catch {

      alert("Failed to delete department")

    }

  }

  const filteredDepartments = departments.filter((dep) =>
    dep.department_name.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Departments</h1>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-2">Department Name</th>
              <th className="border p-2">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredDepartments.map((dep) => (

              <tr key={dep.department_id} className="text-center">

                <td className="border p-2">
                  {dep.department_name}
                </td>

                <td className="border p-2 space-x-2">

                  <button
                    onClick={() => setSelected(dep)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(dep.department_id)}
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

      <DepartmentForm
        selected={selected}
        refresh={fetchDepartments}
      />

    </div>

  )
}

export default Departments