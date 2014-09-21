# Contributing

Thanks for considering contributing to Big Ideas Text!

## Opening issues

If you find a bug, please feel free to [open an issue](https://github.com/kennethormandy/big-ideas-text/issues).

If you taking the time to mention a problem, even a seemingly minor one, it is greatly appreciated, and a totally valid contribution to this project. Thank you!

## Run Big Ideas Text locally

To get started locally, run these commands:

```
git clone https://github.com/kennethormandy/big-ideas-text
npm install
npm start
```

## Configuring Grunt

You should’t really need to use the Grunt commands directly if you don’t want; `npm install`, `npm start`, and `npm test` should be sufficient.

If you want to dig into it, the Grunt setup is entirely from [BigText](https://github.com/zackleat/bigtext). @zackleat writes:

> Rather than one giant `Gruntfile.js`, this project is using a modular Grunt setup. Each individual grunt configuration option key has its own file located in `grunt/config-lib/` (readonly upstream configs, do not modify these directly) or `grunt/config/` (project specific configs). You may use the same key in both directories, the objects are smartly combined using [Lo-Dash merge](http://lodash.com/docs#merge).
> For concatenation in the previous Gruntfile setup, you’d add another key to the giant object passed into `grunt.initConfig` like this: `grunt.initConfig({ concat: { /* YOUR CONFIG */ } });`. In the new configuration, you’ll create a `grunt/config/concat.js` with `module.exports = { /* YOUR CONFIG */ };`.

## Fixing bugs

We love pull requests. Here’s a quick guide:

1. [Fork this repository](https://github.com/kennethormandy/big-ideas-text/fork) and then clone it locally:

  ```bash
  git clone https://github.com/kennethormandy/big-ideas-text
  ```

2. Create a topic branch for your changes. I like to preface my branches with my initials:

  ```bash
  git checkout -b ko-fix-for-that-thing
  ```
3. Commit a failing test for the bug:

  ```bash
  git commit -am "Adds a failing test to demonstrate that thing"
  ```

4. Commit a fix that makes the test pass:

  ```bash
  git commit -am "Adds a fix for that thing!"
  ```

5. Run the tests:

  ```bash
  npm test
  ```

6. If everything looks good, push to your fork:

  ```bash
  git push origin fix-for-that-thing
  ```

7. [Submit a pull request.](https://help.github.com/articles/creating-a-pull-request)

8. Enjoy being the wonderful person you are

  After you’ve opened your pull request, [you should email me](mailto:hello@kennethormandy.com) your mailing address so I can mail you a personal thank you note. Seriously!

## Adding new features

Thinking of adding a new feature? Cool! [Open an issue](https://github.com/kennethormandy/big-ideas-text/issues) and let’s design it together.
