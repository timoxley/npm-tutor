# npm init - configuration

You may have noticed `npm init` doesn't even know your name. Let's
get aquainted so `npm init` can fill-in name and email address automatically.

```
npm config set init.author.name "Your Name"
npm config set init.author.email "me@websites.com"
```

Other settings available are

* `init.author.url` to specify a personal home page URL and
* `init.license` to set the default license.

## Task

Configure npm with your name and email settings then re-run `npm init`.

`npm init` will only fill in defaults in the absense of a value, thus you will need to remove the package.json we just created or the "author" field in order to have `npm init` fill this automatically.

## Hints

* You should probably use the email address you used to register with npm.
