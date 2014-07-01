# npm init - configuration

You may have noticed `npm init` doesn't even know your name. Let's get
aquainted so `npm init` can fill-in name and email address
automatically.

The following commands will configure npm to permanently remember your
name and email address:

```
npm config set init.author.name "Your Name"
npm config set init.author.email "me@websites.com"
```

## Task

Configure npm with your name and email settings then re-run `npm init`.

You will need to remove the package.json we just created (or just the
"author" field) in order to have `npm init` fill this automatically.

## More Info

Other available settings for npm init are

* `init.author.url` to specify a personal home page URL and
* `init.license` to set the default license.

`npm init` is non-destructive, you can safely run it at any
time and it will only add keys or fill in defaults in the absense of a
value. Also note that any time npm writes to your package.json, any
custom formatting will be lost. This will never change, just accept it
and move on.

## Hints

* You should probably use the email address you used to register with npm.
