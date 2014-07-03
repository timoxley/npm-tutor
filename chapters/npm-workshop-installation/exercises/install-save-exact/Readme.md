# npm install --save-exact

By default, `npm install --save` uses the `^` semver range when
saving dependencies to the `package.json`.

```json
{
  "name": "example-package",
  "version": "0.0.0",
  "dependencies": {
    "once": "^1.3.0"
  }
}
```

To remove the semver prefix and force a package to only ever install
a specific version of a package, use the `--save-exact` configuration.

## Task

Install the latest version of `request` to your package.json, ensuring
only that specific version will be installed.

Run `verify` to proceed!

## Conditions

* Do not manually edit your package.json.

## Hints

* `npm help install`
