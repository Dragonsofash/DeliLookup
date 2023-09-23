import client from "./client";

export async function createTables () {
    console.log("Starting to build tables...");
try {
    await client.query(`
    CREATE TABLE meats (
        id SERIAL PRIMARY KEY,
    );
    `)
    console.log("Tables have been built!")
} catch (err){
    console.log("Error building tables!")
    throw err;
}
}