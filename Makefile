
DEPLOY_DIR = './deploy'

all: static build server

static:
	lessc -x app/themes/default/assets/site.less > app/themes/default/_static/site.css

build:
	./cli.js

server:
	cd $(DEPLOY_DIR) && python -m SimpleHTTPServer
