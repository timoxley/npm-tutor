# npm install --save --save-prefix

You can use the "save prefix" configuration to change the
default semver range `^` on a per-install or global level.

Run install with the `--save-prefix` to install a package with a particular prefix.


## Task

Alter the semver range in your package.json for the `once` module to be **greater than or equal to** the current latest version.

Run `npm-tutor verify` to proceed!

## Conditions

* Do not manually edit your package.json.

## Hints

* `npm help install`
* You might need quotes around your prefix.
  e.g. `npm install --save --save-prefix=">="`

## Tips

As with any npm configuration, you can permanently fix the value to a
particular setting with `npm config set <key> <value>`, see `npm help
config` for more information.
