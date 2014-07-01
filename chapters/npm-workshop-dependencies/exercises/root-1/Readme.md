# npm root

You don't need to always change back to your project's root directory to
install packages. Local dependencies are installed in the nearest
`package.json` or `node_modules` directory.

# Task

At the start of this chapter we copied a directory called "npmroot" into
the current directory.

If `npm install once` is executed from the `npmroot/a/b/c` directory,
which node_modules directory will `once` will be installed to?

```
verify <path/to/node_modules>
```

## Hints

* `npm help root`
