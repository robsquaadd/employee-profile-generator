const Engineer = require("../lib/Engineer");

test("create an engineer object", () => {
  const engineer = new Engineer(
    "Ben",
    4567,
    "benshapiro@dailywire.com",
    "engineer"
  );
  expect(engineer.name).toEqual(expect.any(String));
  expect(engineer.empid).toEqual(expect.any(Number));
  expect(engineer.email).toEqual(expect.any(String));
  expect(engineer.role).toEqual(expect.any(String));
});
