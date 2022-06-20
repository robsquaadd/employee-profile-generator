class Employee {
  constructor(name, empid, email, role) {
    this.name = name;
    this.empid = empid;
    this.email = email;
    this.role = role;
  }
  getName() {
    return this.name;
  }
  getID() {
    return this.empid;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "EMPLOYEE";
  }
}

module.exports = Employee;
