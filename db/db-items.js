import client from "./client";

async function createItems({
  name,
  description,
  plu,
  brand,
  category,
  grabNgo,
  price,
}) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
        INSERT INTO items (name, description, plu, brand, category, grabNgo, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
      [name, description, plu, brand, category, grabNgo, price]
    );
    return item;
  } catch (err) {
    console.log("Erroring creating product");
    throw err;
  }
}

async function getAllItems() {
  try {
    const { rows: items } = await client.query(`
        SELECT items.*
        FROM items;
        `);
    return items;
  } catch (err) {
    console.log("Error fetching all items");
    throw err;
  }
}

export { createItems, getAllItems };
