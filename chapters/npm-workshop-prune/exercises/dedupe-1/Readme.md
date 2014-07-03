# Dedupe

The `tape` and `tap` packages share a number of similar dependencies. If
you install them both, we can see there are a few duplicate packages
(via the 3rd-party `pkgcount` utility):

```
> pkgcount --duplicates

NAME            COUNT
glob@3.2.11     2
inherits@2.0.1  3
lru-cache@2.5.0 2
minimatch@0.3.0 2
sigmund@1.0.0   2

SUMMARY
6   Duplicate Packages
8   Max. Nesting Depth
29  Unique Packages
35  Total Packages
```

Check out the installed package hierarchy:

```
npm ls --depth=1
dedupe-example@0.0.0
├─┬ tap@0.4.9
│ ├── buffer-equal@0.0.1
│ ├── deep-equal@0.0.0
│ ├── difflet@0.2.6
│ ├── glob@3.2.11
│ ├── inherits@2.0.1
│ ├── mkdirp@0.3.5
│ ├── nopt@2.2.1
│ ├── runforcover@0.0.2
│ ├── slide@1.1.5
│ └── yamlish@0.0.5
└─┬ tape@2.12.3
  ├── deep-equal@0.2.1
  ├── defined@0.0.0
  ├── glob@3.2.11
  ├── inherits@2.0.1
  ├── object-inspect@0.4.0
  ├── resumer@0.0.0
  └── through@2.3.4
```

`npm dedupe` will attempt to flatten this hierarchy while installing the
latest possible version that will satisfy each package's dependencies.

**Note: dedupe entirely ignores extraneous and development dependencies**

## Task

From the `./dedupe` directory:

* Run `npm install`.
* Note the installed package hierarchy with `npm ls`.
* Use `npm dedupe` to remove duplicate packages.

How many packages were **moved** to the `node_modules` directory in
`./dedupe`?

```
verify <Number>
```

e.g. `verify 5`

## Hints

* `npm help dedupe`
* `npm ls --depth=1`
* Try guess before running `npm dedupe`.
