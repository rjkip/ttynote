title: Functional Reactive Programming with RxJS
author: '@rjkip'
===

# What is Functional Reactive Programming?

 * "reactive programming"
 * "asynchronous dataflow programming"
 * "There should be a distinction between discrete and continuous FRP!!1!shift"
 * "Well, actually..."

===

# What is Functional Reactive Programming?

 * "reactive programming"
 * "asynchronous dataflow programming"
 * "There should be a distinction between discrete and continuous FRP!!1!shift"
 * "Well, actually..."

You could say it's the **modelling of values over time**.

 * Input flows, through transformations, to output (basic computer shit yo)
 * Similar to FP, avoids mutation, function "idempotency"
 * Combine synchronous and asynchronous logic into streams
 * I forget all about sync/async when using streams

===

# ReactiveX

 * "An API for asynchronous programming with observable streams"
 * "ReactiveX is a combination of the best ideas from the Observer pattern, the Iterator pattern, and functional programming"
 * Originated in Microsoft (.NET)
 * Ported to numerous languages (JS, C++, Ruby, Python)
 * In production at Netflix, Soundcloud, GitHub, etc.
 * We'll work with the JavaScript port, RxJS

===

# Examples

**A stream that outputs how many seconds the stream has been available.**

```js
Rx.Observable.interval(1000).subscribe(i => console.log(i));
```

===

# Examples

**A stream that outputs how many seconds the stream has been available.**

```js
Rx.Observable.interval(1000).subscribe(i => console.log(i));
// 0
```

===

# Examples

**A stream that outputs how many seconds the stream has been available.**

```js
Rx.Observable.interval(1000).subscribe(i => console.log(i));
// 0
// 1
```

===

# Examples

**A stream that outputs how many seconds the stream has been available.**

```js
Rx.Observable.interval(1000).subscribe(i => console.log(i));
// 0
// 1
// 2
```
    
===
 
# Examples

A stream that outputs how many seconds the stream has been available.

```js
Rx.Observable.interval(1000).subscribe(i => console.log(i));
```

**Streams are pull, not push.**

```js
const stream = Rx.Observable.interval(1000);
setTimeout(() => { stream.subscribe(i => console.log(i)) }, 5000);
```

===

# Examples

A stream that outputs how many seconds the stream has been available.

```js
Rx.Observable.interval(1000).subscribe(i => console.log(i));
```

**Streams are pull, not push.**

```js
const stream = Rx.Observable.interval(1000);
setTimeout(() => { stream.subscribe(i => console.log(i)) }, 5000);
// Crickets...
```

===

# Examples

A stream that outputs how many seconds the stream has been available.

```js
Rx.Observable.interval(1000).subscribe(i => console.log(i));
```

**Streams are pull, not push.**

```js
const stream = Rx.Observable.interval(1000);
setTimeout(() => { stream.subscribe(i => console.log(i)) }, 5000);
// Crickets...
// 0
```

===

# Examples

A stream that outputs how many seconds the stream has been available.

```js
Rx.Observable.interval(1000).subscribe(i => console.log(i));
```

**Streams are pull, not push.**

```js
const stream = Rx.Observable.interval(1000);
setTimeout(() => { stream.subscribe(i => console.log(i)) }, 5000);
// Crickets...
// 0
// 1
```

===

# Examples

A stream that outputs how many seconds the stream has been available.

```js
Rx.Observable.interval(1000).subscribe(i => console.log(i));
```

**Streams are pull, not push.**

```js
const stream = Rx.Observable.interval(1000);
setTimeout(() => { stream.subscribe(i => console.log(i)) }, 5000);
// Crickets...
// 0
// 1
// 2
```

===

# Examples (2)

**Let's record keypresses...**

```js
const keyPresses = Terminal.readKeysFromStdin();
```

===

# Examples (2)

```js
const keyPresses = Terminal.readKeysFromStdin();
```

**Filter out left arrow keys and right arrow keys...**

```js
const previous = keyPresses.filter(k => k === KEY_ARROW_LEFT);
const next     = keyPresses.filter(k => k === KEY_ARROW_RIGHT);
```

===

# Examples (2)

```js
const keyPresses = Terminal.readKeysFromStdin();
```

Filter out left arrow keys and right arrow keys...

**... map these to numbers...**

```js
const previous = keyPresses.filter(k => k === KEY_ARROW_LEFT).map(-1);
const next     = keyPresses.filter(k => k === KEY_ARROW_RIGHT).map(1);
```

===

# Examples (2)

```js
const keyPresses = Terminal.readKeysFromStdin();
const previous = keyPresses.filter(k => k === KEY_ARROW_LEFT).map(-1);
const next     = keyPresses.filter(k => k === KEY_ARROW_RIGHT).map(1);
```

**... and scan at what position we are...**

```js
const position = previous.merge(next)
    .scan(0, (acc, n) => acc + n)
    .startWith(0);
```

===

# Examples (2)

```js
const keyPresses = Terminal.readKeysFromStdin();
const previous = keyPresses.filter(k => k === KEY_ARROW_LEFT).map(-1);
const next     = keyPresses.filter(k => k === KEY_ARROW_RIGHT).map(1);
```

