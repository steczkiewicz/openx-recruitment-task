const {
  retrieveUsers,
  retrieveCarts,
  retrieveProducts,
  createCategoryData,
  findHighestValueCart,
  findFurthestLivingUsers,
} = require("./app");

describe("tests", () => {
  test("retrieve users", async () => {
    const users = await retrieveUsers();
    expect(Array.isArray(users)).toBe(true);
  });

  test("retrieve carts", async () => {
    const carts = await retrieveCarts();
    expect(Array.isArray(carts)).toBe(true);
  });

  test("retrieve products", async () => {
    const products = await retrieveProducts();
    expect(Array.isArray(products)).toBe(true);
  });

  test("category names and values", () => {
    const products = [
      { id: 1, category: 'clothing', price: 10.99 },
      { id: 2, category: 'clothing', price: 15.99 },
      { id: 3, category: 'electronics', price: 99.99 },
      { id: 4, category: 'books', price: 5.99 },
      { id: 5, category: 'books', price: 7.99 },
    ];

    const expectedCategoryData = {
      clothing: 26.98,
      electronics: 99.99,
      books: 13.98,
    };

    const categoryData = createCategoryData(products);

    expect(categoryData).toEqual(expectedCategoryData);
  });

  test("highest value cart", () => {
    const carts = [
      { id: 1, userId: 1, products: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }] },
      { id: 2, userId: 2, products: [{ productId: 3, quantity: 1 }, { productId: 4, quantity: 3 }] },
      { id: 3, userId: 3, products: [{ productId: 5, quantity: 4 }, { productId: 1, quantity: 1 }] },
    ];

    const users = [
      { id: 1, name: { firstname: 'John', lastname: 'Doe' } },
      { id: 2, name: { firstname: 'Jane', lastname: 'Smith' } },
      { id: 3, name: { firstname: 'David', lastname: 'Morrison' } },
    ];

    const products = [
      { id: 1, price: 10.99 },
      { id: 2, price: 15.99 },
      { id: 3, price: 99.99 },
      { id: 4, price: 5.99 },
      { id: 5, price: 7.99 },
    ];

    const expectedHighestValueCart = {
      cartValue: 117.96,
      owner: 'Jane Smith',
    };

    const highestValueCart = findHighestValueCart(carts, users, products);

    expect(highestValueCart).toEqual(expectedHighestValueCart);
  });

  test("furthest living users", () => {
    const users = [
      {
        name: { firstname: 'Alice', lastname: 'Anderson' },
        address: { geolocation: { lat: '60.0000', long: '60.0000' } },
      },
      {
        name: { firstname: 'Bob', lastname: 'Brown' },
        address: { geolocation: { lat: '30.0000', long: '30.0000' } },
      },
      {
        name: { firstname: 'Charlie', lastname: 'Chaplin' },
        address: { geolocation: { lat: '20.0000', long: '20.0000' } },
      },
    ];

    const result = findFurthestLivingUsers(users);
    expect(result).toEqual(['Alice Anderson', 'Charlie Chaplin']);
  });
});