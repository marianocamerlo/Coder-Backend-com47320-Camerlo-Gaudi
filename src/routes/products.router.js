import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const manager = new ProductManager("./src/file/productos.json");

router.get("/", async (req, res) => {
  const productsFromFile = await manager.getProducts();
  res.send({ status: "success", productsFromFile });
});

router.get("/:id", async (req, res) => {
  const idProduct = Number(req.params.id);
  const searchProductById = await manager.getProductById(idProduct);
  if (!searchProductById)
    return res
      .status(400)
      .send({ status: "error", error: "Producto no encontrado" });
  res.send({ status: "success", searchProductById });
});

router.post("/", async (req, res) => {
  const newProduct = req.body;

  // Validación de campos obligatorios
  const requiredFields = [
    "title",
    "description",
    "code",
    "price",
    "status",
    "stock",
    "category",
    "thumbnail",
  ];
  const missingFields = requiredFields.filter(
    (field) => !(field in newProduct)
  );

  if (missingFields.length > 0) {
    return res.status(400).send({
      status: "error",
      error: `Faltan datos obligatorios: ${missingFields.join(", ")}`,
    });
  }

  await manager.addProduct(newProduct);
  res.send({ status: "success", message: "Producto agregado" });
});

router.put("/:id", async (req, res) => {
  const idProduct = Number(req.params.id);
  const newData = req.body;

  // Validación de campos obligatorios
  const requiredFields = [
    "title",
    "description",
    "code",
    "price",
    "status",
    "stock",
    "category",
    "thumbnail",
  ];
  const missingFields = requiredFields.filter((field) => !(field in newData));

  if (missingFields.length > 0) {
    return res.status(400).send({
      status: "error",
      error: `Faltan datos obligatorios: ${missingFields.join(", ")}`,
    });
  }

  const productUpdated = await manager.updateProduct(idProduct, newData);

  if (!productUpdated) {
    return res.status(404).send({
      status: "error",
      error: `Producto con ID ${idProduct} no encontrado`,
    });
  }

  res.send({ status: "success", message: "Producto actualizado" });
});

router.delete("/:id", async (req, res) => {
  const idProduct = Number(req.params.id);
  await manager.deleteProduct(idProduct);
  res.send({ status: "success", message: "Producto eliminado" });
});

export default router;
