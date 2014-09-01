# npm ls --global

Passing the `--global` or `-g` flag to `npm ls` will display all
packages which have been installed globally (e.g. via `npm install -g
package` or `npm link`)

Running `npm ls` globally can take a long time. You will usually need to use
the `--depth=n` flag to restrict how deep `npm ls` traverses:

```
npm ls -g --depth=1
```

The point of this exercise is to ensure you know how to list your
globally installed packages and how to limit the depth to produce
sensible output.

## Task

Find the globally installed package with the *least number of immediate
dependencies*. Do not count dependencies of dependencies.

You should be able to do this by sight, especially if a package has zero
or only one immediate dependencies.

If there are multiple packages with same lowest number of dependencies,
just pick one, it doesn't matter.

```
npm-tutor verify <package-name>
```

e.g. "npm-tutor verify boganipsum"

## Hints

* You can safely ignore any warnings, especially when using `--depth`.
* We're only interested in the **first** level of dependencies.
* If you have a lot of packages installed globally, you may want to
consider uninstalling any unecessary packages: The more packages you
have installed globally, the longer global installs will take.
