import marked from "marked";
import TerminalRenderer from "marked-terminal";
import Rx from "rx";
import Terminal from "./terminal.js";
import yaml from "js-yaml";

const Slideshow = {
    fromMarkdown(string) {
        let slides = string.split(/^\={3,}\s*$/m).map(s => s.trim());

        return {
            metadata: yaml.safeLoad(slides[0]),
            slides: slides.slice(1)
        };
        //return Rx.Observable.of(string).
        //    map(string => markdown.parse(string)).
        //    map(Slideshow.fromMarkdownAst);
    },

    //fromMarkdownAst(ast) {
    //    let tokens = ast.
    //        slice(1).
    //        reduce((slides, token) => {
    //            if (token[0] === 'hr') return slides.concat([[]]);
    //            if (slides.length === 0) slides = slides.concat([[]]);
    //            slides[slides.length-1].push(token);
    //            return slides;
    //        }, []).
    //        reduce((slideshow, slide, index) => {
    //            return index === 1
    //                ? { metadata: slideshow, slides: [] }
    //                : { metadata: slideshow.metadata, slides: slideshow.slides.concat([slide])};
    //        });
    //
    //    let metadataYaml = tokens.metadata
    //        .filter(token => token[0] === 'para')
    //        .reduce((acc, token) => acc + token[1] + '\n', '');
    //
    //    return {
    //        metadata: yaml.safeLoad(metadataYaml),
    //        slides: tokens.slides
    //    };
    //},

    displayClear(cursor) {
        cursor.eraseData(2);
    },

    displayTitle(cursor, metadata) {
        let title = metadata.title.substr(0, process.stdout.columns);
        cursor.goto(process.stdout.columns / 2 - title.length / 2, process.stdout.rows / 2 - 2);
        cursor.fg.green().bold().write(title).reset();

        let jolly = 'with your jolly host'.substr(0, process.stdout.columns);
        cursor.goto(process.stdout.columns / 2 - jolly.length / 2, process.stdout.rows / 2 + 1);
        cursor.write(jolly).reset();

        let author = metadata.author.substr(0, process.stdout.columns);
        cursor.goto(process.stdout.columns / 2 - author.length / 2, process.stdout.rows / 2 + 3);
        cursor.fg.white().bold().write(author).reset();

        cursor.flush();
    },

    displayFrame(cursor, metadata) {
        let title = metadata.title.substr(0, process.stdout.columns);
        cursor.goto(process.stdout.columns/2-title.length/2, 2);
        cursor.fg.yellow().write(title).reset();

        cursor.goto(3, process.stdout.rows-1);
        cursor.fg.yellow().write(metadata.author).reset();

        const index = `${metadata.index+1}/${metadata.total}`;
        cursor.goto(process.stdout.columns-3-index.length, process.stdout.rows-1);
        cursor.fg.yellow().write(index).reset();

        cursor.flush();
    },

    displaySlide(cursor, slide) {
        let slideWidth = Math.floor(Math.min(80, process.stdout.columns * 0.90));

        marked.setOptions({
            renderer: new TerminalRenderer({
                width: slideWidth,
                reflowText: true
            }, {
                theme: require(__dirname + '/code-theme.js')
            }),
        });

        let renderedSlide = marked(slide);
        let lines = renderedSlide.split('\n');
        let y = Math.floor(
            Math.max(6, Math.min(process.stdout.rows/4, process.stdout.rows / 2 - lines.length / 2))
        );

        lines.slice(0, process.stdout.rows - 4 - 6).forEach(line => {
            cursor.goto(process.stdout.columns / 2 - slideWidth / 2, y);
            cursor.write(line);
            ++y;
        });

        cursor.flush();
    }
}

export default Slideshow;
