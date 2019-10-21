function createLib (execlib) {
  return require('./libindex')(execlib);
  //execlib.loadDependencies('client', ['allex:urbanairshiptalker:lib'], require('./libindex').bind(null, execlib));
}   
      
module.exports = createLib;
