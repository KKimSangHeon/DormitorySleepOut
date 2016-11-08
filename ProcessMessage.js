module.exports=function(){

  var route = require('express').Router();

  require('./RoutingMessage')(route);

  return route;
}
