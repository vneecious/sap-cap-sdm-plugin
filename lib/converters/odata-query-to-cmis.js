const { getColumnsMapping } = require('../util');
const CMISPropertiesDefinition = require('./_CMISStandardPropertyDefinitions');
const ODataParser = require('odata-v4-parser');

let columnsMapping;
const convertODataQueryToCMIS = (query, elements, keys) => {
  const { columns, where, orderBy } = queryClauseBuilder(query, elements, keys);

  let sql = `SELECT ${columns.join(', ')} FROM cmis:document`;
  if (where.length) sql += ` WHERE ${where.join(' AND ')}`;
  if (orderBy.length) sql += ` ORDER BY ${orderBy.join(', ')}`;

  return sql;
};

const queryClauseBuilder = (query, elements, keys) => {
  const ast = query ? ODataParser.query(query).value.options : [];
  columnsMapping = getColumnsMapping(elements);

  let selectedColumns = ['*'];
  let whereClause = [];
  let orderByClause = [];

  const keyEntries = Object.entries(keys);
  if (keyEntries.length) {
    const whereKeys = keyEntries
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `ANY ${key} IN ('${value.join("','")}')`;
        } else {
          return `${key} = '${value}'`;
        }
      })
      .join(' AND ');
    whereClause.push(whereKeys);
  }

  for (let token of ast) {
    switch (token.type) {
      case 'Select':
        selectedColumns = token.value.items.map(
          i => columnsMapping[convertFilterToSql(i)].path,
        );
        break;
      case 'Filter':
        whereClause = [...whereClause, convertFilterToSql(token.value)];
        break;
      case 'OrderBy': // TODO
        orderByClause = token.$orderby.map(order => {
          return `${order.field} ${order.type === 'desc' ? 'DESC' : 'ASC'}`;
        });
        break;
    }
  }

  return {
    columns: selectedColumns,
    where: whereClause,
    orderBy: orderByClause,
  };
};

const convertFilterToSql = filterNode => {
  if (!filterNode) return '';

  const { type, value } = filterNode;

  switch (type) {
    case 'EqualsExpression':
    case 'NotEqualsExpression':
    case 'GreaterThanExpression':
    case 'GreaterThanOrEqualsExpression':
    case 'LessThanExpression':
    case 'LessThanOrEqualsExpression':
      return handleBinaryExpression(filterNode);
    case 'AndExpression':
      return `(${convertFilterToSql(value.left)} AND ${convertFilterToSql(
        value.right,
      )})`;
    case 'OrExpression':
      return `(${convertFilterToSql(filterNode.left)} OR ${convertFilterToSql(
        filterNode.right,
      )})`;
    case 'FirstMemberExpression':
    case 'SelectItem':
      return filterNode.raw;
    case 'MethodCallExpression':
      return handleMethodCallExpression(filterNode, columnsMapping);
    case 'Literal':
    case 'Identifier':
      return filterNode.raw;
    default:
      // Handle other node types as needed
      return '';
  }
};

// eslint-disable-next-line no-unused-vars
const formatLiteral = (value, propertyType) => {
  // TODO: Handle specific formats for 'datetime' and other relevant data types.
  return value; // default implementation for now
};

const handleBinaryExpression = node => {
  const operatorMapping = {
    EqualsExpression: '=',
    NotEqualsExpression: '<>',
    GreaterThanExpression: '>',
    GreaterThanOrEqualsExpression: '>=',
    LessThanExpression: '<',
    LessThanOrEqualsExpression: '<=',
  };

  const left = columnsMapping[convertFilterToSql(node.value.left)].path;
  const right = formatLiteral(
    convertFilterToSql(node.value.right),
    CMISPropertiesDefinition[left].propertyType,
  );

  return `${left} ${operatorMapping[node.type]} ${right}`;
};

const handleMethodCallExpression = (node, columnsMapping) => {
  const parameters = node.value.parameters.map(p => convertFilterToSql(p));

  const left = columnsMapping[parameters[0]].path;
  const right = parameters[1].replace(/'/g, '');

  switch (node.value.method) {
    case 'contains':
      return `${left} LIKE '%${right}%'`;
    case 'startswith':
      return `${left} LIKE '${right}%'`;
    case 'endswith':
      return `${left} LIKE '%${right}'`;
    default:
      return ''; // Handle other methods as needed
  }
};

module.exports = { convertODataQueryToCMIS, queryClauseBuilder };
