import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";

const port = 8080;
const app = express();
const server = app.listen(port, () =>
  console.log(`Servidor activo en puerto ${port}`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products/", productRouter);
app.use("/api/carts/", cartRouter);

server;
