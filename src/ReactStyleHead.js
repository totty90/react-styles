/**
 * @providesModule ReactStyleHead
 * @jsx React.DOM
 */
define(function(require, exports, module) {
'use strict'

var React = require('react');
// var ReactStyle = require('./ReactStyle');


var ReactStyleHead = React.createClass({
  componentDidMount: function() {
    this.props.ReactStyle.addEventListener('change', this.handleStyleChange);
  },

  componentWillUnmount: function() {
    this.props.ReactStyle.removeEventListener('change', this.handleStyleChange);
  },

  handleStyleChange: function() {
    this.forceUpdate();
  },

  render: function() {
    return React.DOM.div({}, this.props.ReactStyle.renderToComponents())
  }
});

module.exports = ReactStyleHead;
})
