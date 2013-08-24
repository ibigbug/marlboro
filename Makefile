all:
	@npm install -d

specs := $(shell find ./tests -name '*.test.js' ! -path "*node_modules/*")
reporter = spec

test:
	@node_modules/.bin/mocha --reporter ${reporter} ${opts} ${specs}

server:
	cd _site && python2 -m SimpleHTTPServer

.PHONY: all test
