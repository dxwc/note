#!/usr/bin/env node

let meta = '';
try{ meta = require('fs').statSync('meta.md').isFile() ? 'meta.md' : '' }
catch(err){ }

require('child_process')
.exec
(
    `
    echo > .all_mds
    echo '\n\\newpage\n' > .newline
    for f in *--*.md; do (cat "\${f}"; cat .newline) >> .all_mds; done
    pandoc ${meta} .newline .all_mds ${process.argv[3] ?
                            ('.newline ' + process.argv[3] + '\\') : '\\'}
        -fmarkdown-implicit_figures \
        --toc \
        -o ${process.argv[2] ?
                (process.argv[2] + '.pdf') :
                'generated.pdf'
        }
    rm .all_mds .newline
    `,
    undefined,
    (err, stdout, stderr) =>
    {
        if(err) console.error(err);
        if(stderr) console.log(stderr);
    }
);

