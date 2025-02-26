const mongoose = require("mongoose");

const Animals = mongoose.model("Animal", {
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  type: {
    type: String,
    required: true,
    minLength: 3,
  },
});
const sumar = (a, b) => {
  a + b;
};
console.log(sumar(4, 2));

function sumar(a, b) {
  return a + b;
}
const restar = (a, b) => {
  return a - b;
};
console.log(sumar(5, 3));
console.log(restar(10, 2));

module.exports = Animals;
