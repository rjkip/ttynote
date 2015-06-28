import Rx from "rx";

export default {
    KEY_ARROW_RIGHT: '\u001b[C',
    KEY_ARROW_LEFT: '\u001b[D',
    KEY_ESCAPE: '\u001b',
    KEY_CTRL_C: '\u0003',

    keyPresses() {
        let stdin = process.stdin, readableListener, completeListener, errorListener;

        const keyPresses = Rx.Observable.create(observer => {
            stdin.setRawMode(true);
            stdin.setEncoding('utf8');
            stdin.addListener('readable', readableListener = () => {
                let chunk = stdin.read();
                if (chunk) observer.onNext(chunk);
            });
            stdin.addListener('end', completeListener = () => {
                observer.onCompleted();
            });
            stdin.addListener('close', completeListener);
            stdin.addListener('error', errorListener = (error) => {
                observer.onError(error);
            });

            return Rx.Disposable.create(() => {
                stdin.removeListener('readable', readableListener);
                stdin.removeListener('end', completeListener);
                stdin.removeListener('close', completeListener);
                stdin.removeListener('error', errorListener);
                stdin.setRawMode(false);
                stdin.unref();
            });
        });

        return keyPresses.share();
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
