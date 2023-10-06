import express from "express";
import {
  createItems,
  getAllItems,
  getItemById,
  getItemByName,
  getItemsByCategory,
  getItemsByBrand,
  updateItem,
  deleteItem,
} from "../db/db-items";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.send(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await getItemById(itemId);

    if (item) {
      res.send(item);
    } else {
      res.status(404).send({
        error: "ERROR",
        message: `Item with Id, ${itemId}, not found`,
        title: "itemNotFound",
      });
    }
  } catch (err) {
    console.error("Error fething item:", err);
    res.status(500).send({
      error: "ERROR",
      message: "Internal server error while fetching product",
      title: "internalServerError",
    });
  }
});

router.get("/:itemName", async (req, res, next) => {
  const {itemName} = req.params;
  try {
    const item = await getItemByName(itemName); 
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({
        error: "ERROR",
        message: `Item ${itemName} not found`,
        title: "itemNotFound"
      })
    }
  } catch (err) {
    console.log("Error fetching item:", err);
    res.status(500).send({
      error: "ERROR",
      message: "Internal server error",
      title: "internalServerError"
    })
  }
})