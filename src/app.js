const fetch = require("node-fetch");

const userUrl = "https://fakestoreapi.com/users";
const cartUrl =
  "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07";
const productUrl = "https://fakestoreapi.com/products";

const retrieveUsers = async () => {
  const userResponse = await fetch(userUrl);
  const users = userResponse.json();
  return users;
};

const retrieveCarts = async () => {
  const cartResponse = await fetch(cartUrl);
  const carts = cartResponse.json();
  return carts;
};

const retrieveProducts = async () => {
  const productResponse = await fetch(productUrl);
  const products = productResponse.json();
  return products;
};

const createCategoryData = (products) => {
  const categoryData = {};

  products.forEach((product) => {
    if (categoryData[product.category]) {
      categoryData[product.category] += product.price;
    } else {
      categoryData[product.category] = product.price;
    }
    categoryData[product.category] = +categoryData[product.category].toFixed(2);
  });

  return categoryData;
};

const findHighestValueCart = (carts, users, products) => {
  let highestValue = 0;
  let highestValueCart = null;

  carts.forEach((cart) => {
    let cartValue = 0;
    cart.products.forEach((product) => {
      cartValue +=
        products.find((p) => p.id === product.productId).price *
        product.quantity;
    });
    if (cartValue > highestValue) {
      highestValue = cartValue;
      highestValueCart = cart;
    }
  });

  const owner = users.find((user) => user.id === highestValueCart.userId);

  return {
    cartValue: +highestValue.toFixed(2),
    owner: `${owner.name.firstname} ${owner.name.lastname}`,
  };
};

const findFurthestLivingUsers = (users) => {
  let maxDistance = -1;
  let furthestUsers = null;

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const user1 = users[i];
      const user2 = users[j];
      const distance = getDistanceInKm(
        user1.address.geolocation.lat,
        user1.address.geolocation.long,
        user2.address.geolocation.lat,
        user2.address.geolocation.long
      );

      if (distance > maxDistance) {
        maxDistance = distance;
        furthestUsers = [`${user1.name.firstname} ${user1.name.lastname}`, `${user2.name.firstname} ${user2.name.lastname}`];
      }
    }
  }

  return furthestUsers;
}

const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

module.exports = {
  retrieveUsers,
  retrieveCarts,
  retrieveProducts,
  createCategoryData,
  findHighestValueCart,
  findFurthestLivingUsers,
};
