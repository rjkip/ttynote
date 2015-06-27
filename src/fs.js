import fs from "fs";
import Rx from "rx";

export const readFile = file => Rx.Observable.fromNodeCallback(fs.readFile)(file, { encoding: 'utf8' });
export const watchFile = file => Rx.Observable.fromEvent(fs.watch(file, { persistent: false }), 'change').
    map(file);
