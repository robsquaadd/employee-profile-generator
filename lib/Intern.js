const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, empid, email, role, school) {
    super(name, empid, email, role);
    this.school = school;
  }
  getSchool() {
    return this.school;
  }
  getRole() {
    return "INTERN";
  }
}

module.exports = Intern;
