# Extraneous Packages

An extraneous package is any installed package which does not satisfy
the semver range for any unfulfilled dependency.

Extraneous packages are usually unintentially created when installing
packages without adding them to the package.json with `--save` or
`--save-dev`.

`npm ls` can be used to list any extraneous packages installed.

For example, du does not depend on the boganipsum yet it is installed,
thus it is listed as an extraneous dependency:

```
> npm ls
du@0.0.2
├── async@0.1.22
├── boganipsum@0.1.0 extraneous
└─┬ mkfiletree@0.0.0
  ├─┬ rimraf@2.0.3
  │ └── graceful-fs@1.1.14
  └── temp@0.4.0
```

Note that `npm ls` and other associated commands will exit with a
non-zero status when extraneous packages exist:

```
> echo $?
1
```

This makes it especially important to ensure extraneous packages are
removed when using npm within shell scripts.

## Task

Create a situation whereby running `npm ls` in the current directory
will report that there is *at least one extraneous package*.

Run `npm-tutor verify` to proceed.

## Hint

* `npm help extraneous`
