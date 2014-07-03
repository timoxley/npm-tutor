# npm install #

There are several configuration settings which you can alter to adjust
the terminal output of `npm install`.

Documentation for such configuration settings can be found at:

```
npm help 7 config
```
(yes that's a 7)

## Some configuration settings you may want to experiment with:

### Adjust log level

```
npm config set loglevel=silent
npm config set loglevel=http
npm config set loglevel=silly
```

### Toggle spinner

```
npm config set spin=false
npm config set spin=true
```

## Task

Experiment with the npm install display settings until you're
happy.

To test settings just remove node_modules and install something e.g.

```
rm -rf node_modules
npm install bl
```

To proceed:

```
verify "I'm happy."
```

## Tips

When you're installing something serious, be careful to not prematurely
abort `npm install` commands, as this can leave your `node_modules` in an
unknown state only recoverable by removing `node_modules` and starting
the install again.
