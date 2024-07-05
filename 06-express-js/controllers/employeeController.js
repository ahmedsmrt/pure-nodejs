const data = {
    employees: require('../models/employee.json'),
    setEmployees: function (data) {this.employees = data}
};

const getAllEmployees = (req, res) => {
    res.json(data.employees)
}


const getEmployee = (req, res) => {
    res.json(data.employees[`${req.params.id - 1}`])
}


const createNewEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}


const updateEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}


const deleteEmployee = (req, res) => {
    res.json({ "id": req.body.id })
}




module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}