# npm install --save-prefix

By default, `npm install --save` uses the `^` semver range when
installing dependencies.

You can use the "save prefix" configuration to alter this setting on a
per-install, or global level.

## Task

Use `--save-prefix` to alter the semver range in your package.json for
the request module to be **greater than or equal to** the current latest
version.

As with any configuration, you can permanently fix this to a particular
value with `npm config set <key> <value>`.

Run `verify` to proceed!

## Conditions

* Do not manually edit your package.json.

## Hints

* `npm help install`
