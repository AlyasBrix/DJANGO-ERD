import axios from "axios"
import { Employee, Department, Project, EmployeeProject } from "../types/types"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
})

/* =======================
   EMPLOYEES
======================= */

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get("employees/")
  return response.data
}

export const createEmployee = async (data: Employee): Promise<Employee> => {
  const response = await api.post("employees/", data)
  return response.data
}

export const updateEmployee = async (
  id: number,
  data: Employee
): Promise<Employee> => {
  const response = await api.put(`employees/${id}/`, data)
  return response.data
}

export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`employees/${id}/`)
}

/* =======================
   DEPARTMENTS
======================= */

export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get("departments/")
  return response.data
}

export const createDepartment = async (
  data: Department
): Promise<Department> => {
  const response = await api.post("departments/", data)
  return response.data
}

export const updateDepartment = async (
  id: number,
  data: Department
): Promise<Department> => {
  const response = await api.put(`departments/${id}/`, data)
  return response.data
}

export const deleteDepartment = async (id: number): Promise<void> => {
  await api.delete(`departments/${id}/`)
}

/* =======================
   PROJECTS
======================= */

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("projects/")
  return response.data
}

export const createProject = async (data: Project): Promise<Project> => {
  const response = await api.post("projects/", data)
  return response.data
}

export const updateProject = async (
  id: number,
  data: Project
): Promise<Project> => {
  const response = await api.put(`projects/${id}/`, data)
  return response.data
}

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`projects/${id}/`)
}

/* =======================
   EMPLOYEE PROJECT
   (JUNCTION TABLE)
======================= */

export const getEmployeeProjects = async (): Promise<EmployeeProject[]> => {
  const response = await api.get("employee-projects/")
  return response.data
}

export const assignEmployeeToProject = async (
  data: EmployeeProject
): Promise<EmployeeProject> => {
  const response = await api.post("employee-projects/", data)
  return response.data
}

export const updateEmployeeProject = async (
  id: number,
  data: EmployeeProject
): Promise<EmployeeProject> => {
  const response = await api.put(`employee-projects/${id}/`, data)
  return response.data
}

export const deleteEmployeeProject = async (id: number): Promise<void> => {
  await api.delete(`employee-projects/${id}/`)
}