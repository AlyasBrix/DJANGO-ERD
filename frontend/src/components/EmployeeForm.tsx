import { useEffect, useState } from "react"
import { Employee } from "../types/types"
import { createEmployee, updateEmployee } from "../api/api"

interface Props {
  selected: Employee | null
  refresh: () => void
}

interface Errors {
  first_name?: string
  middle_name?: string
  last_name?: string
  date_of_birth?: string
  address?: string
}

const EmployeeForm = ({ selected, refresh }: Props) => {

  const [form, setForm] = useState<Employee>({
    employee_id: 0,
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    address: ""
  })

  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {

    if (selected) {
      setForm(selected)
    }

  }, [selected])

  const validate = () => {

    const newErrors: Errors = {}

    if (!form.first_name.trim())
      newErrors.first_name = "First name is required"

    if (!form.middle_name?.trim())
      newErrors.middle_name = "Middle name is required"

    if (!form.last_name.trim())
      newErrors.last_name = "Last name is required"

    if (!form.date_of_birth)
      newErrors.date_of_birth = "Birthday is required"

    if (!form.address.trim())
      newErrors.address = "Address is required"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!validate()) return

    try {

      if (selected) {

        await updateEmployee(selected.employee_id, form)

      } else {

        await createEmployee(form)

      }

      refresh()

      setForm({
        employee_id: 0,
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        address: ""
      })

    } catch {

      alert("Error saving employee")

    }

  }

  return (

    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">

      <h2 className="text-xl font-semibold">
        {selected ? "Edit Employee" : "Add Employee"}
      </h2>

      {/* FIRST NAME */}

      <div>

        <input
          type="text"
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) =>
            setForm({ ...form, first_name: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        {errors.first_name && (
          <p className="text-red-500 text-sm">{errors.first_name}</p>
        )}

      </div>

      {/* MIDDLE NAME */}

      <div>

        <input
          type="text"
          placeholder="Middle Name"
          value={form.middle_name}
          onChange={(e) =>
            setForm({ ...form, middle_name: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        {errors.middle_name && (
          <p className="text-red-500 text-sm">{errors.middle_name}</p>
        )}

      </div>

      {/* LAST NAME */}

      <div>

        <input
          type="text"
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) =>
            setForm({ ...form, last_name: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        {errors.last_name && (
          <p className="text-red-500 text-sm">{errors.last_name}</p>
        )}

      </div>

      {/* BIRTHDAY */}

      <div>

        <input
          type="date"
          value={form.date_of_birth}
          onChange={(e) =>
            setForm({ ...form, date_of_birth: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        {errors.date_of_birth && (
          <p className="text-red-500 text-sm">{errors.date_of_birth}</p>
        )}

      </div>

      {/* ADDRESS */}

      <div>

        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}

      </div>

      {/* SUBMIT BUTTON */}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {selected ? "Update Employee" : "Add Employee"}
      </button>

    </form>
  )
}

export default EmployeeForm