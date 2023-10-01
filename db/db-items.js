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

async function getItemById({ id }) {
  try {
    const {
      row: [item],
    } = await client.query(
      `
    SELECT items.*
    FROM items
    WHERE id = $1;
    `,
      [id]
    );
    return item;
  } catch (err) {
    console.log("Error finding item by ID");
    throw err;
  }
}

async function getItemByName({ name }) {
  try {
    const {
      row: [item],
    } = await client.query(
      `
    SELECT items.*
    FROM items
    WHERE name = $1;
    `,
      [name]
    );
    return item;
  } catch (err) {
    console.log("Error finding item by Name");
    throw err;
  }
}

async function getItemsByCategory({ category }) {
  try {
    const { row: items } = await client.query(
      `
    SELECT items.*
    FROM items
    WHERE category = $1;
    `,
      [category]
    );
    return items;
  } catch (err) {
    console.log("Error finding item by Category");
    throw err;
  }
}

async function getItemsByBrand({ brand }) {
  try {
    const { row: items } = await client.query(
      `
    SELECT items.*
    FROM items
    WHERE brand = $1;
    `,
      [brand]
    );
    return items;
  } catch (err) {
    console.log("Error finding item by Brand");
    throw err;
  }
}

async function updateItem({ id, ...fields }) {
  try {
    const string = Object.keys(fields)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");

    const {
      rows: [item],
    } = await client.query(
      `
    UPDATE items
    SET ${string}
    WHERE id = ${id}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return item;
  } catch (err) {
    console.log("Error updating item");
    throw err;
  }
}

async function deleteItem({ id }) {
  try {
    const { row: item } = await client.query(
      `
  DELETE FROM items
  WHERE id = $1;
  `,
      [id]
    );
    return item;
  } catch (err) {
    console.log("Error deleting item");
    throw err;
  }
}

export {
  createItems,
  getAllItems,
  getItemById,
  getItemByName,
  getItemsByCategory,
  getItemsByBrand,
  updateItem,
  deleteItem,
};
