# ttynote

Raw and uncut slideshow software used for the [*Functional Reactive Programming*](https://joind.in/talk/view/14705) uncon talk at DPC 2015.

You can find the Markdown for the slideshow in `examples/frp.md`.

```js
npm install
npm install -g gulp # Probably sudo
gulp build && node build/ttynote.js examples/frp.md
# or just gulp run
