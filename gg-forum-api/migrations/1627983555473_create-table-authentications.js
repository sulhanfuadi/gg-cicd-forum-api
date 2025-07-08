// This migration script creates an 'authentications' table with a token column.
// The table is designed to store authentication tokens for users, allowing for secure access to the application.

exports.up = (pgm) => {
  pgm.createTable("authentications", {
    token: {
      type: "TEXT",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("authentications");
};
