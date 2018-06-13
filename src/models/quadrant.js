const Quadrant = function (name) {
  var self, blips;

  self = {};
  blips = [];
  self.isDirty = true;

    console.log("instatiating", name);

  self.name = function () {
    return name;
  };

  self.add = function (newBlips) {

    self.isDirty = true;

    if (Array.isArray(newBlips)) {
      blips = blips.concat(newBlips);
    } else {
      blips.push(newBlips);
    }
  };

  self.blips = function () {

    if(self.isDirty) {
      self.sortBlipsByRing_();
    }

    return blips.slice(0);
  };

  self.sortBlipsByRing_ = function() {

    var ringOrder = {
      adopt: 0,
      trial: 1,
      assess: 2,
      reject: 3,
      hold: 3
    };

    var sortedBlips = blips.sort(function(blipA, blipB) {
      var nameA = blipA.ring().name();
      var nameB = blipB.ring().name();

      if(ringOrder[nameA] > ringOrder[nameB] ) {
        return 1;
      }

      if(ringOrder[nameA] < ringOrder[nameB] ) {
        return -1
      }

      console.log("same ring - alpha", blipA.name(), blipB.name() , blipA.name() > blipB.name());


      if(blipA.name() > blipB.name()) {
        return 1;
      }

      if(blipA.name() < blipB.name()) {
        return -1;
      }

      return 0;

    });

    self.isDirty = false;
    blips = sortedBlips;

  }


  return self;
};

module.exports = Quadrant;