**... and scan at what position we are...**

```js
const position = previous.merge(next)
    .scan(0, (acc, n) => acc + n)
    .startWith(0);
position.subscribe(pos => console.log(pos));
// 0
```

===

# Examples (2)

```js
const keyPresses = Terminal.readKeysFromStdin();
const previous = keyPresses.filter(k => k === KEY_ARROW_LEFT).map(-1);
const next     = keyPresses.filter(k => k === KEY_ARROW_RIGHT).map(1);
```

**... and scan at what position we are...**

```js
const position = previous.merge(next)
    .scan(0, (acc, n) => acc + n)
    .startWith(0);
position.subscribe(pos => console.log(pos));
// 0
// 1 (right)
```

===

# Examples (2)

```js
const keyPresses = Terminal.readKeysFromStdin();
const previous = keyPresses.filter(k => k === KEY_ARROW_LEFT).map(-1);
const next     = keyPresses.filter(k => k === KEY_ARROW_RIGHT).map(1);
```

**... and scan at what position we are...**

```js
const position = previous.merge(next)
    .scan(0, (acc, n) => acc + n)
    .startWith(0);
position.subscribe(pos => console.log(pos));
// 0
// 1
// 2 (right)
```

===

# Examples (2)

```js
const keyPresses = Terminal.readKeysFromStdin();
const previous = keyPresses.filter(k => k === KEY_ARROW_LEFT).map(-1);
const next     = keyPresses.filter(k => k === KEY_ARROW_RIGHT).map(1);
```

**... and scan at what position we are...**

```js
const position = previous.merge(next)
    .scan(0, (acc, n) => acc + n)
    .startWith(0);
position.subscribe(pos => console.log(pos));
// 0
// 1
// 2
// 1 (left)
```

===

# Let's make something

===

# Let's make something

```js
const readFile = Rx.Observable.fromNodeCallback(fs.readFile, { encoding: 'utf8' });
const slideshow = readFile('frp.md').map(Slideshow.fromMarkdown);
```

===

# Let's make something

```js
const readFile = Rx.Observable.fromNodeCallback('...');
const slideshow = readFile('frp.md').map(Slideshow.fromMarkdown);
const clampedPosition = previous.merge(next).startWith(0)
    .combineLatest(slideshow, Array)
    .scan(0, (position, [direction, slideshow]) =>
        Math.max(0, Math.min(slideshow.length-1, position + direction))
    );
```

===

# Let's make something

```js
const readFile = Rx.Observable.fromNodeCallback('...');
const slideshow = readFile('...').map(Slideshow.fromMarkdown);
const clampedPosition = previous.merge(next).scan('...');

clampedPosition
    .combineLatest(slideshow, (position, slideshow) => slideshow[position])
    .subscribe(renderSlide);
```

===

# Demo

===


# Demo

;)

===

# FRP is fun

**Remember this?**

```js
const readFile = Rx.Observable.fromNodeCallback(fs.readFile, { encoding: 'utf8' });
const slideshow = readFile('frp.md');
```

===

# FRP is fun

Remember this?

```js
const readFile = Rx.Observable.fromNodeCallback(fs.readFile, { encoding: 'utf8' });
```

**Let's replace the slideshow stream with this:**
    
```js
const watchFile = file => Rx.Observable.fromEvent(fs.watch(file), 'change').map(file);
const slideshow = watchFile('frp.md');
```

===

# FRP is fun

Remember this?

```js
const readFile = Rx.Observable.fromNodeCallback(fs.readFile, { encoding: 'utf8' });
```

Let's replace the slideshow stream with this:

```js
const watchFile = file => Rx.Observable.fromEvent(fs.watch(file), 'change').map(file);
const slideshow = watchFile('frp.md');
```

**We now have slides that update while we write the bloody Markdown.**

===

# FRP is fun

Remember this?

```js
const readFile = Rx.Observable.fromNodeCallback(fs.readFile, { encoding: 'utf8' });
```

Let's replace the slideshow stream with this:

```js
const watchFile = file => Rx.Observable.fromEvent(fs.watch(file), 'change').map(file);
const slideshow = watchFile('frp.md');
```

We now have slides that update while we write the bloody Markdown. **Win.**

===

# Downsides

 * Debuggability (**.do(value => console.log(value))**)
 * Static analysis is not possible
 * Probably some more bloody stuff, no time, bye

===

# The End

                             ___________    ____
                      ______/   \__//   \__/____\
                    _/   \_/  :           //____\\
                   /|      :  :  ..      /        \
                  | |     ::     ::      \        /
                  | |     :|     ||     \ \______/
                  | |     ||     ||      |\  /  |
                   \|     ||     ||      |   / | \
                    |     ||     ||      |  / /_\ \
                    | ___ || ___ ||      | /  /    \
                     \_-_/  \_-_/ | ____ |/__/      \
                                  _\_--_/    \      /
                                 /____             /
                                /     \           /
                                \______\_________/

                              I need YOU
                          to provide feedback


                   http://joind.in/talk/view/14705

                                 @rjkip
