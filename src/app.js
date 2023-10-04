import express from "express";
import path from "path";
import ProductManager from "./ProductManager.js";

const port = 8080;
const app = express();
const server = app.listen(port, () =>
  console.log(`Servidor activo en puerto ${port}`)
);

app.use("/static", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const absolutePath = path.join(process.cwd(), "src", "productos.json");
const productManager = new ProductManager(absolutePath);

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.loadProductsFromFile();
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Endpoint para obtener un producto por ID
app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const products = await productManager.loadProductsFromFile();
    const product = products.find((p) => p.id === parseInt(pid));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: `Producto con ID ${pid} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

server;
