const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const EmployeeModel = require('./EmployeeModel');

//connect database
const uri = "mongodb://localhost:27017/EmployeeDB"
mongoose.connect(uri)
    .then(() => console.log("Successfully connected to Employee database."))
    .catch((error) => console.error("Database connection error:", error));

// Create employee
router.post('/save', async (req, res) => {
    try {
        const newEmployee = new EmployeeModel({
            EMPLOYEE_ID: 210,
            FIRST_NAME: "Sahan",
            LAST_NAME: "vishawajith",
            EMAIL: "mark@gmail.com",
            PHONE_NUMBER: "0706781195",
            HIRE_DATE: "01-JUN-18",
            JOB_ID: "MR_CLERK",
            SALARY: 2600,
            COMMISSION_PCT: '-',
            MANAGER_ID: 124,
            DEPARTMENT_ID: 50
        });

        const data = await newEmployee.save();
        res.status(201).send(`Employee ${data} inserted successfully`);

    } catch (error) {
        console.error("Error saving employee:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/delete-by-id', async (req, res) => {
    console.log("DELETE-BY-ID BODY:", req.body);

    try {
        const targetId = req.body?._id;

        if (!targetId) {
            return res.status(400).json({
                message: "Missing required field: _id"
            });
        }

        const deletedEmployee =
            await EmployeeModel.findByIdAndDelete(targetId);

        if (!deletedEmployee) {
            return res.status(404).json({
                message: "Employee not found with that _id"
            });
        }

        res.status(200).json({
            message: "Employee successfully deleted",
            deletedData: deletedEmployee
        });

    } catch (error) {
        console.error("Error executing findByIdAndDelete:", error);

        if (error.name === 'CastError') {
            return res.status(400).json({
                message: "Invalid MongoDB _id format"
            });
        }

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});


router.post('/delete', async (req, res) => {
    console.log("DELETE BODY:", req.body);

    try {
        const employeeId = req.body?.EMPLOYEE_ID;

        if (!employeeId) {
            return res.status(400).json({
                message: "Missing required field: EMPLOYEE_ID"
            });
        }

        const deletedEmployee =
            await EmployeeModel.findOneAndDelete({
                EMPLOYEE_ID: employeeId
            });

        if (!deletedEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee successfully deleted by the id",
            deletedData: deletedEmployee
        });

    } catch (error) {
        console.error("Error executing findOneAndDelete:", error);

        if (error.name === 'CastError') {
            return res.status(400).json({
                message: "Invalid input"
            });
        }

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;    