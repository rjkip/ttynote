import Rx from "rx";

export default {
    KEY_ARROW_RIGHT: '\u001b[C',
    KEY_ARROW_LEFT: '\u001b[D',
    KEY_ESCAPE: '\u001b',
    KEY_CTRL_C: '\u0003',

    keyPresses() {
        let observers = [], stdin = process.stdin, readableListener, completeListener, errorListener;
        return Rx.Observable.create(observer => {
            if (observers.length === 0) {
                stdin.setRawMode(true);
                stdin.setEncoding('utf8');
                stdin.addListener('readable', readableListener = () => {
                    let chunk = stdin.read();
                    if (chunk) observers.forEach(o => o.onNext(chunk));
                });
                stdin.addListener('end', completeListener = () => {
                    observers.forEach(o => o.onCompleted());
                });
                stdin.addListener('close', completeListener);
                stdin.addListener('error', errorListener = (error) => {
                    observers.forEach(o => o.onError(error));
                });
            }

            observers.push(observer);

            return Rx.Disposable.create(() => {
                observers = observers.filter(o => o !== observer);

                if (observers.length > 0) return;

                stdin.removeListener('readable', readableListener);
                stdin.removeListener('end', completeListener);
                stdin.removeListener('close', completeListener);
                stdin.removeListener('error', errorListener);
                stdin.setRawMode(false);
                stdin.unref();
            });
        });
    },

    resizes() {
        return Rx.Observable.create(observer => {
            let resizeListener = () => {
                observer.onNext({ columns: process.stdout.columns, rows: process.stdout.rows });
            };

            resizeListener();
            process.stdout.on('resize', resizeListener);

            return Rx.Disposable.create(() => {
                process.stdout.removeListener('resize', resizeListener);
            });
        });
    }
}
