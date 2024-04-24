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
