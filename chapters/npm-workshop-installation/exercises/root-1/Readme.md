# Packages are not always installed in `./node_modules`

You don't need to always change back to your project's root directory to
install packages. Local dependencies are installed in the nearest
`package.json` or `node_modules` directory.

This can be a nice convenience but it can also lead to accidentally
installing packages into the wrong location.

# Task

At the start of this chapter we copied a directory called "npmroot" into
the current directory.

If `npm install once` is executed from the `npmroot/a/b/c` directory
with the following structure:

```
> tree npmroot
npmroot
└── a
    ├── b
    │   ├── c
    │   │   └── index.js
    │   └── node_modules
    │       └── index.js
    └── package.json
```

Where would `once` be installed to?

```
npm-tutor verify <path/to/node_modules>
```

e.g. `npm-tutor verify ./npmroot/d/node_modules`

## Hints

* `npm help root`
