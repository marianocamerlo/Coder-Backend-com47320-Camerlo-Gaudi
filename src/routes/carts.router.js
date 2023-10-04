import { Router } from "express";
import CartsManager from "../CartManager.js";

const router = Router();
const manager = new CartsManager("./src/file/carts.json");

router.post("/", async (req, res) => {
  await manager.createCart();
  res.send({ status: "success", message: "Cart created" });
});
router.get("/:id", async (req, res) => {
  const idCart = Number(req.params.id);
  const search = await manager.getCartById(idCart);
  res.send({ status: "success", search });
});
router.post("/:cid/product/:pid", async (req, res) => {
  const idCart = Number(req.params.cid);
  const idProduct = Number(req.params.pid);
  const productQuantity = req.body;
  console.log(productQuantity);
  await manager.addProductToCart(idCart, idProduct, productQuantity);
  res.send({ status: "success", message: "added products" });
});
export default router;
