function getMenu() {
  return [
    { id: 1, name: 'Paneer Butter Masala', price: 180, isVeg: true },
    { id: 2, name: 'Chicken Curry', price: 220, isVeg: false },
    { id: 3, name: 'Dal Tadka', price: 120, isVeg: true },
    { id: 4, name: 'Egg Biryani', price: 200, isVeg: false },
    { id: 5, name: 'Veg Pulao', price: 150, isVeg: true },
    { id: 6, name: 'Fish Fry', price: 240, isVeg: false },
    { id: 7, name: 'Chole Bhature', price: 140, isVeg: true },
    { id: 8, name: 'Mutton Rogan Josh', price: 280, isVeg: false }
  ];
}

module.exports = { getMenu };
