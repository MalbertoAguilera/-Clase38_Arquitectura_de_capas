const ProductService = require("../services/productsService");
const assert = require("assert").strict;

describe("Test de integración de Productos", () => {
  it("Debería crear el contenedor de productos vació", async () => {
    const productosApi = new ProductService();
    assert.strictEqual(await productosApi.buscar().length, 0);
  });
  it("Deberia adicionar producto correctamente", () => {
    const productosApi = new ProductService();
    productosApi.agregar({
      title: "testProducto",
      price: 155.55,
      stock: 10,
      thumbnail: "https://picsum.photos/50"
    });
    assert.strictEqual(await productosApi.buscar().length, 1);
    assert.deepStrictEqual(await productosApi.buscar(), [
      {
        title: "testProducto",
        price: 155.55,
        stock: 10,
        thumbnail: "https://picsum.photos/50"
      },
    ]);
  });
});