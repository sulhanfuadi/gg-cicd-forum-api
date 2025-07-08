// This migration script creates a "likes" table for comments, allowing users to like comments in a thread.
// It includes the necessary columns and foreign key constraints to maintain referential integrity with the users and comments tables.

exports.up = (pgm) => {
  pgm.createTable("likes", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    date: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    comment_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "comments(id)",
      referencesConstraintName: "fk_likes.comment_id_comments.id",
      onDelete: "CASCADE",
    },
    owner: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users(id)",
      referencesConstraintName: "fk_likes.owner_users.id",
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("likes", "fk_likes.owner_users.id");
  pgm.dropConstraint("likes", "fk_likes.comment_id_comments.id");
  pgm.dropTable("likes");
};
