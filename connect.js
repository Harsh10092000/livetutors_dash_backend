// import mysql from "mysql";
// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "property",
// });
import { createPool } from "mysql2";

export const db = createPool({
  host: "194.59.164.60",
  user: "u414768521_live_tutors",
  password: "1K?vGyk0Bb",
  database: "u414768521_live_tutors",
  connectionLimit: 10000
});
