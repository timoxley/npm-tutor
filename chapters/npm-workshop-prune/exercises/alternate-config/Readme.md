# Alternate, valid dependency configurations

During `npm install`, dependencies are only installed if the semver
range cannot be satisfied by an existing dependency higher in the
node_modules hierarchy.

## Task

Use `npm install <package-name>` and `rm` to create a different, yet 
valid, package hierarchy (i.e. no extraneous packages or missing 
dependencies).

Run `verify` to proceed.

## More Information

The `./prune` directory contains the following package.json:

```json
{
  "name": "prune-example",
  "version": "0.0.0",
  "dependencies": {
    "accepts": "1.0.6"
  }
}
```

The hierarchy produced with `npm ls` looks like this:

```
prune-example@0.0.0
└─┬ accepts@1.0.6
  ├── mime-types@1.0.1
  └── negotiator@0.4.7
```

## Conditions

* Do not change any files at all, i.e. no need to edit package.json.

## Hints

* Dependencies can be satisfied by packages higher in the hierarchy.
* This is doable with a single `rm` and `npm install <package-name>`
* You can `rm -Rf node_modules` and `npm install` from inside the 
`prune` directory if you need to restart.

