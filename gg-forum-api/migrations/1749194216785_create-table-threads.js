// This migration script creates a "threads" table with the specified columns and constraints.
// It includes a primary key on the 'id' column, ensures that 'title' and 'body' are not null,
// and establishes a foreign key relationship with the 'users' table through the 'user_id' column.

exports.up = (pgm) => {
  pgm.createTable("threads", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    body: {
      type: "TEXT",
      notNull: true,
    },
    date: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    owner: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users(id)",
      referencesConstraintName: "fk_threads.owner_users.id",
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("threads", "fk_threads.owner_users.id");
  pgm.dropTable("threads");
};
