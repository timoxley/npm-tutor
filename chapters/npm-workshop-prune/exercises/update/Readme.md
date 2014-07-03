# Ensuring latest packages are used

`npm update` will update all packages to the highest version possible by
their semver, irrespective of whether the dependency is already
satisfied.

**`npm update` is not for upgrading packages to newer versions**. update is
for ensuring packages receive the greatest possible version according to
the currently specified semver ranges.

## Task

From the `./update` directory:
* Run `npm install`
* Note the package hierarchy.
* Run `npm update`.
* Note the new package hierarchy.

With *exactly* the same package.json, but after running both `install` and
`upgrade`, which version of `mime-types` is now used by `accepts`?

## Conditions

* Do not change any files at all, i.e. no need to edit package.json.

## Tips

If you are looking to automatically upgrade your immediate dependencies
to greater versions you may be interested in using the `david` package.
However, note that simultaneously upgrading multiple dependencies over
major versions is particularly irresponsible; undesirable behaviour and
bugs can creep into your codebase especially if you lack a comprehensive
test suite and the source of such bugs can be hard to pinpoint with
every updated dependency being a potential culprit.
