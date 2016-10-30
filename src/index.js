const _ = require('underscore');

const isIndexed = require('./moduleTest');

const fjs = require('./functional_js');

_.times(4, ()=> { console.log('Major') });
console.log(isIndexed([1, 2, 3]));

var str = fjs.dispatch(fjs.invoker('toString', Array.prototype.toString), fjs.invoker('toString', String.prototype.toString));

console.log("test1", str("a"));

