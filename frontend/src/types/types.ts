export interface Employee {
  employee_id: number
  first_name: string
  middle_name?: string
  last_name: string
  date_of_birth: string
  address: string
}

export interface Department {
  department_id: number
  department_name: string
}

export interface Project {
  project_id: number
  project_name: string
  department: number
}

export interface EmployeeProject {
  id?: number
  employee: number
  project: number
}