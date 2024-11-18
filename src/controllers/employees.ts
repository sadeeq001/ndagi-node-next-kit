import { db } from '@/db/db'
import { Request, Response } from 'express';

// Create a new employee
export async function createEmployee(req: Request, res: Response) {
    const { fname, onames, phone, email, state, city, address, imageUrl } = req.body;
    try {
        const addEmployee = await db.employee.create({
            data: {
                fname,
                onames,
                phone,
                email,
                state,
                city,
                address,
                imageUrl
            },
        })

        return res.status(201).json(addEmployee);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: null,
            message: "Failed to create employee",
        })
    }
}

// Get all employees
export async function getEmployees(req: Request, res: Response) {
    try {
        const employees = await db.employee.findMany({
            orderBy: {
                createdAt: "asc"
            },
        })

        return res.status(200).json(employees);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: null,
            message: "Failed to fetch employee(s)",
        })
    }
}

// Get a employee by ID
export async function getEmployee(req: Request, res: Response){
    const employeeId = parseInt(req.params.id);
    try {
        const employee = await db.employee.findUnique({
            where: {
                id: employeeId
            }
        });
        return res.status(200).json(employee);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: null,
            message: "Employee not found",
        })
    }
}

// Update a employee by ID
export async function updateEmployee(req: Request, res: Response){
    const employeeId = parseInt(req.params.id);
    const { fname, onames, phone, email, state, city, address, imageUrl } = req.body;
    try {
        // check if employee already exist
        const existsEmployee = await db.employee.findUnique({
            where: {
                id: employeeId
            }
        })

        if (!existsEmployee) {
            return res.status(500).json({
                data: null,
                message: "Employee not found",
            })
        }

        const updatedEmployee = await db.employee.update({
            where: {
                id: employeeId
            },
            data: {
                fname,
                onames,
                phone,
                email,
                state,
                city,
                address,
                imageUrl
            }
        })

        return res.status(200).json(updatedEmployee);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: null,
            message: "Failed to update employee",
        })
    }
}

// Delete a employee by ID
export async function deleteEmployee(req: Request, res: Response){
    const employeeId = parseInt(req.params.id);
    try {
        // check if employee already exist
        const existsEmployee = await db.employee.findUnique({
            where: {
                id: employeeId
            }
        })
        if (!existsEmployee) {
            return res.status(500).json({
                data: null,
                message: "Employee not found",
            })
        }

        const deleteEmployee = await db.employee.delete({
            where: {
                id: employeeId
            }
        });

        return res.status(200).json(deleteEmployee);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: null,
            message: "Failed to delete employee",
        })
    } 
}