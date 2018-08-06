#!/usr/bin/env node

let meta = '';
try{ meta = require('fs').statSync('meta.md').isFile() ? 'meta.md' : '' }
catch(err){ }

require('child_process')
.exec
(
    `
    echo > .all_mds
    for f in *--*.md; do (cat "\${f}"; echo) >> .all_mds; done
    echo -e '\\n' > .newline
    pandoc ${meta} .newline .all_mds ${process.argv[3] ?
                            ('.newline ' + process.argv[3] + '\\') : '\\'}
        -fmarkdown-implicit_figures\
        --template=latex.template\
        -o ${process.argv[2] ?
                (process.argv[2] + '.pdf') :
                'generated.pdf'
        }
    rm .newline .all_mds
    `,
    undefined,
    (err, stdout, stderr) =>
    {
        if(err) console.error(err);
        if(stderr) console.log(stderr);
    }
);

