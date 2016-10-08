const _ = require('underscore');

const isIndexed = data => (_.isArray(data) || _.isString(data));

module.exports = isIndexed;
