const _ = require('underscore');

const isIndexed = require('./moduleTest');

_.times(4, ()=> { console.log('Major') });
console.log(isIndexed([1, 2, 3]));
