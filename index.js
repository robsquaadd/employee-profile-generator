const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

async function getEmployeeData(role) {
  if (role === "MANAGER") {
    const managerData = inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
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
    return managerData;
  } else if (role === "ENGINEER") {
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
    return engineerData;
  } else if (role === "INTERN") {
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
    return internData;
  } else {
    console.error("I'm not really sure how you got here!");
  }
}

function createEmployee(data) {
  if (data.role === "MANAGER") {
    const manager = new Manager(
      data.name,
      data.empid,
      data.email,
      data.role,
      data.office
    );
    return manager;
  } else if (data.role === "ENGINEER") {
    const engineer = new Engineer(
      data.name,
      data.empid,
      data.email,
      data.role,
      data.github
    );
    return engineer;
  } else {
    const intern = new Intern(
      data.name,
      data.empid,
      data.email,
      data.role,
      data.school
    );
    return intern;
  }
}

function generateHTML(array) {
  let roleStringArray = [];
  array.forEach((employee, index) => {
    if (employee.role === "MANAGER") {
      roleStringArray[index] = `
        <div class="card col-4 mx-2">
        <div class="card-header bg-primary">
          <h2 class="text-light text-center">${employee.name}</h2>
          <h3 class="text-light text-center">${employee.role}</h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">ID: ${employee.empid}</li>
            <li class="list-group-item">Email: <a href=mailto:${employee.email}>${employee.email}</a></li>
            <li class="list-group-item">Office #: ${employee.office}</li>
          </ul>
        </div>
      </div>
      `;
    } else if (employee.role === "ENGINEER") {
      roleStringArray[index] = `
        <div class="card col-4 mx-2">
        <div class="card-header bg-primary">
          <h2 class="text-light">${employee.name}</h2>
          <h3 class="text-light">${employee.role}</h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">ID: ${employee.empid}</li>
            <li class="list-group-item">Email: <a href=mailto:${employee.email}>${employee.email}</a></li>
            <li class="list-group-item">Github: <a href='https://github.com/${employee.github}'>${employee.github}</li>
          </ul>
        </div>
      </div>
      `;
    } else {
      roleStringArray[index] = `
        <div class="card col-4 mx-2">
        <div class="card-header bg-primary">
          <h2 class="text-light text-center">${employee.name}</h2>
          <h3 class="text-light text-center">${employee.role}</h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">ID: ${employee.empid}</li>
            <li class="list-group-item">Email: <a href=mailto:${employee.email}>${employee.email}</a></li>
            <li class="list-group-item">School: ${employee.school}</li>
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
          <div class="container my-5">
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

async function rolePrompt() {
  const role = await inquirer.prompt({
    type: "list",
    name: "employeeRole",
    message:
      "Would you like to add an employee? If so, what is their role? If not, choose 'GENERATE MY HTML': ",
    choices: ["ENGINEER", "INTERN", "GENERATE MY HTML"],
  });
  roleString = role.employeeRole;
  return roleString;
}

async function init() {
  let employeeArray = [];
  const managerData = await getEmployeeData("MANAGER");
  managerData.role = "MANAGER";
  const managerObject = createEmployee(managerData);
  employeeArray.push(managerObject);
  let check = false;
  while (check === false) {
    const employeeRole = await rolePrompt();
    if (employeeRole === "GENERATE MY HTML") {
      check = true;
    } else {
      const employeeData = await getEmployeeData(employeeRole);
      const employeeObject = createEmployee(employeeData);
      employeeArray.push(employeeObject);
    }
  }
  const generatedHTML = generateHTML(employeeArray);
  fs.writeFile("./dist/index.html", generatedHTML, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

init();
