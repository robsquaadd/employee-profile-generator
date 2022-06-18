const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, empid, email, role, github) {
    super(name, empid, email, role);
    this.github = github;
  }
}

module.exports = Engineer;
