const Intern = require("../lib/Intern");

test("create an intern object", () => {
  const intern = new Intern(
    "Robert",
    7890,
    "robert@robert.com",
    "intern",
    "University of Florida"
  );
  expect(intern.name).toEqual(expect.any(String));
  expect(intern.empid).toEqual(expect.any(Number));
  expect(intern.email).toEqual(expect.any(String));
  expect(intern.role).toEqual(expect.any(String));
  expect(intern.school).toEqual(expect.any(String));
});
