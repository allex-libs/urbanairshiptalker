function createLib (execlib) {
  execlib.loadDependencies('client', ['allex:urbanairshiptalker:lib'], require('./libindex').bind(null, execlib));
}   
      
module.exports = createLib;
