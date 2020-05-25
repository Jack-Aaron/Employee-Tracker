// connects to MySQL database
const connection = require('./connection');
//main constructor that processes all queries
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  // gets everything from the 'department' table
  getAllDepartments() {
    return this.connection.query('SELECT * FROM department');
  }
  //displays all Employees in a chosen Department
  viewDepartment(department) {
    return this.connection.query(`SELECT concat(employee.first_name, ' ', employee.last_name) AS 'Employee', employee.id AS 'ID', role.title AS 'Title', concat('$', FORMAT(role.salary,2)) AS 'Salary', concat(manager.first_name, ' ', manager.last_name) AS Manager
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN department ON department.id = role.department_id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    WHERE department.name = '${department}'`)
  }

  getAllRoles() {
    return this.connection.query('SELECT * FROM role');
  }

  viewRole(role) {
    return this.connection.query(`SELECT role.title AS 'Role',
    department.name AS 'Department',
    employee.id AS 'Employee ID',
    concat(employee.first_name, ' ', employee.last_name) AS 'Name',
    concat('$',FORMAT(role.salary,2)) AS 'Salary',
    concat(manager.first_name, ' ', manager.last_name) AS Manager
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN department ON department.id = role.department_id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    WHERE role.title = '${role}'`)
  }

  getThisRole(title) {
    return this.connection.query(`SELECT title AS 'Role',
    concat('$',FORMAT(salary,2)) AS 'Salary',
    department.name AS 'Department'
    FROM role
    INNER JOIN department ON department.id = role.department_id
    WHERE title = '${title}'`)
  }

  getAllEmployees() {
    return this.connection.query(`SELECT employee.id AS 'ID', concat(employee.first_name, ' ', employee.last_name) AS 'Name', role.title AS 'Title', department.name AS 'Department', concat('$', FORMAT(role.salary,2)) AS 'Salary', concat(manager.first_name, ' ', manager.last_name) AS Manager
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN department ON department.id = role.department_id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
  }

  addNewDepartment(name) {
    return this.connection.query('INSERT INTO department SET ?', {
      name: name
    });
  }

  getDepartmentIDByDepartment(department) {
    return this.connection.query(`SELECT id
    FROM department
    WHERE name = '${department}'`)
  }

  addNewRole(title, salary, department_id) {
    return this.connection.query('INSERT INTO role SET ?', {
      title: title,
      salary: salary,
      department_id: department_id
    });
  }

  whoIsEmployee() {
    return this.connection.query('SELECT * FROM employee');
  }

  getRoleIDByTitle(title) {
    return this.connection.query(`SELECT id
    FROM role
    WHERE title = '${title}'`)
  }

  getManagerIDByEmployee(name) {
    return this.connection.query(`SELECT DISTINCT id
    FROM employee
    WHERE concat(first_name, ' ', last_name) = '${name}'`);
  }

  addNewEmployee(first_name, last_name, role_id, manager_id) {
    return this.connection.query('INSERT INTO employee SET ?', {
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id
    });
  }

  getEmployeeIDFromEmployeeName(employee) {
    return this.connection.query(`SELECT id
    FROM employee
    WHERE concat(first_name, ' ', last_name) = '${employee}'`)
  }

  getRoleIDFromRoleTile(title) {
    return this.connection.query(`SELECT id
    FROM role
    WHERE title = '${title}'`)
  }

  updateEmployee(employee_id, role_id) {
    return this.connection.query('UPDATE employee SET ? WHERE ?', [
      {
        role_id: role_id,
      },
      {
        id: employee_id,
      },
    ])
  }
}

module.exports = new DB(connection);
