"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

"use strict";

var React = _interopRequire(require('react'));

var Markdown = _interopRequire(require('remarkable'));

var Remarkable = React.createClass({
  displayName: "Remarkable",


  getDefaultProps: function () {
    return {
      container: "div",
      options: {} };
  },

  render: function () {
    var Container = this.props.container;

    return (React.createElement(Container, null, this.content()));
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (nextProps.options !== this.props.options) {
      this.md = new Markdown(nextProps.options);
    }
  },

  content: function () {
    var _this = this;
    if (this.props.source) {
      return React.createElement("span", {
        dangerouslySetInnerHTML: { __html: this.renderMarkdown(this.props.source) }
      });
    } else {
      return React.Children.map(this.props.children, function (child) {
        if (typeof child === "string") {
          return React.createElement("span", {
            dangerouslySetInnerHTML: { __html: _this.renderMarkdown(child) }
          });
        } else {
          return child;
        }
      });
    }
  },

  renderMarkdown: function (source) {
    if (!this.md) {
      this.md = new Markdown(this.props.options);
    }

    return this.md.render(source);
  }

});

module.exports = Remarkable;