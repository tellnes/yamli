var yaml = require('js-yaml')
  , yamli = require('../')
  , fs = require('fs')

// A
var str = fs.readFileSync(__dirname + '/foo.yaml').toString()
var foo = yaml.load(str, { schema: yamli.createSchema(__dirname) })
console.log(foo)


// B
var foo = yamli.load(__dirname + '/foo.yaml')
console.log(foo)
