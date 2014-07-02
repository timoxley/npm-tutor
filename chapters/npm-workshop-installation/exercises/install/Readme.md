# Installing requireable dependencies

If you want to use a package in your code via a call to `require` that
package must be installed in either the current directory's
`node_modules`, or in a `node_modules` of a parent directory, searching
all the way up to root `/`.

`npm install <package-name>` will install a package into the nearest
`node_modules`.

```
$ npm install once
$ tree -d -L 2
.
└── node_modules
    └── once
```

## Task

Use `npm install` to install `duplexer2` module into the directory you
started this workshop in.

Once you have done this, run `verify` to proceed!

## Tips

* You can not require globally installed packages.
* You can not configure the name of `node_modules`.
* See `npm faq` for more information on such design decisions.
