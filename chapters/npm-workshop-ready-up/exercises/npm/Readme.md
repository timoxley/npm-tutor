# npm ready

A version of npm is usually bundled with your node installation, but npm releases
can be much more frequent than node releases. It's good practice to
regularly check for and install new versions of npm.

## Task

This workshop requires you to update to the latest version of npm.

Run `verify` to verify you are running the latest version.

## Hints

* Check your npm version: `npm -v`
* Check both npm and node versions with `npm version`
* Check the latest version of npm: `npm info npm version`
* Update npm with npm: `npm install -g npm`

Note: If the `npm install` command complains about permissions, you may
want to consider reinstalling npm to not require sudo for global
installs: gist.github.com/isaacs/579814
