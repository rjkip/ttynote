# ttynote

Raw and uncut slideshow software used for the [*Functional Reactive Programming*](https://joind.in/talk/view/14705) uncon talk at DPC 2015.

You can find the Markdown for the slideshow in `examples/frp.md`.

![ttynote](https://cloud.githubusercontent.com/assets/1734555/8392160/c1ede1a8-1ce0-11e5-913c-edccd94cf6f0.png)

## Installing, building, running

```shell
npm install
npm install -g gulp # Probably sudo
gulp build && node build/ttynote.js examples/frp.md
# or just gulp run
```
