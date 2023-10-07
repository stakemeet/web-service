exports.up = async function (sql) {
    await sql`
    CREATE TABLE users (
        user_id serial PRIMARY KEY,
        email VARCHAR (255) UNIQUE NOT NULL,
        secret VARCHAR (255) NOT NULL
    )
    `
  }

  exports.down = async function (sql) {
    await sql`
      DROP TABLE IF EXISTS users
    `
  }
  