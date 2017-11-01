<!-- [![Build Status](https://travis-ci.org/thoughtworks/build-your-own-radar.svg?branch=master)](https://travis-ci.org/thoughtworks/build-your-own-radar) -->

A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## How To Use

All tasks are defined in `package.json`.

- `git clone git@github.com:reedbusiness/build-your-own-radar.git`
- `npm install`
- `npm test` - to run your tests
- `npm run dev` - to run application in localhost:8080. This will watch the .js and .css files and rebuild on file changes

After building it will start on localhost:8080

## Customising

A sample radar is included in ```./src/default/radar.json``` which shows the required JSON structure for the data. If you would like to customise the radar:

1. Create the folder ```./src/custom/```
2. Add your ```radar.json``` file to this folder.
3. Add your ```logo.png``` file to this folder.

The build process will detect these files and customise without altering the source code.
