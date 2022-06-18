const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, empid, email, role, school) {
    super(name, empid, email, role);
    this.school = school;
  }
}

module.exports = Intern;
