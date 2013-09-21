var yaml = require('js-yaml')
  , fs = require('fs')
  , path = require('path')
  , extend = require('util-extend')


function Loader(options) {
  options = options || {}
  if (typeof options === 'string') options = { cwd: options, sync: true }
  this.options = options

  this.cwd = options.cwd || options.filename && path.dirname(options.filename) || ''

  this.schema = new yaml.Schema(
      { include: [ options.schema || yaml.Schema.DEFAULT ]
      , explicit: [ createType(this) ]
      }
    )

  this.output = null
}

exports.Loader = Loader

function createType(loader) {
  var type =
        new yaml.Type(
            '!include'
          , { loader:
              { kind: 'string'
              , resolver: function (filename) {
                  return loader.load(filename)
                }
              }
            }
          )
  return type
}

Loader.prototype.load = function (filename) {
  filename = path.resolve(this.cwd, filename)

  var options = extend({}, this.options)
  options.filename = filename
  options.schema = this.schema

  var content = fs.readFileSync(filename).toString()

  if (this.output) {
    return yaml.loadAll(content, this.output, options)
  } else {
    return yaml.load(content, options)
  }
}

exports.createSchema = function (options) {
  var loader = new Loader(options)
  return loader.schema
}

function load(defaultSchema, filename, options, output) {
  options = extend({}, options)

  options.schema = options.schema || defaultSchema

  filename = path.resolve(filename)
  options.filename = filename

  var loader = new Loader(options)
  loader.output = output

  return loader.load(filename)
}

exports.loadAll = function (filename, options, output) {
  return load(yaml.DEFAULT_FULL_SCHEMA, filename, options, output)
}
exports.safeLoadAll = function (filename, options, output) {
  return load(yaml.DEFAULT_SAFE_SCHEMA, filename, options, output)
}
exports.load = function (filename, options) {
  return load(yaml.DEFAULT_FULL_SCHEMA, filename, options)
}
exports.safeLoad = function (filename, options) {
  return load(yaml.DEFAULT_SAFE_SCHEMA, filename, options)
}
