const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection");
const { table, Console } = require("console");
const { start } = require("repl");

connection.connect((err) => {
  if (err) throw err;
  console.log("EMPLOYEE TRACKER");
  startQuestion();
});

function startQuestion() {
  inquirer
    .prompt({
      type: "list",
      name: "question",
      message: "What do you want to do?",
      choices: [
        "View all department",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then((data) => {
      if (data.question === "View all department") {
        viewDepartment();
      } else if (data.question === "View all roles") {
        viewRoles();
      } else if (data.question === "View all employees") {
        viewEmployees();
      } else if (data.question === "Add a department") {
        addDepartment();
      } else if (data.question === "Add a role") {
        addRole();
      } else if (data.question === "Add an employee") {
        addEmployee();
      } else if (data.question === "Update an employee role") {
        updateEmployee();
      }
    });
}

function viewDepartment() {
  console.log("Viewing all department!");
  const department = `SELECT department_name AS 'Department', id AS 'Department id' from department  ORDER BY id `;
  connection.query(department, (err, res) => {
    if (err) return err;
    console.table(res);
    startQuestion();
  });
}

function viewRoles() {
  console.log("Viewing all roles!");
  const role = `SELECT title AS 'Job title', department_id AS 'Department id', salary AS 'Salary' from role ORDER BY role.id `;
  connection.query(role, (err, res) => {
    if (err) return err;
    console.table(res);
    startQuestion();
  });
}

function viewEmployees() {
  console.log("Viewing all employees!");
  const allEmployee = `SELECT id AS 'Employee ID', first_name AS 'First name', last_name AS 'Last name' from employee ORDER BY employee.id`;
  connection.query(allEmployee, (err, res) => {
    if (err) return err;
    console.table(res);
    startQuestion();
  });
}

function addDepartment() {
  console.log("Adding a department!");
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to add?",
      },
    ])
    .then((data) => {
      // const department = `INSERT INTO department SET ? {title:}`;
      connection.query(
        `INSERT INTO department (department_name) VALUES ("${data.department}");`,
        (err, res) => {
          if (err) return err;
          console.log("Added department!");
          startQuestion();
        }
      );
    });
}

function addRole() {
  console.log("Adding a role!");
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter role or title",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter role salary",
      },
      // {
      //   type: "input",
      //   name: "department",
      //   message: "Enter role department",
      // },
    ])
    .then((data) => {
      const newRole = `INSERT INTO role (title, salary) VALUES ("${data.title}", ${data.salary});`;
      connection.query(newRole, (err, res) => {
        if (err) return err;
        console.log("New role has been added!");
        startQuestion();
      });
    });
}

function addEmployee() {
  console.log("Adding a employee!");
  inquirer.prompt([
    {
      type: "input",
      name: "first",
      message: "Enter your employee's first name",
    },
    {
      type: "input",
      name: "last",
      message: "Enter your employee's last name",
    },
  ]);
}

function updateEmployee() {
  console.log("Updating an employee!");
}
