const Manager = require("../lib/Manager");

test("create manager object", () => {
  const manager = new Manager(
    "billy",
    1234,
    "billy@hillbilly.com",
    "manager",
    321
  );
  expect(manager.name).toEqual(expect.any(String));
  expect(manager.empid).toEqual(expect.any(Number));
  expect(manager.email).toEqual(expect.any(String));
  expect(manager.role).toEqual(expect.any(String));
  expect(manager.office).toEqual(expect.any(Number));
});
