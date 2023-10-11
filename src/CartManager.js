import fs from "fs/promises";

class CartManager {
  constructor(filePath) {
    this.path = filePath;
    this.Carts = [];
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const cartsFromFile = await fs.readFile(this.path, "utf-8");
        this.Carts = JSON.parse(cartsFromFile);
      }
    } catch (error) {
      console.error(`Error al leer el archivo en la ruta: ${this.path} - ${error.message}`);
    }
    return this.Carts;
  }

  async getCartById(idCart) {
    this.Carts = await this.getCarts();
    const searchId = this.Carts.findIndex((element) => element.id === idCart);
    if (searchId < 0) {
      console.log(`No se pudo encontrar el carrito con el ID: ${idCart}`);
      return;
    }
    return this.Carts[searchId].products;
  }

  async createCart() {
    const newCart = {
      products: [],
    };
    this.Carts = await this.getCarts();
    if (this.Carts.length === 0) newCart.id = 1;
    else newCart.id = this.Carts[this.Carts.length - 1].id + 1;
    this.Carts.push(newCart);
    try {
      await fs.writeFile(this.path, JSON.stringify(this.Carts, null, 2), "utf-8");
    } catch (error) {
      console.error(`Error al escribir en el archivo - ${error.message}`);
    }
  }

  async addProductToCart(idCart, idProduct, productQuantity) {
    this.Carts = await this.getCarts();
    const { quantity } = productQuantity;
    
    // Verificar si el producto existe antes de agregarlo al carrito
    const productExists = await manager.getProductById(idProduct);
  
    if (!productExists) {
      console.error(`Producto con ID ${idProduct} no encontrado.`);
      return;
    }
  
    const indexCart = this.Carts.findIndex((element) => element.id === idCart);
    if (indexCart < 0) return console.log(`No se encontró ningún carrito con el ID: ${idCart}`);
    let foundProduct = false;
  
    this.Carts[indexCart].products.forEach((element) => {
      if (element.product === idProduct) {
        element.quantity += quantity;
        foundProduct = true;
      }
    });
  
    if (!foundProduct) {
      const newProduct = { product: idProduct, quantity };
      this.Carts[indexCart].products.push(newProduct);
    }
  
    try {
      await fs.writeFile(this.path, JSON.stringify(this.Carts, null, 2), "utf-8");
    } catch (error) {
      console.error(`Error al escribir en el archivo - ${error.message}`);
    }
  }
}

export default CartManager;
