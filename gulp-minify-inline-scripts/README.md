## gulp-minify-inline-scripts

a plugin for gulp.js to minify inline scripts in html files

## Installation

```bash
npm install gulp-minify-inline-scripts
```

## Usage

```js
var minifyInline = require('gulp-minify-inline-scripts');

gulp.task('minify', function() {
    gulp.src('html/*.html')
        .pipe(minifyInline())
        .pipe(gulp.dest('dist'))
});
```

## Example

### before: index.html

```html
<html lang="en">
<head>
<meta charset="utf-8"/>
<title></title>
</head>
<body>
    <input type="button" id="btn" value="click Me" />

    <script type="text/javascript">
        var btn = document.querySelector("#btn");

        btn.onclick = function() {
            this.style.background = ["yellow","red","green","purple","pink","gray","blue","orange","black","cyan"][Math.floor(Math.random() * 10)];
        };

        setInterval(function() {
            console.log(btn.style.background);
        },1000)

    </script>
</body>
</html>
```

### after:index.html

```html
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title></title>
</head>
<body>
    <input type="button" id="btn" value="click Me" />

    <script type="text/javascript">var btn=document.querySelector("#btn");btn.onclick=function(){this.style.background=["yellow","red","green","purple","pink","gray","blue","orange","black","cyan"][Math.floor(10*Math.random())]},setInterval(function(){console.log(btn.style.background)},1e3);</script>
</body>
</html>
```
