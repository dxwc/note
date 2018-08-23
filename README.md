+ Requires:
    + node.js, pandoc, linux, bash
+ Setup:
    + `sudo cp note.js /usr/local/bin/note`
    + `sudo cp gen-pdf.js /usr/local/bin/gen-pdf`
    + To open with terminal program/vim, see [this](https://unix.stackexchange.com/q/177976)
+ Use:
    + `note <optional file description and header space separated>`
    + `gen-pdf <optional output pdf file name not space separated> <other md file>`
        + if `meta.md` found, will use before other md files