
DEPLOY_DIR = './deploy'

all: static build server

test:
	@node ./test/app.test.js

static:
	lessc -x app/themes/default/assets/site.less > app/themes/default/_static/site.css

build:
	./cli.js

server:
	./cli.js -s

.PHONY: test
