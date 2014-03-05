/**
 * @providesModule ReactStyleRules
 */
define(function(require, exports, module) {
'use strict'

/**
 * @type {RegExp}
 */
var CLASSNAME_SELECTOR_PATTERN = /(\.)([a-zA-Z_\-][a-zA-Z_\-\d]*)/ig;

/**
 * @type {RegExp}
 */
var HYPHENATE_PATTERN = /([a-z])([A-Z])/g;

/**
 * @type {number}
 */
var _namespaceID = 0;

/**
 * @param {object} rulesMap
 * @constructor
 */
function ReactStyleRules(rulesMap) {
  var namespace = 'ReactStyle' + (_namespaceID++) + '_';
  var i = 0;
  var rules = [];
  this.__rulesByName = {};
  var replacer = namespaceReplacer.bind(null, this, namespace);
  for (var selectors in rulesMap) {
    var name = namespacify(selectors, replacer)
    if(name.indexOf(' ') === -1){
        // Only 1 rules are stored
        this.__rulesByName[selectors] = name.replace('.', '');
    }
    var ruleText = name + '{';
    var declarations = rulesMap[selectors];
    for (var property in declarations) {
      var value = declarations[property];
      ruleText += hyphenate(property) + ':' + value + ';';
    }
    ruleText += '}';
    rules[i] = ruleText;
    i++;
  }

  this._rules = rules;
  this._namespace = namespace;
  this.length = rules.length;
}

/**
 * @return {string}
 */
ReactStyleRules.prototype.toString = function() {
  return this._rules.join('\n');
};

ReactStyleRules.prototype.get = function(selector) {
    return this.__rulesByName[selector];
};

/**
 * @param {string} str
 * @param {string} newSubStr
 * @return {string}
 */
function namespacify(str, newSubStr) {
  return str.replace(CLASSNAME_SELECTOR_PATTERN, newSubStr);
}

/**
 * @param {object} classNameMap
 * @param {string} namespace
 * @param {string} m1
 * @param {string} m2
 * @param {string} className
 * @return {string}
 */
function namespaceReplacer(classNameMap, namespace, m1, m2, className) {
    debugger
  var newClassName = namespace + className;
  // classNameMap[className] = newClassName;
  return '.' + newClassName;
}

/**
 * @param {string} str
 * @return {string}
 */
function hyphenate(str) {
  return str.replace(HYPHENATE_PATTERN, '$1-$2').toLowerCase();
}

module.exports = ReactStyleRules;
})
