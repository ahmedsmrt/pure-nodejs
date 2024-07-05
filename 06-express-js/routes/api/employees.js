const express = require('express');
const employeeRouter = express.Router();
const employeeController = require('../../controllers/employeeController')



employeeRouter.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)


// named parameter being pulled out from the url
employeeRouter.route('/:id')
    .get(employeeController.getEmployee)


module.exports = employeeRouter;