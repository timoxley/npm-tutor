## npm install --global

#### tl;dr Globally installed packages cannot be required, are only for command-line tools.

Packages the "bin" property in a package.json.

If you want to require a package it must be installed into a local
`node_modules` directory.

This is by design. This pattern allows for multiple versions of the same package
to exist concurrently on a system, even within the same project.

This is how node and npm combine powers to prevent dependency hell and is unanimously 'a good thing'.

See `npm faq` for more information on global vs local dependencies.

Global installs may require `sudo` on some systems.
