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

var _Table = require('material-ui/Table');

var _Toolbar = require('material-ui/Toolbar');

var _DropDownMenu = require('material-ui/DropDownMenu');

var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _chevronLeft = require('material-ui/svg-icons/navigation/chevron-left');

var _chevronLeft2 = _interopRequireDefault(_chevronLeft);

var _chevronRight = require('material-ui/svg-icons/navigation/chevron-right');

var _chevronRight2 = _interopRequireDefault(_chevronRight);

var _DataTablesTable = require('./DataTablesTable');

var _DataTablesTable2 = _interopRequireDefault(_DataTablesTable);

var _DataTablesTableBody = require('./DataTablesTableBody');

var _DataTablesTableBody2 = _interopRequireDefault(_DataTablesTableBody);

var _DataTablesHeaderColumn = require('./DataTablesHeaderColumn');

var _DataTablesHeaderColumn2 = _interopRequireDefault(_DataTablesHeaderColumn);

var _DataTablesRow = require('./DataTablesRow');

var _DataTablesRow2 = _interopRequireDefault(_DataTablesRow);

var _DataTablesRowColumn = require('./DataTablesRowColumn');

var _DataTablesRowColumn2 = _interopRequireDefault(_DataTablesRowColumn);

var _DataTablesHeaderToolbar = require('./DataTablesHeaderToolbar');

