# Smudgedown

Convert Markdown to HTML on `git add` and never be the wiser.

## Setup

```
mkdir -p node_modules
npm install markdown@0.5.0
curl https://raw.githubusercontent.com/mcwhittemore/smudgedown/master/to-html-clean.js > ./.git/to-html-clean.js
curl https://raw.githubusercontent.com/mcwhittemore/smudgedown/master/to-md-smudge.js > ./.git/to-md-smudge.js
git config filter.smudgedown.clean "node ./.git/to-html-clean.js %f"
git config filter.smudgedown.smudge "node ./.git/to-md-smudge.js %f"
echo "*.html filter=smudgedown" > .gitattributes
```

If you are setting this up in a new clone of a repo that is already using `Smudgeclean` make sure to run `git reset --hard` after you have run the above setup scripts to `clean` the html into markdown.

## How it Works

Git has a feature set called [filters](http://git-scm.com/book/en/v2/Customizing-Git-Git-Attributes#filters_a). Filters allow you to `smudge` a file as you stage it for committing (read: use `git add`) and `clean` it as you load the file into your working directory. `Smudgeclean` uses this feature of git to compile all the `.html` files from Markdown and into html.

## Templating

Smudgedown implements very basic templating via `.template` files. These `.template` files are used to wrap all their `.html` siblings. The point `.html` content is inserted into a `.template` is signified by a `<div class='smudgedown' />` tag. A template should only have one such tag.