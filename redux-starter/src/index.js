import { compose, pipe } from "lodash/fp";

//let input = "   JavaScript   "; // remove whitepace from both sides of input
//let output = "<div>" + input.trim() + "</div>";

// Implementation in Functional Programming
//// Steps to take:
// trim string
// wrapInDiv

let input = "   JavaScript   ";

const trim = (str) => {
  return str.trim();
};

// const wrapInDiv = (str) => {
//   return `<div>${str}</div>`;
// };

// function wrap(type) {
//   return function (str) {
//     return `<${type}>${str}</${type}>`;
//   };
// }

// <=>

const wrap = (type) => (str) => `<${type}>${str}</${type}>`;

const toLowerCase = (str) => {
  return str.toLowerCase();
};

// const res = wrapInDiv(toLowerCase(trim(input)));

// const transform = compose(wrapInDiv, toLowerCase, trim);
// const res = transform(input);
// console.log(res);

const transform = pipe(trim, toLowerCase, wrap("span"));
const res = transform(input);
console.log(res);

console.log(wrap("div")("Hello"));
