const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection");
const { type } = require("os");

var roleList = [];
var managerList = [];

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
  const department =
    "SELECT department_name AS 'Department', id AS 'Department ID' FROM department;";
  connection.query(department, (err, res) => {
    if (err) return err;
    console.table(res);
    startQuestion();
  });
}

function viewRoles() {
  console.log("Viewing all roles!");
  const role = `SELECT title AS 'Job Title', department_id AS 'Department id', salary AS 'Salary' from role `;
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
          console.table(res);
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
  inquirer
    .prompt([
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
      {
        type: "list",
        name: "role",
        message: "Enter your employee's role",
        choices: roleChoices(),
      },
      // {
      //   type: "list",
      //   name: "manager",
      //   message: "Enter your employee's manager",
      //   choices: managerChoices(),
      // },
    ])
    .then((data) => {
      var role = roleChoices().indexOf(data.role) + 1;
      // var manager = managerChoices().indexOf(data.manager) + 1;
      const employee = `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${data.first}", "${data.last}", ${role});`;
      connection.query(employee, (err, res) => {
        if (err) return err;
        console.log("New employee has been added!");
        console.log(res);
        startQuestion();
      });
    });
}

function roleChoices() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) return err;
    for (var i = 0; i < res.length; i++) {
      roleList.push(res[i].title);
    }
  });
  return roleList;
}

// function managerChoices() {
//   connection.query(
//     "SELECT first_name, last_name FROM employee WHERE manager_id is NULL",
//     (err, res) => {
//       if (err) return err;
//       for (var i = 0; i < res.length; i++) {
//         managerList.push(res[i].first_name);
//       }
//     }
//   );
//   return managerList;
// }

function updateEmployee() {
  console.log("Updating an employee!");
  connection.query(
    "SELECT employee.last_name, concat(employee.first_name, ' ' , employee.last_name) AS Employee FROM employee ORDER BY employee.last_name",
    (err, res) => {
      if (err) return err;
      console.table(res);
      var employee = [];
      inquirer
        .prompt([
          {
            name: "last",
            type: "list",
            message: "What is the employee's name?",
            choices: function () {
              for (var i = 0; i < res.length; i++) {
                employee.push(res[i].last_name);
              }
              return employee;
            },
          },
          {
            name: "role",
            type: "list",
            message: "What is the employee's new title?",
            choices: roleChoices(),
          },
        ])
        .then((data) => {
          var role = roleChoices().indexOf(data.role) + 1;
          var newEmployee = `UPDATE employee SET last_name  = ${data.role} WHERE id = ${data.id}`;
          connection.query(newEmployee, (err, res) => {
            if (err) return err;
            console.log("Updated employee's information!");
            startQuestion();
          });
        });
    }
  );
}
