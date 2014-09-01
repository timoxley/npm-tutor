# npm ls

`npm ls` will print a tree of all packages installed in `node_modules`,
as well as their versions.

For example, this is the `npm ls` tree for the `du` package:

```
> npm ls
du@0.0.2 /Users/User/Projects/libs/node-du
├── async@0.1.22
└─┬ mkfiletree@0.0.0
  ├─┬ rimraf@2.0.3
  │ └── graceful-fs@1.1.14
  └── temp@0.4.0
```

From this we can see that 'async@0.1.22' and 'mkfiletree@0.0.0' are
installed as dependencies, and 'mkfiletree' has 'rimraf' and 'temp' as
dependencies.

Note that `npm ls` shows only what versions of packages are installed,
it does not show semver ranges.

## Task

From the `./npmls` directory:

A copy of 'through2' is installed in `node_modules`. Using `npm ls`,
which version of `string_decoder` is installed within `through2`?

```
npm-tutor verify <x.y.z>
```

## Hint

* `npm help ls`
