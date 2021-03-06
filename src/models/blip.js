const IDEAL_BLIP_WIDTH = 22;
const Blip = function (name, ring, isNew, topic, description, owner, usedBy, versionsSupported, isReject) {
  var self, number;

  self = {};
  number = -1;

  self.width = IDEAL_BLIP_WIDTH;

  self.name = function () {
    return name;
  };

  self.topic = function () {
    return topic || '';
  };

  self.description = function () {
    return description || '';
  };

  self.isNew = function () {
    return isNew;
  };

  self.isReject = function () {
    return isReject;
  };

  self.ring = function () {
    return ring;
  };

  self.number = function () {
    return number;
  };

  self.setNumber = function (newNumber) {
    number = newNumber;
  };

  self.owner = function () {
    return owner || '';
  };

  self.usedBy = function () {
    return usedBy || '';
  };

  self.versionsSupported = function () {
    return versionsSupported || '';
  };

  return self;
};

module.exports = Blip;
