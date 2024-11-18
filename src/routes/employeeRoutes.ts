import { Router, Request, Response } from "express";

const router = Router();

interface Employee {
    id: number;
    fname: string;
    onames: string;
    phone: string;
    email: string;
    state: string;
    city: string;
    address: string;
}

const employees: Employee[] = [
    { id: 1, fname: "George", onames: "Orwell", phone: "09067532132", email: "george@gmail.com", state: "Lagos", city: "Ikeja", address: "No. 65, Old Market Road" },
    { id: 2, fname: "Micheal", onames: "Okpare", phone: "08097654324", email: "micheal@gmail.com", state: "Rivers", city: "Port-Harcourt", address: "No. 108, Army Barak Estate" },
    { id: 3, fname: "Abubakar", onames: "Ndagi", phone: "0843522524", email: "abubakar@gmail.com", state: "Abuja", city: "Gwagwalada", address: "Plot DD 18, Hajj Camp" },
    { id: 4, fname: "Idris", onames: "Musa", phone: "07064949172", email: "idris@gmail.com", state: "Abuja", city: "Kwali", address: "No. KDA 345, Overseas Qtrs" },
    { id: 5, fname: "Fatima", onames: "Muhammad", phone: "0810474797", email: "fatima@gmail.com", state: "Niger", city: "Agaie", address: "No. 239, GRA Quarters" }
];

// Get all employees
router.get("/employees", (req: Request, res: Response) => {
    res.json(employees);
});

// Get a employee by ID
router.get("/employees/:id", (req: Request, res: Response) => {
    const employeeId = parseInt(req.params.id);
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
});

// Create a new employee
router.post("/employees", (req: Request, res: Response) => {
    const newEmployee: Employee = {
        id: employees.length + 1,
        fname: req.body.fname,
        onames: req.body.onames,
        phone: req.body.phone,
        email: req.body.email,
        state: req.body.state,
        city: req.body.city,
        address: req.body.address,
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Update a employee by ID
router.put("/employees/:id", (req: Request, res: Response) => {
    const employeeId = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(e => e.id === employeeId);

    if (employeeIndex !== -1) {
        employees[employeeIndex] = { id: employeeId, fname: req.body.fname, onames: req.body.onames, phone: req.body.phone, email: req.body.email, state: req.body.state, city: req.body.city, address: req.body.address };
        res.json(employees[employeeIndex]);
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
});

// Delete a employee by ID
router.delete("/employees/:id", (req: Request, res: Response) => {
    const employeeId = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(e => e.id === employeeId);

    if (employeeIndex !== -1) {
        employees.splice(employeeIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
});

export default router;