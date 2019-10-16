function createLib (execilb, urbanairshiptalkerlib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib;

  function UATalker(){
  }

  UATalker.prototype.destroy = function(){
  };

  return UATalker;
}

module.exports = createLib;
