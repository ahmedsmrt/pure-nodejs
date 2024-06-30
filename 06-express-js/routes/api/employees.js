const express = require('express');
const employeeRouter = express.Router();

const data = {};
// mimicking connecting to a database
data.employees = require('../../data/employee.json');


employeeRouter.route('/')
    .get((req, res) => {
        res.json(data.employees)
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    })


// named parameter being pulled out from the url
employeeRouter.route('/:id')
    .get((req, res) => {
        res.json(data.employees[`${req.params.id - 1}`])
    })


module.exports = employeeRouter;