import nomnom from "nomnom";
import Rx from "rx";
import { readFile, watchFile } from "./fs.js";
import Slideshow from "./slideshow.js";
import Terminal from "./terminal.js";

//Rx.config.longStackSupport = true;

//// CLI
const opts = nomnom.option('file', { position: 0, list: true, help: 'The slideshow to show'}).parse();
const slideshowFilename = opts.file[0];

//// Functions
function equals(other) { return one => one === other; }
function gte(other) { return one => one >= other; }
function oneOf(...other) { return one => other.some(equals(one)); }
function clamp(value, min, max) { return Math.max(Math.round(min), Math.min(Math.round(max), Math.round(value))); }
//function clamp(value, min, max) { return Math.max((min), Math.min((max), (value))); }
function merge(...objects) {
    return objects.reduce(
        (merged, object) => {
            Object.keys(object).forEach(key => merged[key] = object[key]);
            return merged;
        },
        {}
    );
}
function log(msg) {
    return val => console.log(`${msg} ${JSON.stringify(val)}`);
}

//// Streams
// Keyboard input
const keyPresses = Terminal.keyPresses();
const leftKeyPresses = keyPresses.filter(equals(Terminal.KEY_ARROW_LEFT));
const rightKeyPresses = keyPresses.filter(equals(Terminal.KEY_ARROW_RIGHT));
const navigation = leftKeyPresses.map(-1).merge(rightKeyPresses.map(1)).startWith(0);
const exit = keyPresses.filter(oneOf(Terminal.KEY_ESCAPE, Terminal.KEY_CTRL_C, 'x', 'q', 'X', 'Q')).map(0);
// Slides
const slideshow = watchFile(slideshowFilename).
    flatMapLatest(readFile).
    merge(readFile(slideshowFilename)).
    map(Slideshow.fromMarkdown);
const slideshowLength = slideshow.map(slideshow => slideshow.slides.length);
const slideIndex = slideshowLength.
    combineLatest(navigation.flatMapLatest(nav => Rx.Observable.of(nav, 0)), (len, nav) => ({ len, nav })).
    scan(-1, (acc, { len, nav }) => {
        return clamp(acc + nav, -1, len-1);
    }).
    combineLatest(Terminal.resizes(), slideIndex => slideIndex);
const displayTitle = slideshow.combineLatest(slideIndex.filter(equals(-1)), slideshow => slideshow.metadata);
const displaySlide = slideshow.combineLatest(
        slideIndex.filter(gte(0)),
        (slideshow, index) => ({ metadata: merge(slideshow.metadata, { index, total: slideshow.slides.length }), slide: slideshow.slides[index] })
    ).
    filter(slideshow => !!slideshow.slide);

// Actions
const cursor = require('ansi')(process.stdout, { buffering: true });
displayTitle.
    do(() => Slideshow.displayClear(cursor)).
    do(metadata => Slideshow.displayTitle(cursor, metadata)).
    takeUntil(exit).
    subscribe();
displaySlide.
    do(() => Slideshow.displayClear(cursor)).
    do(slide => Slideshow.displayFrame(cursor, slide.metadata)).
    do(slide => Slideshow.displaySlide(cursor, slide.slide)).
    takeUntil(exit).
    subscribe();

exit.delay(1000).subscribe(process.exit);
