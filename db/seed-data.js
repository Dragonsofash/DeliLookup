import client from "./client";

export async function createTables() {
  console.log("Starting to build tables...");
  try {
    await client.query(`
    CREATE TABLE meats (
        id SERIAL PRIMARY KEY,

    );
    `);
    console.log("Tables have been built!");
  } catch (err) {
    console.log("Error building tables!");
    throw err;
  }
}

export async function dropTables() {
  console.log("Starting to dop tables...");
  try {
    await client.query(`
        DROP TABLE meats;
        `);
    console.log("Tables have been dropped!");
  } catch (err) {
    console.log("Error dropping tables!");
    throw err;
  }
}

export async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
  } catch (err) {
    console.log("Error rebuilding Database!");
    throw err;
  }
}
