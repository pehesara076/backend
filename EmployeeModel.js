const mongoose = require('mongoose')
const EmployeeModel = new mongoose.Schema({
    EMPLOYEE_ID: Number,
    FIRST_NAME: String,
    LAST_NAME: String,
    EMAIL:String,
    PHONE_NUMBER: String,
    HIRE_DATE: String,
    JOB_ID: String,
    SALARY: Number,
    COMMISSION_PCT: String,
    MANAGER_ID: Number,
    DEPARTMENT_ID: Number
});
module.exports = mongoose.model(
    'Employees',EmployeeModel,'Employees'
);