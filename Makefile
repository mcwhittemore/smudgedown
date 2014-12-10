
install:
	git config filter.smudgedown.clean "node ./node_modules/smudgedown/to-html-clean.js %f"
	git config filter.smudgedown.smudge "node ./node_modules/smudgedown/to-md-smudge.js %f"
