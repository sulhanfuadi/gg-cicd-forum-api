// This migration script creates a 'users' table with the specified columns and constraints.
// It includes a primary key on the 'id' column, ensures that 'username' is unique and not null,
// and that 'password' and 'fullname' are also not null. The table is designed to store user information for an application.

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    username: {
      type: "VARCHAR(50)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "TEXT",
      notNull: true,
    },
    fullname: {
      type: "TEXT",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
