// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

// using module of names
// const john = 'john'
// const peter = 'peter'
// const secret = 'SUPER SECRET'

const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')
require('./07-mind-grenade')
// console.log(data);

sayHi('susan')
sayHi(names.john)
sayHi(names.peter)
