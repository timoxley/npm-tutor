# npm ls

`npm ls` can also produce json output which includes more contextual
information about where dependencies came from and which semver ranges
they are satisfying.

## Task

A copy of 'through2' is installed in the `./npmls` directory. Change
into this directory and use `npm ls --json` to figure out which semver
range led to `string_decoder` being installed **from** within
`through2`?

```
npm-tutor verify <semver-range>
```

e.g. "npm-tutor verify ~2.2.1"

## Hint

* `npm ls --json`
* `npm help ls`