var _DataTablesHeaderToolbar2 = _interopRequireDefault(_DataTablesHeaderToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// customized components
function getStyles(props, context) {
  var _context$muiTheme = context.muiTheme,
      palette = _context$muiTheme.baseTheme.palette,
      table = _context$muiTheme.table,
      tableHeaderColumn = _context$muiTheme.tableHeaderColumn;


  return {
    tableHeaderColumn: {
      fontWeight: 600
    },
    footerToolbar: {
      backgroundColor: table.backgroundColor,
      borderTop: '1px solid ' + palette.borderColor
    },
    footerControlGroup: {
      fontSize: 12,
      color: tableHeaderColumn.textColor,
      marginLeft: 'auto',
      display: 'flex'
    },
    footerToolbarItem: {
      marginLeft: 8,
      marginRight: 8,
      alignItems: 'center',
      display: 'flex'
    },
    paginationButtons: {
      marginLeft: 24
    },
    paginationButton: {
      minWidth: 36,
      opacity: 0.54
    },
    rowSizeMenu: {
      color: tableHeaderColumn.textColor
    },
    rowSizeControlsWrapper: {
      display: 'flex'
    }
  };
}

function isRowSelected(index, selectedRows) {
  if (Array.isArray(selectedRows)) {
    var checkArr = [];
    selectedRows.map(function (val) {
      if (val > 9) {
        checkArr.push(val % 10);
      } else if (val <= 9) {
        checkArr.push(val);
      }
    });
    return checkArr.includes(index);
  } else {
    return undefined;
  }
}

var DataTables = function (_Component) {
  (0, _inherits3.default)(DataTables, _Component);

  function DataTables(props, context) {
    (0, _classCallCheck3.default)(this, DataTables);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DataTables.__proto__ || (0, _getPrototypeOf2.default)(DataTables)).call(this, props, context));

    _this.handleHeaderColumnClick = function (event, rowIndex, columnIndex) {
      var adjustedColumnIndex = columnIndex - 1;
      var column = _this.props.columns[adjustedColumnIndex];
      if (column && column.sortable) {
        var sort = _this.state.sort;
        var onSortOrderChange = _this.props.onSortOrderChange;

        var key = column.key;
        var order = sort.column === column.key && sort.order === 'asc' ? 'desc' : 'asc';
        _this.setState({
          sort: {
            column: key,
            order: order
          }
        });
        if (onSortOrderChange) {
          onSortOrderChange(key, order);
        }
      }
    };

    _this.handleCellClick = function (rowIndex, columnIndex, event) {
      var _this$props = _this.props,
          onCellClick = _this$props.onCellClick,
          selectable = _this$props.selectable;

      if (onCellClick && !selectable) {
        var adjustedColumnIndex = _this.props.showCheckboxes ? columnIndex : columnIndex - 1;
        onCellClick(rowIndex, adjustedColumnIndex,
        // row data
        _this.props.data[rowIndex],
        // clicked column
        _this.props.data[rowIndex][_this.props.columns[adjustedColumnIndex].key], event);
      }
    };

    _this.handleCellDoubleClick = function (rowIndex, columnIndex, event) {
      var onCellDoubleClick = _this.props.onCellDoubleClick;

      if (onCellDoubleClick) {
        var adjustedColumnIndex = _this.props.showCheckboxes ? columnIndex : columnIndex - 1;
        onCellDoubleClick(rowIndex, adjustedColumnIndex,
        // row data
        _this.props.data[rowIndex],
        // clicked column
        _this.props.data[rowIndex][_this.props.columns[adjustedColumnIndex].key], event);
      }
    };

    _this.handleRowSizeChange = function (event, index, value) {
      var onRowSizeChange = _this.props.onRowSizeChange;

      if (onRowSizeChange) {
        onRowSizeChange(index, value);
      }
    };

    _this.handlePreviousPageClick = function (event) {
      var onPreviousPageClick = _this.props.onPreviousPageClick;

      if (onPreviousPageClick) {
        onPreviousPageClick(event);
      }
    };

    _this.handleNextPageClick = function (event) {
      var onNextPageClick = _this.props.onNextPageClick;

      if (onNextPageClick) {
        onNextPageClick(event);
      }
    };

    _this.handleFilterValueChange = function (value) {
      var onFilterValueChange = _this.props.onFilterValueChange;

      if (onFilterValueChange) {
        onFilterValueChange(value);
      }
    };

    _this.handleRowSelection = function (selectedRows) {
      var onRowSelection = _this.props.onRowSelection;

      if (onRowSelection) {
        onRowSelection(selectedRows);
      }
    };

    _this.renderTableRowColumnData = function (row, column) {
      if (column.render) return column.render(row[column.key], row);
      return row[column.key];
    };

    _this.state = {
      sort: props.initialSort
    };
    return _this;
  }

  (0, _createClass3.default)(DataTables, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          title = _props.title,
          titleStyle = _props.titleStyle,
          filterHintText = _props.filterHintText,
          fixedHeader = _props.fixedHeader,
          fixedFooter = _props.fixedFooter,
          footerToolbarStyle = _props.footerToolbarStyle,
          stripedRows = _props.stripedRows,
          showRowHover = _props.showRowHover,
          selectable = _props.selectable,
          multiSelectable = _props.multiSelectable,
          enableSelectAll = _props.enableSelectAll,
          deselectOnClickaway = _props.deselectOnClickaway,
          showCheckboxes = _props.showCheckboxes,
          height = _props.height,
          showHeaderToolbar = _props.showHeaderToolbar,
          showFooterToolbar = _props.showFooterToolbar,
          rowSize = _props.rowSize,
          rowSizeLabel = _props.rowSizeLabel,
          rowSizeList = _props.rowSizeList,
          showRowSizeControls = _props.showRowSizeControls,
          summaryLabelTemplate = _props.summaryLabelTemplate,
          columns = _props.columns,
          data = _props.data,
          page = _props.page,
          toolbarIconRight = _props.toolbarIconRight,
          count = _props.count,
          tableStyle = _props.tableStyle,
          tableBodyStyle = _props.tableBodyStyle,
          tableHeaderColumnStyle = _props.tableHeaderColumnStyle,
          tableHeaderStyle = _props.tableHeaderStyle,
          tableRowColumnStyle = _props.tableRowColumnStyle,
          tableRowStyle = _props.tableRowStyle,
          tableWrapperStyle = _props.tableWrapperStyle,
          headerToolbarMode = _props.headerToolbarMode,
          filterValue = _props.filterValue,
          showHeaderToolbarFilterIcon = _props.showHeaderToolbarFilterIcon,
          other = (0, _objectWithoutProperties3.default)(_props, ['title', 'titleStyle', 'filterHintText', 'fixedHeader', 'fixedFooter', 'footerToolbarStyle', 'stripedRows', 'showRowHover', 'selectable', 'multiSelectable', 'enableSelectAll', 'deselectOnClickaway', 'showCheckboxes', 'height', 'showHeaderToolbar', 'showFooterToolbar', 'rowSize', 'rowSizeLabel', 'rowSizeList', 'showRowSizeControls', 'summaryLabelTemplate', 'columns', 'data', 'page', 'toolbarIconRight', 'count', 'tableStyle', 'tableBodyStyle', 'tableHeaderColumnStyle', 'tableHeaderStyle', 'tableRowColumnStyle', 'tableRowStyle', 'tableWrapperStyle', 'headerToolbarMode', 'filterValue', 'showHeaderToolbarFilterIcon']);


      var styles = getStyles(this.props, this.context);

      var start = (page - 1) * rowSize + 1;
      var end = (page - 1) * rowSize + rowSize;
      var totalCount = count === 0 ? data.length : count;
      var previousButtonDisabled = page === 1;
      var nextButtonDisabled = false;
      if (totalCount === 0) {
        start = 0;
        previousButtonDisabled = true;
      } else if (start > totalCount) {
        start = 1;
        previousButtonDisabled = true;
      }
      if (end >= totalCount) {
        end = totalCount;
        nextButtonDisabled = true;
      }

      var headerToolbar = void 0;
      if (showHeaderToolbar) {
        headerToolbar = _react2.default.createElement(_DataTablesHeaderToolbar2.default, {
          filterHintText: filterHintText,
          title: title,
          titleStyle: titleStyle,
          onFilterValueChange: this.handleFilterValueChange,
          toolbarIconRight: toolbarIconRight,
          mode: headerToolbarMode,
          filterValue: filterValue,
          showFilterIcon: showHeaderToolbarFilterIcon
        });
      }

      var rowSizeControls = null;
      if (showRowSizeControls) {
        rowSizeControls = _react2.default.createElement(
          'div',
          { style: styles.rowSizeControlsWrapper },
          _react2.default.createElement(
            'div',
            { style: styles.footerToolbarItem },
            _react2.default.createElement(
              'div',
              null,
              rowSizeLabel
            )
          ),
          rowSizeList.length > 0 ? _react2.default.createElement(
            _DropDownMenu2.default,
            {
              labelStyle: styles.rowSizeMenu,
              value: rowSize,
              onChange: this.handleRowSizeChange
            },
            rowSizeList.map(function (rowSize) {
              return _react2.default.createElement(_MenuItem2.default, {
                key: rowSize,
                value: rowSize,
                primaryText: rowSize
              });
            })
          ) : null
        );
      }

      var footerToolbar = void 0;
      if (showFooterToolbar) {
        footerToolbar = _react2.default.createElement(
          _Toolbar.Toolbar,
          { style: (0, _assign2.default)({}, styles.footerToolbar, footerToolbarStyle) },
          _react2.default.createElement(
            'div',
            { style: styles.footerControlGroup },
            rowSizeControls,
            _react2.default.createElement(
              'div',
              { style: styles.footerToolbarItem },
              _react2.default.createElement(
                'div',
                null,
                summaryLabelTemplate(start, end, totalCount)
              )
            ),
            _react2.default.createElement(
              'div',
              { style: (0, _assign2.default)(styles.paginationButtons, styles.footerToolbarItem) },
              _react2.default.createElement(_FlatButton2.default, {
                icon: _react2.default.createElement(_chevronLeft2.default, null),
                style: styles.paginationButton,
                onClick: this.handlePreviousPageClick,
                disabled: previousButtonDisabled
              }),
              _react2.default.createElement(_FlatButton2.default, {
                icon: _react2.default.createElement(_chevronRight2.default, null),
                style: styles.paginationButton,
                onClick: this.handleNextPageClick,
                disabled: nextButtonDisabled
              })
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        headerToolbar,
        _react2.default.createElement(
          _DataTablesTable2.default,
          {
            height: height,
            fixedHeader: fixedHeader,
            fixedFooter: fixedFooter,
            selectable: selectable,
            multiSelectable: multiSelectable,
            onCellClick: this.handleCellClick,
            onCellDoubleClick: this.handleCellDoubleClick,
            onRowSelection: this.handleRowSelection,
            style: tableStyle,
            bodyStyle: tableBodyStyle,
            wrapperStyle: tableWrapperStyle
          },
          _react2.default.createElement(
            _Table.TableHeader,
            {
              displaySelectAll: showCheckboxes,
              adjustForCheckbox: showCheckboxes,
              enableSelectAll: enableSelectAll,
              style: (0, _assign2.default)({}, styles.tableHeader, tableHeaderStyle)
            },
            _react2.default.createElement(
              _Table.TableRow,
              {
                onCellClick: this.handleHeaderColumnClick,
                style: (0, _assign2.default)({}, styles.tableRow, tableRowStyle)
              },
              columns.map(function (column, index) {
                var style = (0, _assign2.default)({}, styles.tableHeaderColumn, tableHeaderColumnStyle, column.style || {});
                var sortable = column.sortable;
                var sorted = _this2.state.sort.column === column.key;
                var order = sorted ? _this2.state.sort.order : 'asc';
                return _react2.default.createElement(
                  _DataTablesHeaderColumn2.default,
                  {
                    key: index,
                    style: style,
                    tooltip: column.tooltip,
                    sortable: sortable,
                    sorted: sorted,
                    order: order,
                    alignRight: column.alignRight,
                    className: column.className
                  },
                  _react2.default.createElement(
                    'span',
                    null,
                    column.label
                  )
                );
              }, this)
            )
          ),
          _react2.default.createElement(
            _DataTablesTableBody2.default,
            {
              displayRowCheckbox: showCheckboxes,
              deselectOnClickaway: deselectOnClickaway,
              showRowHover: showRowHover,
              stripedRows: stripedRows,
              page: page,
              rowSize: rowSize
            },
            data.map(function (row, index) {
              return _react2.default.createElement(
                _DataTablesRow2.default,
                {
                  style: (0, _assign2.default)({}, styles.tableRow, tableRowStyle),
                  key: index,
                  selected: isRowSelected(index, _this2.props.selectedRows)
                },
                columns.map(function (column, index) {
                  return _react2.default.createElement(
                    _DataTablesRowColumn2.default,
                    {
                      style: (0, _assign2.default)({}, styles.tableRowColumn, tableRowColumnStyle, column.style),
                      key: index,
                      alignRight: column.alignRight
                    },
                    _this2.renderTableRowColumnData(row, column)
                  );
                })
              );
            })
          )
        ),
        footerToolbar
      );
    }
  }]);
  return DataTables;
}(_react.Component);

