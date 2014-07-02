# Satifying dependencies


Installing a package can impact which version of a package is used by
your other dependencies.

npm does not always install the highest possible version allowed by a
package's semver. If a dependency is already satisfied by an existing
installed package, it will not be installed, even if a higher version is
available.

## Task

Change the "dependencies" of the package.json located in the
`prune` directory, such that running `npm install` in that directory
will provide a version of `mime-types` to `accepts` which is **LOWER**
than what is be installed without changing the package.json.

Run `verify` to proceed.

## More Information

The `prune` directory contains the following package.json:

```json
{
  "name": "prune-example",
  "version": "0.0.0",
  "dependencies": {
    "accepts": "1.0.6"
  }
}
```

After running `npm install` with an empty `node_modules`, the hierarchy
produced with `npm ls` looks like this:

```
prune-example@0.0.0
└─┬ accepts@1.0.6
  ├── mime-types@1.0.1
  └── negotiator@0.4.7
```

## Conditions

* Only edit the package.json in the `prune` directory.

## Hints

* This is a one-line change.
* You may need to look at accept's dependency's semver.
