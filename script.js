'use strict';
////////////CONSTRUCTOR FUNCTION AND THE NEW OPERATOR////////////
//constructor function
// constructor functions start with a capital letter
// 1. a new empty object is creates
// 2. the function is called and this = {}
// 3. the new empty object is linked to a prototype
// 4. function automically return the empty object from the begining
const Person = function (firstName, birthYear) {
  // these the instance properties
  this.birthYear = birthYear;
  this.firstName = firstName;

  // never create a method inside a constructor function
  // because it creates a copy for each instance thus very slow
  //   this.calcAge = function () {
  //     console.log(20377 - this.birthYear);
  //   };
};

// the difference with a regular function is that we use the "new" keyword
// jerome is an instance of the class person
const jerome = new Person('jerome', 1986);
const jack = new Person('Jack', 1975);

console.log(jerome instanceof Person); // true

////////////PROTOTYPES////////////
// each function in JS has a property called prototype
// adding a method to the prototype property
// with this method, all instances can re-use this function with having it being copied all the time
// this is prototypal inheritance
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jerome.calcAge(); //51
// prototype of jerome instance
// the prototype of jerome object is the prototype property of the constructor function
console.log(jerome.__proto__);
// Person.prototype is not the prototype of Person
// but instead will be used as teh prototype of all the objects
// that are created with the Person constructor function
// you could the prototype property is prototypeOfLinkedObjects
console.log(jerome.__proto__ === Person.prototype); // true

// used to check if it is the prorotype of an object
console.log(Person.prototype.isPrototypeOf(jerome)); // true

Person.prototype.species = 'Homo Sapiens';
// now they have species in the __proto__
console.log(jerome, jack);
// however this new speices property is not directly in the object
console.log(jerome.hasOwnProperty('firstName')); //true
console.log(jerome.hasOwnProperty('species')); //false

////////////PROTOTYPAL INHERITANCE////////////
console.log(jerome.__proto__);
console.log(jerome.__proto__.__proto__);
console.log(jerome.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); //function

const arr = [3, 6, 4, 6, 3, 5, 6, 9, 3]; // new Array === []
console.log(arr.__proto__);
// the prototype property of the constructor is gonna
// the prototype of all the objects created by that constructor
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

// any array inherit its method through its prototype
// we add a method to Array meaning all created arrays will inherit it
// the following returns array with unique values
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique()); // [4, 5, 6, 9, 3]

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
