'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Toolbar = require('material-ui/Toolbar');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _clear = require('material-ui/svg-icons/content/clear');

var _clear2 = _interopRequireDefault(_clear);

var _filterList = require('material-ui/svg-icons/content/filter-list');

var _filterList2 = _interopRequireDefault(_filterList);

var _search = require('material-ui/svg-icons/action/search');

var _search2 = _interopRequireDefault(_search);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(context) {
  var table = context.muiTheme.table;


  return {
    headerToolbar: {
      backgroundColor: table.backgroundColor,
      height: 64,
      paddingRight: 8
    },
    icon: {
      opacity: 0.64
    },
    headerToolbarSearchIcon: {
      marginTop: 12
    },
    headerToolbarIconButton: {
      marginTop: 6
    },
    searchToolbarGroup: {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    searchInputTextField: {
      marginTop: 6,
      marginLeft: 8,
      width: '100%',
      minWidth: 60
    },
    headerToolbarDefaultIcons: {
      display: 'flex',
      alignItems: 'center'
    },
    toolbarTitle: {
      lineHeight: '72px'
    }
  };
}

var DataTablesHeaderToolbar = function (_Component) {
  (0, _inherits3.default)(DataTablesHeaderToolbar, _Component);

  function DataTablesHeaderToolbar(props, context) {
    (0, _classCallCheck3.default)(this, DataTablesHeaderToolbar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DataTablesHeaderToolbar.__proto__ || (0, _getPrototypeOf2.default)(DataTablesHeaderToolbar)).call(this, props, context));

    _this.handleFilterClick = function () {
      var mode = _this.state.mode === 'default' ? 'filter' : 'default';
      var filterValue = _this.state.filterValue;

      _this.setState({
        mode: mode,
        filterValue: ''
      });
      if (mode === 'default' && filterValue !== '') {
        _this.emitFilterValueChange('');
      }
    };

    _this.handleClearClick = function () {
      var filterValue = _this.state.filterValue;

      if (filterValue !== '') {
        _this.setState({
          filterValue: ''
        });
        _this.emitFilterValueChange('');
      }
    };

    _this.handleFilterValueChange = function (event) {
      var value = event.target.value;
      _this.setState({
        filterValue: value
      });
      clearTimeout(_this.filterValueTimer);
      _this.filterValueTimer = setTimeout(function () {
        _this.emitFilterValueChange(value);
      }, 500);
    };

    _this.emitFilterValueChange = function (value) {
      var onFilterValueChange = _this.props.onFilterValueChange;

      if (onFilterValueChange) {
        onFilterValueChange(value);
      }
    };

    _this.filterValueTimer = undefined;
    _this.filterInput = undefined;
    _this.state = {
      mode: props.mode,
      filterValue: props.filterValue
    };
    return _this;
  }

  (0, _createClass3.default)(DataTablesHeaderToolbar, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.mode === 'default' && this.state.mode === 'filter') {
        if (this.filterInput) {
          this.filterInput.focus();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          filterHintText = _props.filterHintText,
          toolbarIconRight = _props.toolbarIconRight,
          title = _props.title,
          titleStyle = _props.titleStyle,
          showFilterIcon = _props.showFilterIcon,
          other = (0, _objectWithoutProperties3.default)(_props, ['filterHintText', 'toolbarIconRight', 'title', 'titleStyle', 'showFilterIcon']);
      var _state = this.state,
          mode = _state.mode,
          filterValue = _state.filterValue;


      var styles = getStyles(this.context);

      var contentNode = void 0;
      var filterIconNode = void 0;

      if (mode === 'default') {
        contentNode = _react2.default.createElement(_Toolbar.ToolbarTitle, { style: (0, _assign2.default)({}, styles.toolbarTitle, titleStyle), text: title });
      } else if (mode === 'filter') {
        contentNode = _react2.default.createElement(
          'div',
          { style: styles.searchToolbarGroup },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_search2.default, { style: styles.headerToolbarSearchIcon })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.searchInputTextField },
            _react2.default.createElement(_TextField2.default, {
              fullWidth: true,
              underlineShow: false,
              hintText: filterHintText,
              onChange: this.handleFilterValueChange,
              value: filterValue,
              ref: function ref(textField) {
                _this2.filterInput = textField ? textField.input : null;
              }
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.headerToolbarDefaultIcons },
            _react2.default.createElement(
              _IconButton2.default,
              {
                style: (0, _assign2.default)(styles.headerToolbarIconButton, styles.icon),
                onClick: this.handleClearClick
              },
              _react2.default.createElement(_clear2.default, null)
            )
          )
        );
      }

      var toolbarIconRightChildren = [];
      if (toolbarIconRight) {
        if (toolbarIconRight.length) {
          toolbarIconRight.map(function (toolbarIcon, i) {
            toolbarIconRightChildren.push(_react2.default.cloneElement(toolbarIcon, {
              style: (0, _assign2.default)(styles.headerToolbarIconButton, styles.icon),
              key: i
            }));
          });
        } else {
          toolbarIconRightChildren.push(_react2.default.cloneElement(toolbarIconRight, {
            style: (0, _assign2.default)(styles.headerToolbarIconButton, styles.icon),
            key: 1
          }));
        }
      }

      if (showFilterIcon) {
        filterIconNode = _react2.default.createElement(
          _IconButton2.default,
          {
            style: (0, _assign2.default)(styles.headerToolbarIconButton, styles.icon),
            onClick: this.handleFilterClick
          },
          _react2.default.createElement(_filterList2.default, {
            color: mode === 'filter' ? _colors.blue500 : ''
          })
        );
      }

      return _react2.default.createElement(
        _Toolbar.Toolbar,
        { style: styles.headerToolbar },
        contentNode,
        _react2.default.createElement(
          _Toolbar.ToolbarGroup,
          null,
          filterIconNode,
          toolbarIconRightChildren
        )
      );
    }
  }]);
  return DataTablesHeaderToolbar;
}(_react.Component);

DataTablesHeaderToolbar.muiName = 'DataTablesHeaderToolbar';
DataTablesHeaderToolbar.propTypes = {
  filterHintText: _propTypes2.default.string,
  filterValue: _propTypes2.default.string,
  handleFilterValueChange: _propTypes2.default.func,
  mode: _propTypes2.default.string,
  onFilterValueChange: _propTypes2.default.func,
  showFilterIcon: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  titleStyle: _propTypes2.default.object,
  toolbarIconRight: _propTypes2.default.node
};
DataTablesHeaderToolbar.defaultProps = {
  mode: 'default',
  filterValue: '',
  showFilterIcon: true
};
DataTablesHeaderToolbar.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = DataTablesHeaderToolbar;