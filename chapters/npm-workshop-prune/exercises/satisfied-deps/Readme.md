# Satifying Dependencies

Installing a package can impact which version gets used by seemingly
unrelated dependencies deeper in the `node_modules` hierarchy. Depending
on the order packages are installed, this can lead to different yet
valid node_modules configurations.

npm does not always install the highest possible version allowed by a
package's semver. **If a dependency is already satisfied by an existing
installed package, it will not be installed**, even if a higher version is
available and would be valid.

The `./different-dependencies` directory contains the following package.json:

```json
{
  "name": "different-dependencies-example",
  "version": "0.0.0",
  "dependencies": {
    "accepts": "1.0.6"
  }
}
```

After running `npm install` the dependency hierarchy looks like so:

```
different-dependencies-example@0.0.0
└─┬ accepts@1.0.6
  ├── mime-types@1.0.1
  └── negotiator@0.4.7
```

## Task

From the `./different-dependencies` directory:

Change the "dependencies" of `./different-dependencies/package.json` such that with a
fresh `npm install`, the version of `mime-types` used by `accepts` is
**LOWER** than what was be installed prior to changing the package.json.

i.e. Alter the parent package so the child package receives a different
module configuration.

Remove any node_modules in the `./different-dependencies` directory and run
`npm install` to test your theory.

Run `npm-tutor verify` to proceed (node_modules will be wiped).

## Conditions

* Only edit the package.json in the `./different-dependencies` directory.

## Hints

* This is a one-line change.
