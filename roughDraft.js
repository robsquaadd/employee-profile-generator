const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib//Intern");
const inquirer = require("inquirer");
const fs = require("fs");

async function getManagerData() {
  const managerData = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the manager's name?: ",
    },
    {
      type: "number",
      name: "empid",
      message: "What is the manager's employee ID?: ",
    },
    {
      type: "input",
      name: "email",
      message: "What is the manager's email?: ",
    },
    {
      type: "number",
      name: "office",
      message: "What is the manager's office number?: ",
    },
  ]);
  managerData.role = "manager";
  return managerData;
}

async function rolePrompt() {
  const role = await inquirer.prompt({
    type: "list",
    name: "role",
    message:
      "Would you like to add an employee? If so, then choose their role. If not, then choose Generate My HTML.",
    choices: ["Engineer", "Intern", "Generate My HTML"],
  });
  return role.role;
}

async function getEmployeeData() {
  let role = await rolePrompt();
  let employeeArray = [];
  if (role === "Engineer") {
    const engineerData = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?: ",
      },
      {
        type: "number",
        name: "empid",
        message: "What is the engineer's employee ID?: ",
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email?: ",
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's github username?: ",
      },
    ]);
    engineerData.role = role;
    const engineerObject = createEmployee(engineerData);
    employeeArray.push(engineerObject);
    role = "";
    getEmployeeData();
  } else if (role === "Intern") {
    const internData = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?: ",
      },
      {
        type: "number",
        name: "empid",
        message: "What is the intern's employee ID?: ",
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email?: ",
      },
      {
        type: "input",
        name: "school",
        message: "Where does the intern go to school? : ",
      },
    ]);
    internData.role = role;
    internObject = createEmployee(internData);
    employeeArray.push(internObject);
    console.log(employeeArray);
    role = "";
    getEmployeeData();
  } else if (role === "Generate My HTML") {
    return employeeArray;
  } else {
    console.error("\n\nYou are now trapped.");
  }
}

function createEmployee(answers) {
  if (answers.role.toUpperCase() === "MANAGER") {
    const manager = new Manager(
      answers.name,
      answers.empid,
      answers.email,
      answers.role,
      answers.office
    );
    return manager;
  } else if (answers.role.toUpperCase() === "ENGINEER") {
    const engineer = new Engineer(
      answers.name,
      answers.empid,
      answers.email,
      answers.role,
      answers.github
    );
    return engineer;
  } else {
    const intern = new Intern(
      answers.name,
      answers.empid,
      answers.email,
      answers.role,
      answers.school
    );
    return intern;
  }
}

function generateHTML(array) {
  let roleStringArray = [];
  array.forEach((employee, index) => {
    if (employee.role.toUpperCase() === "MANAGER") {
      roleStringArray[index] = `
      <div class="card col-4">
      <div class="card-header bg-primary">
        <h2 class="text-light text-center">${employee.name}</h2>
        <h3 class="text-light text-center">${employee.role}</h3>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">${employee.empid}</li>
          <li class="list-group-item">${employee.email}</li>
          <li class="list-group-item">${employee.office}</li>
        </ul>
      </div>
    </div>
    `;
    } else if (employee.role.toUpperCase() === "ENGINEER") {
      roleStringArray[index] = `
      <div class="card col-4">
      <div class="card-header bg-primary">
        <h2 class="text-light">${employee.name}</h2>
        <h3 class="text-light">${employee.role}</h3>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">${employee.empid}</li>
          <li class="list-group-item">${employee.email}</li>
          <li class="list-group-item">https://github.com/${employee.github}</li>
        </ul>
      </div>
    </div>
    `;
    } else {
      roleStringArray[index] = `
      <div class="card col-4">
      <div class="card-header bg-primary">
        <h2 class="text-light">${employee.name}</h2>
        <h3 class="text-light">${employee.role}</h3>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">${employee.empid}</li>
          <li class="list-group-item">${employee.email}</li>
          <li class="list-group-item">${employee.school}</li>
        </ul>
      </div>
    </div>
    `;
    }
  });
  let profileSectionString = roleStringArray.join("\n");
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
        crossorigin="anonymous"
      />
      <title>Employee Profiles</title>
    </head>
    <body>
      <header class="bg-danger text-light text-center p-2">
        <h1 class>Employees</h1>
      </header>
      <main>
        <div class="container">
          <div class="row"> 
            ${profileSectionString}
          </div>
        </div>
      </main>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
        crossorigin="anonymous"
      ></script>
    </body>
  </html>
  `;
}

async function init() {
  let employeeArray = [];
  const managerData = await getManagerData();
  const managerObject = createEmployee(managerData);
  employeeArray.push(managerObject);
  const employeeObjects = await getEmployeeData();
  employeeArray.push(employeeObjects);
  const generatedHTML = generateHTML(employeeArray);
  fs.writeFile("./dist/index.html", generatedHTML, (err) => {
    console.error(err);
  });
}

init();
