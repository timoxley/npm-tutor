# Production dependencies

Sometimes you will want to only install production dependencies for the
current package, e.g. when deploying an application on a staging server.

# Task

Remove the `node_modules` folder in the current directory and install
**only production dependencies**.

Your package.json should already include some dependencies and
devDependencies. If not, use the following:

```json
  "dependencies": {
    "once": "^1.3.0"
  },
  "devDependencies": {
    "tape": "^2.13.3"
  },
```

## Conditions

* Do not edit your package.json.

## Hints

* `npm help install`
