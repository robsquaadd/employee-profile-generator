const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, empid, email, role, office) {
    super(name, empid, email, role);
    this.office = office;
  }
  getRole() {
    return "MANAGER";
  }
}

module.exports = Manager;
