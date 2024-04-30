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

Person.hey = function () {
  console.log('hey there');
  console.log(this); // entire contructor function
};
Person.hey();

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

  // instance emethod
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

  //static method
  get fullName() {
    return this._fullName;
    console.log(this);
  }

  static hey() {}
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

PersonCl.hey();

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

////////////STATIC METHODS////////////
// it's function that belong to the class itself instead of one of its instances

////////////OBJECT.CREATE////////////
// set the prototype of an object to any other object that we want
// create an object that we want to be the prototype of all person objects

// here is the method that we want the Person object to inherit
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// now we just need to create a person object with the object above as the prototype
// will return a brand new object that is linked to the prototype that we passed in here
// the steven object is created and linked to the PersonProto object that is its prototype
const steven = object.create(PersonProto);
console.log(steven);
steven.name = 'steven';
steven.birthYear = 2002;
steven.calcAge(); // 35

console.log(steven.__proto__ === PersonProto); //true

const sarah = Object.create(PersonProto);
sarah.init('sarah', 1979);
sarah.calcAge();

////////////INHERITANCE BETWEEN CLASSES CONSTRUCTOR FUNCTIONS////////////
// construtor function for the Person
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// construtor function for the Student
const Student = function (firstName, birthYear, course) {
  // we want this keyword inside Student to be the this keyword inside Person therefore we declare it here
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Objec.create insures it inherits from Person, otherwise it would be a copy
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`my name is ${this.firstName} and i study ${this.course}`);
};

const mike = new Student('mike', 2020, 'comp science');
mike.introduce();
mike.calcAge(); //17

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__); // Person.prototype.calcAge

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

////////////INHERITANCE BETWEEN CLASSES ES6 CLASSES////////////
// to implement inheritance between es6 classes
// we need the extend keyword and the super function
// to make the Student class inherit from the Person class
// this will link the prototypes behind the scene
// if you dont need any new properties then you dont need to write a constructor in teh child class
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //super is basically the constructor function of the parent class
    //super needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`my name is ${this.firstName} and i study ${this.course}`);
  }
  //this will overide the method from the parent class
  calcAge() {
    console.log(
      `im ${2037 - this.birthYear} years old but i feel like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('martha', 2012, ' comp science');
martha.introduce();
martha.calcAge();
