# npm ls --global

The `--global` or `-g` flag also works with `npm ls`, providing a list
of all of globally installed packages.

You can restrict the `npm ls` traversal depth using the `--depth=n` flag.

## Task

Find the globally installed package with the least number of immediate
dependencies. Do not count dependencies of dependencies.

You should be able to do this by sight, especially if a package has no
immediate dependencies.

If there are multiple packages with same lowest number of dependencies,
just pick one, it doesn't matter.


```
npm-tutor verify <package-name>
```

e.g. "npm-tutor verify boganipsum"

## Hints

* We're only interested in the **first** level of dependencies.
* Running `npm ls` globally can take a long time. You will very likely need to use
`--depth` to restrict how deep `npm ls` traverses.
* The point of this exercise is simply to ensure you know `npm -ls -g` exists.
