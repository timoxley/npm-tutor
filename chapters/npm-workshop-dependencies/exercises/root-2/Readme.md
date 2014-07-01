# npm root

You don't need to always change back to your project's root directory to
install packages. Local dependencies are installed in the nearest
`package.json` or `node_modules` directory.

# Task

Modify the items in `npmroot` such that executing `npm install once` in `npmroot/a/b/c` would be install the package into
`npmroot/a/node_modules`.

You may add or remove anything except the `npmroot/a/b/c` directories.

```
verify
```

## Hints

* Note the existence or lack of `node_modules` and/or `package.json`.

