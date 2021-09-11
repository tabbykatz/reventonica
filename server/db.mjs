import dotenv from "dotenv";
import pgp from "pg-promise";
const db = initDb();

export const getUsers = () => db.any("SELECT * FROM users");
export const getUser = (id) => {
  const sql = `SELECT users.*, ARRAY_AGG(event_id) favorites
  FROM users LEFT JOIN favorite_events ON id = user_id
  WHERE id = $<id> GROUP BY id
  `;

  return db.one(sql, { id });
};

export const addUser = (user) =>
  db.one(
    "INSERT INTO users(username, email) VALUES(${username}, ${email}) RETURNING *",
    user,
  );

export const deleteUser = (userId) =>
  db.none("DELETE FROM users WHERE id = ${userId}", { userId });

export const getEvents = () => db.any("SELECT * FROM events");

export const addEvent = (event) =>
  db.one(
    "INSERT INTO events(name, date, category) VALUES(${name}, ${date}, ${category}) RETURNING *",
    event,
  );

export const deleteEvent = (eventId) =>
  db.none("DELETE FROM events WHERE id = ${eventId}", { eventId });

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
