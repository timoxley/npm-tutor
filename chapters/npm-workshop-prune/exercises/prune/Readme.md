# The Danger of Extraneous Packages

Extraneous packages regularly lead to accidentally publishing broken
code; it will work on your machine, but when someone else goes to
install your package, they'll hit `Cannot find module` errors. While
trivial to fix, it's embarassing as a package author!

Thankfully, npm includes the `prune` utility to recursively remove
extraneous packages from your dependency tree.

## Task

Remove any extraneous dependencies from the current directory using `npm prune`.

Run `npm-tutor verify` to proceed!

## Conditions

* Do not edit your package.json or remove any installed packages by hand.

## Hints

* `npm help prune`

## Tips

* You can also use `npm prune --production` to remove development
dependencies.
