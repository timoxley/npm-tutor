# Alternate, valid dependency configurations

Dependencies can be satisfied by packages higher in the hierarchy. For
example, if we have a package hierarchy like so:

```
> npm ls
glob@3.2.9
├── inherits@2.0.1
└─┬ minimatch@0.2.14
  ├── lru-cache@2.5.0
  └── sigmund@1.0.0
```

This is also a valid configuration:

```
> npm ls
glob@3.2.9
├── inherits@2.0.1
├── lru-cache@2.5.0
├── minimatch@0.2.14
└── sigmund@1.0.0
```

Note that 'lru-cache' and 'sigmund' are *not* listed in glob's
dependencies, but they are not listed as extraneous dependencies because
they satisfy dependencies inside 'minimatch'.

The point of this exercise is to understand there are many possible
valid configurations of node_modules.

## Task

From the `./different-dependencies` directory:

Change the folder structure in node_modules to create a different, yet
valid, package hierarchy.

Run `npm-tutor verify` to proceed.

## Conditions

* Do not change any files at all, i.e. do not edit any package.json.
* There must be no extraneous packages or missing dependencies.

## Hints

* This is doable with a single call to `mv`.
* If you need to restart: `rm -Rf node_modules` and `npm install` from inside the
`different-dependencies` directory.
