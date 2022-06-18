const Employee = require("../lib/Employee");

test("create an employee object", () => {
  const employee = new Employee(
    "Ben",
    4567,
    "benshapiro@dailywire.com",
    "engineer"
  );
  expect(employee.name).toEqual(expect.any(String));
  expect(employee.empid).toEqual(expect.any(Number));
  expect(employee.email).toEqual(expect.any(String));
  expect(employee.role).toEqual(expect.any(String));
});
