const d3 = require('d3');
const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  capitalize: require('lodash/capitalize'),
  each: require('lodash/each')
};

const InputSanitizer = require('./inputSanitizer');
const Radar = require('../models/radar');
const Quadrant = require('../models/quadrant');
const Ring = require('../models/ring');
const Blip = require('../models/blip');
const GraphingRadar = require('../graphing/radar');
const MalformedDataError = require('../exceptions/malformedDataError');
const SheetNotFoundError = require('../exceptions/sheetNotFoundError');
const ContentValidator = require('./contentValidator');
const ExceptionMessages = require('./exceptionMessages');

const Site = function () {
  var self = {};

  self.build = function (radarData) {

    return createRadar(radarData);

    function displayErrorMessage(exception) {

      d3.selectAll(".loading").remove();
      var message = 'Oops! It seems like there are some problems with loading your data. ';

      if (exception instanceof MalformedDataError) {
        message = message.concat(exception.message);
      } else if (exception instanceof SheetNotFoundError) {
        message = exception.message;
      } else {
        console.error(exception);
      }

      message = message.concat('<br/>', 'Please check <a href="https://info.thoughtworks.com/visualize-your-tech-strategy-guide.html#faq">FAQs</a> for possible solutions.');

      d3.select('body')
        .append('div')
        .attr('class', 'error-container')
        .append('div')
        .attr('class', 'error-container__message')
        .append('p')
        .html(message);
    }

    function createRadar(radarData) {

      try {

        var columnNames = radarData.columnNames;

        var contentValidator = new ContentValidator(columnNames);
        contentValidator.verifyContent();
        contentValidator.verifyHeaders();

        var all = radarData.points;

        var blips = _.map(all, new InputSanitizer().sanitize);

        document.title = radarData.title;
        d3.selectAll(".loading").remove();

        var rings = _.map(_.uniqBy(blips, 'ring'), 'ring');
        var ringMap = {};
        var maxRings = 4;

        _.each(rings, function (ringName, i) {
          if (i == maxRings) {
            throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS);
          }
          ringMap[ringName] = new Ring(ringName, i);
        });

        console.log("map", ringMap);

        var quadrants = {};
        _.each(blips, function (blip) {
          if (!quadrants[blip.quadrant]) {
            quadrants[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant));
          }
          quadrants[blip.quadrant].add(new Blip(blip.name, ringMap[blip.ring], blip.isNew.toLowerCase() === 'true', blip.topic, blip.description, blip.owner, blip.usedBy, blip.versionsSupported))
        });

        var radar = new Radar();
        _.each(quadrants, function (quadrant) {
          radar.addQuadrant(quadrant)
        });

        var margin = 50;
        var size = (window.innerHeight - margin) < 720 ? 720 : window.innerHeight - margin;

        new GraphingRadar(size, radar).init().plot();

      } catch (exception) {
        displayErrorMessage(exception);
      }
    }
  };

  return self;
};

const SiteInput = function () {
  var self = {};

  self.build = function (radarData) {
    var site = Site();
    site.build(radarData);
  };

  return self;
};

module.exports = SiteInput;