DataTables.muiName = 'DataTables';
DataTables.propTypes = {
  columns: _propTypes2.default.array.isRequired,
  count: _propTypes2.default.number,
  data: _propTypes2.default.array,
  deselectOnClickaway: _propTypes2.default.bool,
  enableSelectAll: _propTypes2.default.bool,
  filterHintText: _propTypes2.default.string,
  filterValue: _propTypes2.default.string,
  fixedFooter: _propTypes2.default.bool,
  fixedHeader: _propTypes2.default.bool,
  footerToolbarStyle: _propTypes2.default.object,
  headerToolbarMode: _propTypes2.default.string,
  height: _propTypes2.default.string,
  initialSort: _propTypes2.default.object,
  multiSelectable: _propTypes2.default.bool,
  onCellClick: _propTypes2.default.func,
  onCellDoubleClick: _propTypes2.default.func,
  onFilterValueChange: _propTypes2.default.func,
  onNextPageClick: _propTypes2.default.func,
  onPreviousPageClick: _propTypes2.default.func,
  onRowSelection: _propTypes2.default.func,
  onRowSizeChange: _propTypes2.default.func,
  onSortOrderChange: _propTypes2.default.func,
  page: _propTypes2.default.number,
  rowSize: _propTypes2.default.number,
  rowSizeLabel: _propTypes2.default.string,
  rowSizeList: _propTypes2.default.array,
  selectable: _propTypes2.default.bool,
  selectedRows: _propTypes2.default.array,
  showCheckboxes: _propTypes2.default.bool,
  showFooterToolbar: _propTypes2.default.bool,
  showHeaderToolbar: _propTypes2.default.bool,
  showHeaderToolbarFilterIcon: _propTypes2.default.bool,
  showRowHover: _propTypes2.default.bool,
  showRowSizeControls: _propTypes2.default.bool,
  stripedRows: _propTypes2.default.bool,
  summaryLabelTemplate: _propTypes2.default.func,
  tableBodyStyle: _propTypes2.default.object,
  tableHeaderColumnStyle: _propTypes2.default.object,
  tableHeaderStyle: _propTypes2.default.object,
  tableRowColumnStyle: _propTypes2.default.object,
  tableRowStyle: _propTypes2.default.object,
  tableStyle: _propTypes2.default.object,
  tableWrapperStyle: _propTypes2.default.object,
  title: _propTypes2.default.string,
  titleStyle: _propTypes2.default.object,
  toolbarIconRight: _propTypes2.default.node
};
DataTables.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
DataTables.defaultProps = {
  rowSize: 10,
  rowSizeLabel: 'Rows per page:',
  rowSizeList: [10, 30, 50, 100],
  summaryLabelTemplate: function summaryLabelTemplate(start, end, count) {
    return start + ' - ' + end + ' of ' + count;
  },
  showRowSizeControls: true,
  filterHintText: 'Search',
  columns: [],
  data: [],
  page: 1,
  count: 0,
  fixedHeader: false,
  fixedFooter: false,
  stripedRows: false,
  showRowHover: false,
  selectable: false,
  selectedRows: undefined,
  multiSelectable: false,
  enableSelectAll: false,
  deselectOnClickaway: false,
  showCheckboxes: false,
  height: 'inherit',
  showHeaderToolbar: false,
  showFooterToolbar: true,
  initialSort: {
    column: '',
    order: 'asc'
  }
};
exports.default = DataTables;