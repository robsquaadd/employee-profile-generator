const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, empid, email, role, github) {
    super(name, empid, email, role);
    this.github = github;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return "ENGINEER";
  }
}

module.exports = Engineer;
