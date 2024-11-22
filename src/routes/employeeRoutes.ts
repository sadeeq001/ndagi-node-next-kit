import { createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } from '@/controllers/employees';
import express from 'express';

const employeeRouter = express.Router();

employeeRouter.post("/employees", createEmployee);
employeeRouter.get("/employees", getEmployees);
employeeRouter.get("/employees/id", getEmployee);
employeeRouter.put("/employees/update/id", updateEmployee);
employeeRouter.delete("/employee/delete/id", deleteEmployee);

export default employeeRouter;
