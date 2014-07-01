## npm install --global

Global installs are only for installing packages with command-line executables.

## More Info

**Globally installed packages can not be required**

If you want to require a package it must be installed into a local
`node_modules` directory.

This is by design. This pattern allows for multiple versions of the same package
to exist concurrently on a system, even within the same project.

This is how node and npm combine powers to prevent dependency hell and is unanimously 'a good thing'.

See `npm faq` for more information on global vs local dependencies.

Global installs may require `sudo` on some systems.

## Hint

* 

