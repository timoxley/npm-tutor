# Dedupe

npm dedupe can't yet dedupe all configurations.

## Task

From the `./dedupe` directory:

1. Remove your node_modules: `rm -rf node_modules`
3. Run `npm install`
2. Run `npm install mocha --save`
4. Run `npm dedupe`

Which previously deduped package is no longer deduped?

```
npm-tutor verify <package-name>
```
