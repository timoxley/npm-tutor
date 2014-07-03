# Specifying Dependencies

The package.json can include a list of dependencies for the current package, e.g.

```json
{
  "name": "accepts",
  "version": "1.0.1",
  "dependencies": {
    "mime": "~1.2.11",
    "negotiator": "~0.4.0"
  }
}
```

When `accepts@1.0.1` is installed, npm ensures valid versions of `mime`
and `negotiator` will be available to the `accepts` package.

If valid versions of these dependencies aren't already installed, npm
will download and install them in a `node_modules` directory within the
`accepts` package.

---


You rarely need to manually edit your package.json; npm includes
many commands and flags which will automate much of the tedium of
maintaining a package.json.

For example, given the right flags, npm can update your package.json for
you when installing dependencies. That way there's no need to check which
version installed and your package.json will be updated accordingly.

## Task

Specify 'once' as a dependency in the current package.json.

Run `verify` to proceed!

## Conditions

* Do not manually edit your package.json.

## Hints

* `npm help install`
