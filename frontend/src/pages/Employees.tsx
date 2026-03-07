import { useEffect, useState } from "react"
import { Employee } from "../types/types"
import { getEmployees, deleteEmployee } from "../api/api"
import EmployeeForm from "../components/EmployeeForm"

const Employees = () => {

  const [employees, setEmployees] = useState<Employee[]>([])
  const [selected, setSelected] = useState<Employee | null>(null)
  const [search, setSearch] = useState("")

  const fetchEmployees = async () => {

    try {

      const data = await getEmployees()
      setEmployees(data)

    } catch {

      alert("Failed to load employees")

    }

  }

  useEffect(() => {

    fetchEmployees()

  }, [])

  const handleDelete = async (id: number) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    )

    if (!confirmDelete) return

    try {

      await deleteEmployee(id)
      fetchEmployees()

    } catch {

      alert("Failed to delete employee")

    }

  }

  const filteredEmployees = employees.filter((emp) =>

    `${emp.first_name} ${emp.middle_name ?? ""} ${emp.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())

  )

  return (

    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Employees</h1>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-2">First Name</th>
              <th className="border p-2">Middle Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Birthday</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredEmployees.map((emp) => (

              <tr key={emp.employee_id} className="text-center">

                <td className="border p-2">{emp.first_name}</td>
                <td className="border p-2">{emp.middle_name}</td>
                <td className="border p-2">{emp.last_name}</td>
                <td className="border p-2">{emp.date_of_birth}</td>
                <td className="border p-2">{emp.address}</td>

                <td className="border p-2 space-x-2">

                  <button
                    onClick={() => setSelected(emp)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(emp.employee_id)}
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

      <EmployeeForm
        selected={selected}
        refresh={fetchEmployees}
      />

    </div>

  )
}

export default Employees