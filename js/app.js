var marked = require('./views/shower/bower_components/marked/lib/marked');

var gui = require('nw.gui'),
    win = gui.Window.get();

var opt = {
    "gfm": true,
    "tables": true,
    "breaks": false,
    "pedantic": false,
    "sanitize": false,
    "smartLists": true,
    "smartypants": true,
    "silent": false,
    "highlight": null,
    "langPrefix": ''
};

marked.setOptions(opt);

function tokenize(md) {
	var tokens = md.split('***');
	return tokens;
}

function vertical(vtokens) {
  var vslide = '';

  vtokens.forEach(function(item, idx) {
    vslide += '<section>\n\t'+ marked(item) +'\n</section>\n';
  });

  return vslide;
}

function convert(md) {
	var tokens, vtokens, md, slides, steps = [];

  tokens = tokenize(md);

  tokens.forEach(function(item, idx) {
    vtokens = item.split('---');
    
    if (vtokens.length > 1) {
      slides = vertical(vtokens);
    } else {
      slides = marked(item);
    }

    steps.push('<section>\n\t' + slides + '\n</section>');
  });

  return steps.join('\n\n');
}
var _init
var slides = document.querySelector( '.reveal .slides' );
win.on('update', function(md) {
  
  slides.innerHTML = convert(md);

  // Full list of configuration options available here:
  // https://github.com/hakimel/reveal.js#configuration
  
  if (!_init) {
  Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,

    theme: win._params.theme.replace('reveal-', ''), // available themes are in /css/theme
    transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

    // Optional libraries used to extend on reveal.js
    dependencies: [
      // { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
      // { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      // { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      // { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
      // { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
      // { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
      // { src: 'plugin/search/search.js', async: true, condition: function() { return !!document.body.classList; } }
      // { src: 'plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
    ]
  });
_init = true;
} else {
  // Reveal.toggleOverview(true);
  // var currSlide = Reveal.getCurrentSlide() 
  // currSlide = null;
  // Reveal.sync();
  // if (Reveal.isOverview()) {
    // Reveal.sync();
  // } else {
  if (Reveal.isOverview()) {
    Reveal.toggleOverview(false);
  }
  Reveal.start(); 
  // }
  }
});

