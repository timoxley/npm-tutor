## npm shrinkwrap

`npm shrinkwrap` will generate a `npm-shrinkwrap.json` file used to
recursively record the current version of every dependency installed in
node_modules.

If an `npm-shrinkwrap.json` exists **all semver ranges are ignored** and
the versions recorded in the `npm-shrinkwrap.json` are used instead.

## Task

From the `./shrinkwrap` directory, ensure that calling `npm install`
will always install greatest possible version of each package (as of 
today).

Remove any node_modules in the `./prune` directory and run
`npm install` to test your theory.

## Hints

* `npm help shrinkwrap`

## Tips

Even if you disagree with semver and always use fixed semver in your own
packages, `npm install` will still respect flexible semver ranges
specified in your dependencies' package.jsons. Shrinkwrap is a great way
to avoid deploying out of archives while absolutely fixing the installed
versions.

Shrinkwrap also records the registry url which dependency was fetched
from, which overrides any custom registry settings you may have. This
can break package installation when installing packages in environments
where the original registry is not available (e.g. at conferences).

Compare the contents of your generated `npm-shrinkwrap.json` & the
output of `npm ls --json`.
