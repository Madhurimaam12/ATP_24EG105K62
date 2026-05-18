import { connect } from "mongoose";
import { EmpModel } from "../models/EmpModel.js";

const MONGODB_URI = process.env.MONGODB_URI;

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await connect(MONGODB_URI);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const { id } = req.query;

    switch (req.method) {
      case 'GET':
        if (id) {
          // Get single employee (if needed)
          const emp = await EmpModel.findById(id);
          if (!emp) {
            return res.status(404).json({ message: "emp not found" });
          }
          res.status(200).json({ message: "employee found", payload: emp });
        } else {
          // Get all employees
          const empList = await EmpModel.find();
          res.status(200).json({ message: "list of emps", payload: empList });
        }
        break;

      case 'POST':
        const newEmp = req.body;
        const empDoc = new EmpModel(newEmp);
        await empDoc.save();
        res.status(201).json({ message: "Emp created" });
        break;

      case 'PUT':
        if (!id) {
          return res.status(400).json({ message: "Employee ID required" });
        }
        const modifiedEmp = req.body;
        const updatedEmp = await EmpModel.findByIdAndUpdate(
          id,
          { $set: { ...modifiedEmp } },
          { returnDocument: "after" }
        );
        if (!updatedEmp) {
          return res.status(404).json({ message: "emp not found" });
        }
        res.status(200).json({ message: "employee updated", payload: updatedEmp });
        break;

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ message: "Employee ID required" });
        }
        const deletedEmp = await EmpModel.findByIdAndDelete(id);
        if (!deletedEmp) {
          return res.status(404).json({ message: "emp not found" });
        }
        res.status(200).json({ message: "employee deleted", payload: deletedEmp });
        break;

      default:
        res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      message: "error",
      reason: error.message,
    });
  }
}