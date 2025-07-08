// This migration script creates a "replies" table for comments, allowing users to reply to existing comments in a thread.
// It includes the necessary columns and foreign key constraints to maintain referential integrity with the users, threads, and comments tables.

exports.up = (pgm) => {
  pgm.createTable("replies", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    content: {
      type: "TEXT",
      notNull: true,
    },
    date: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    is_deleted: {
      type: "BOOLEAN",
      notNull: true,
      default: false,
    },
    comment_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "comments(id)",
      referencesConstraintName: "fk_replies.comment_id_comments.id",
      onDelete: "CASCADE",
    },
    owner: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users(id)",
      referencesConstraintName: "fk_replies.owner_users.id",
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("replies", "fk_replies.owner_users.id");
  pgm.dropConstraint("replies", "fk_replies.comment_id_comments.id");
  pgm.dropTable("replies");
};
