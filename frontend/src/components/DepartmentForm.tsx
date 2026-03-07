import { useEffect, useState } from "react"
import { Department } from "../types/types"
import { createDepartment, updateDepartment } from "../api/api"

interface Props {
  selected: Department | null
  refresh: () => void
}

interface Errors {
  department_name?: string
}

const DepartmentForm = ({ selected, refresh }: Props) => {

  const [form, setForm] = useState<Department>({
    department_id: 0,
    department_name: ""
  })

  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {

    if (selected) {
      setForm(selected)
    }

  }, [selected])

  const validate = () => {

    const newErrors: Errors = {}

    if (!form.department_name.trim())
      newErrors.department_name = "Department name is required"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!validate()) return

    try {

      if (selected) {

        await updateDepartment(selected.department_id, form)

      } else {

        await createDepartment(form)

      }

      refresh()

      setForm({
        department_id: 0,
        department_name: ""
      })

    } catch {

      alert("Error saving department")

    }

  }

  return (

    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">

      <h2 className="text-xl font-semibold">
        {selected ? "Edit Department" : "Add Department"}
      </h2>

      {/* DEPARTMENT NAME */}

      <div>

        <input
          type="text"
          placeholder="Department Name"
          value={form.department_name}
          onChange={(e) =>
            setForm({ ...form, department_name: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        {errors.department_name && (
          <p className="text-red-500 text-sm">
            {errors.department_name}
          </p>
        )}

      </div>

      {/* SUBMIT BUTTON */}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {selected ? "Update Department" : "Add Department"}
      </button>

    </form>

  )
}

export default DepartmentForm