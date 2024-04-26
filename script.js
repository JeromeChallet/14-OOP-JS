'use strict';
////////////CONSTRUCTOR FUNCTION AND THE NEW OPERATOR////////////
//constructor function
// constructor functions start with a capital letter
// 1. a new empty object is creates
// 2. the function is called and this = {}
// 3. the new empty object is linked to a prototype
// 4. function automically return the empty object from the begining
const Person = function (fullName, birthYear) {
  // these the instance properties
  this.birthYear = birthYear;
  this.fullName = fullName;

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
console.log(jerome.hasOwnProperty('fullName')); //true
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

////////////CLASSES////////////
// 1. classes are not hoisted, we must declare them before using them
// 2. classes are 1st class citizen that can be passed to functions and also returned from functions
// 3. classes are executed in strict mode
// behind the scenes classes are a special kind of function
// class expression
//const PersonCl =class{}
// class declaration
class PersonCl {
  // the first thing to do is to add a constructor method
  // the constructor is automatically called when we create a new object
  // this is where we pass the properties for the arguments we want the function to have
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // this method written outside the constructor will be onto the prototype and not the object itself
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // the setter will check if it is a full name
  // we are creating a setter for a property name that already exist we use _
  // we are creating a new _fullname variable
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }
}

const jay = new PersonCl('jay davis', 1996);
console.log(jay);
console.log(jay.age); // 41

// adding a method manually to the prototype
PersonCl.prototype.greet = function () {
  console.log(`hello ${this.fullName}`);
};

jay.greet(); // hello jay

const walter = new PersonCl('walter white', 1965);

////////////SETTERS AND GETTERS////////////
// every object has setters and getters that are assessor properties
// normal properties are data properties
// they are usefull for data validation
const account = {
  owner: 'jerome',
  movements: [200, 530, 120, 300],

  //getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  //setter
  // needs to have exactly one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};

// usefull when we want to read something as a property but still need to do calculations
console.log(account.latest); // 300

// setter use
account.latest = 50;
console.log(account.movements); // [200, 530, 120, 300, 50]
