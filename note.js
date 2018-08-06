#!/usr/bin/env node

let fs   = require('fs');
let path = require('path');

let dir = '.';

let max = 0;
let num;

fs.readdirSync(dir)
.forEach((item) =>
{
    if
    (
        fs.statSync(path.join(dir, item)).isFile() &&
        item.match(/[0-9]+--.+\.md/) !== null
    )
    {
        num = item.match(/[0-9]+--/)[0];
        num = Number(num.substring(0, num.length - 2));

        if(num > max) max = num;
    }
});


let to_create = path.join
(
    dir,
`\
${Number(max + 1)}--${new Date().toLocaleDateString()}\
${process.argv.slice(2).length ? ('--' + process.argv.slice(2).join('_')) : ''}.md`
);

if(!fs.existsSync(to_create))
{
    fs.appendFileSync
    (
        to_create,
`# ${Number(max + 1)}. ${process.argv.slice(2).join(' ')}
${new Date().toLocaleDateString()}\n\n`
    );

    require('child_process').spawnSync('code-oss', [to_create]);
}
else
{
    console.log(`Error: File to create(${to_create}) exists already`);
}