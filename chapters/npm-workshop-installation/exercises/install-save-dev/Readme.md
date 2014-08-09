# Development Dependencies

#### tl;dr Put all non-runtime dependencies into "devDependencies"

Package consumers should only receive the minimum code required for
your package to work. Testing frameworks are usually unnecessary at runtime.

Calling `npm install` with no package argument should install everything
you need to start editing code and running tests.

**Packages should never, ever need someone to install development
dependencies globally in order to run your tests**. Development
dependency executables are automatically available to npm scripts, see
chapter on "scripts" for more information.

Development dependencies are **only** installed when running `npm
install` (with no package argument) from the package's directory e.g.
after running a `git clone` of the package source.

Development dependencies are not installed for dependencies of
dependencies.

## Task

Save `tape` as a development dependency.

Run `npm-tutor verify` to proceed!

## Conditions

* Do not manually edit your package.json.

## Hints

* `npm help json`
* `npm help install`
