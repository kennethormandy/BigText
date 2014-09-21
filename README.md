[![Big Ideas Text wordmark](assets/wordmark.png)](http://kennethormandy.com/journal/big-ideas-text)

***

# Big Ideas Text

Dynamically scale lines of text within a container. No jQuery required.

* Read the blog post, [Big Ideas Text](http://kennethormandy.com/journal/big-ideas-text)
* View a demo
* Read the comparison between [FitText, Fitter Happier Text, BigText, and Big Ideas Text](http://kennethormandy.com/journal/fitter-happier-text-and-big-ideas-text)

[![Build Status](https://travis-ci.org/kennethormandy/big-ideas-text.png?branch=master)](https://travis-ci.org/kennethormandy/big-ideas-text)

<!--
* Read the [original blog post](http://www.zachleat.com/web/bigtext-makes-text-big/)
* Play around on the [demo](http://zachleat.github.io/BigText/demo/wizard.html)
* Watch the [video](http://www.youtube.com/watch?v=OuqB6e6NPRM)
 -->

## Getting started

Big Ideas Text aims to be as easy to use as the original [BigText](https://github.com/zachleat/BigText). If it’s not, please [open an issue](https://github.com/kennethormandy/big-ideas-text/issues). Get the latest version of the CSS file here:

[<img alt="Get the latest version of Big Ideas Text" src="assets/download.png" width="150px" />](https://github.com/kennethormandy/big-ideas-text/blob/master/dist/big-ideas-text.js)

Alternatively, install it with the package manager and build tool of your choice:

#### With npm

```
npm install kennethormandy/big-ideas-text
```

#### With Component

```bash
component install kennethormandy/big-ideas-text
```

#### With bower

```bash
bower install big-ideas-text
```

## Requirements

1. ~~jQuery~~ __No jQuery required!__
2. A block level parent element. Big Ideas Text will force all children to be block level as well.

## Learn More

Big Ideas Text works best on browsers that support [subpixel font scaling](http://status.modern.ie/subpixelfontscaling). In order to best serve sizes to all browsers, it will adjust `word-spacing` as well as `font-size`.

## Examples

### Simple Example

```html
<div id="example">
  <span>Don’t get any</span>
  <span>big ideas</span>
  <span>They’re not gonna happen</span>
</div>
<script>
  var ex = document.getElementById('example');
  bigText(ex);
</script>
```

<!--
If this is still the best approach,
I will make the library take care of it

### Better, Progressive Enhancement-Based Example

Use `display: inline` children (like a `span`) so the text will flow correctly if BigText doesn’t run.

    <div id="bigtext">
        <span>BIGTEXT</span>
        <span>Makes Text Big</span>
    </div>
    <script>
    // Only BigText on “new-ish” browsers
    if( 'querySelectorAll' in document ) {
        $('#bigtext').bigtext();
    }
    </script> -->

### Using a List (ordered/unordered)

```html
<ol id="example">
  <li>Don’t get any</li>
  <li>big ideas</li>
  <li>They’re not gonna happen</li>
</ol>
<script>
  var ex = document.getElementById('example');
  bigText(ex);
</script>
```

### Restrict to a subset of children

#### Opt-in children with JS

```html
<div id="example">
  <p>Don’t get any</p>
  <span>big ideas</span>
  <p>They’re not gonna happen</p>
</div>
<script>
  var ex = document.getElementById('example');
  bigText(ex, {
    childSelector: '> p'
  });
</script>
```

#### Opt-out lines using markup

```html
<ol id="example">
  <li>Don’t get any</li>
  <li class="bigIdeasText-exempt">big ideas</li>
  <li>They’re not gonna happen</li>
</ol>
<script>
  var ex = document.getElementById('example');
  bigText(ex);
</script>


### Mix and Match Typefaces

```html
<ol id="example">
  <li>Don’t get any</li>
  <li>
    <span style="font-family: 'Avenir Next', sans-serif">big</span>
    <span style="font-family: 'Georgia', serif">ideas</span>
  </li>
  <li>They’re not gonna happen</li>
  <li></li>
</ol>
<script>
  var ex = document.getElementById('example');
  bigText(ex);
</script>
```

Also works with `letter-spacing`, `word-spacing`, and `text-transform`.

### Use Big Ideas Text with the WebFontLoader

Whatever web font service you are using, it’s likely built upon [WebFontLoader](https://github.com/typekit/webfontloader). You can use its `active` callback to initialise Big Ideas Text once your fonts have loaded.

```html
<script>
  WebFontConfig = {
    google: { families: [ 'Fira+Sans::latin' ] },
    active: function() {
      var ex = document.getElementById('example')
      bigText(ex);
    }
  };
</script>
<script async defer  src="//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
<div id="example">
  <span>Don’t get any</span>
  <span>big ideas</span>
  <span>They’re not gonna happen</span>
</div>
```

### Change the default max font size

Shorter lines means larger text sizes. If you’d like to specify a maximum font size:

```html
<div id="example">
    <span>BIG</span>
</div>
<script>
  var ex = document.getElementById('example');
  bigText(ex, {
      maxfontsize: 60 // Default is `528px`
  });
</script>
```

### Adding a default min font size

The following `span` houses a a super long line that will probably be resized to epically small proportions. A minimum font size will improve the situation.

```html
<div id="example">
    <span>Don’t get any big ideas / They’re not gonna happen / You paint yourself white / And fill up with noise / But there’ll be something missing</span>
</div>
<script>
  $('#bigtext').bigtext({
      minfontsize: 16 // Default is `null`
  });
</script>
```

### Another one of these?

You have a few options if you’d like to scale text in this manner.  If your text is static and unchanging, take a look at:

- [Paravel’s FitText jQuery plugin](http://fittextjs.com/)
- [Brent Jackson’s Fitter Happier Text](https://github.com/jxnblk/fitter-happier-text)

If your text is dynamic, I’d reccomend using this plugin. If you are already have jQuery as a dependency and don’t plan on changing that anytime soon, [Zack Leatherman’s original BigText plugin]() might be the right option.

I’m in the process of writing a comparison of all four libraries (akin to [this post](www.zachleat.com/web/fittext-and-bigtext/)). If you’d like an email when it’s done, you can sign up for my [web typography newsletter](http://kennethormandy.com/journal/newsletter).

## Extra Features

### _Responsive_ support

Big Ideas Text includes its own debounced resize event.

### Debug Mode

Big Ideas Text uses an off-canvas detached node to improve performance when sizing. Setting `DEBUG_MODE` to true will leave this detached node on the canvas for visual inspection for problem resolution.

```js
var ex = document.getElementById('example');
bigText(ex).DEBUG_MODE = true;
```

## Caveats

__Lines Wrapping Pre-BigText__ The starting font-size must be small enough to guarantee that each individual line is not wrapping pre-Big Ideas Text. If the line is too long, Big Ideas Text will not size it correctly.

## Contributing

Thanks for considering contributing! There’s information about how to [get started with Big Ideas Text locally here](CONTRIBUTING.md).

## License

[The MIT License (MIT)](LICENSE.md)

Copyright © 2014 [Kenneth Ormandy](http://kennethormandy.com)

Zack Leatherman wrote the original [BigText](https://github.com/zachleat/BigText).<br/>
Brent Jackson [inspired](https://github.com/jxnblk/fitter-happier-text/issues/1) the Radiohead-themed name<br/>
The lyrics in the examples are from Radiohead’s _Nude_, colloquially _[Big Ideas (Don’t Get Any)](http://www.youtube.com/watch?v=gm-Fyt1F0O4)_.<br/>
Thanks to my friends and co-workers at [Chloi Inc.](http://chloi.io)
