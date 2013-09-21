# yamli

Yaml adds `!include` support to [js-yaml](https://npmjs.org/package/js-yaml).

## Usage

foo.yaml

```yaml
foo: !include bar.yaml
```

bar.yaml

```yaml
bar: ~
```

example.js

```js
var foo = yamli.load('foo.yaml')
console.log(foo)
````

Output:

    { foo: { bar: null } }

## methods

yamli implements `load`, `loadAll`, `safeLoad` and `safeLoadAll`. All methods
works like [js-yaml](https://npmjs.org/package/js-yaml) except they expects a
filename instead of an yaml string as first argument.


## install

Using [npm](http://npmjs.org) do:

    $ npm install yaml

# license

MIT
