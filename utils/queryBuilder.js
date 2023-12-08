class QueryBuilder {
  constructor() {
    this.select = [];
    this.tables = [];
    this.conditions = [];
    this.joins = [];
    this.subqueries = [];
  }

  addSelect(select){
    this.select.push(select);
    return this;
  }

  addTable(table) {
    this.tables.push(table);
    return this;
  }

  addJoin(joinType, joinTable, onCondition) {
    this.joins.push({ type: joinType, table: joinTable, on: onCondition });
    return this;
  }

  addSubquery(subquery) {
    this.subqueries.push(`(${subquery})`);
    return this;
  }
  

  build() {
    if (this.tables.length === 0) {
      throw new Error('At least one table is required.');
    }

    let queryString = 'SELECT * FROM ';
    if (this.select.length) {
      queryString = `SELECT ${this.select.join(', ')} FROM `;
    }

    if (this.tables.length === 1) {
      queryString += this.tables[0];
    } else {
      queryString += this.tables.join(', ');
    }

    if (this.joins.length > 0) {
      this.joins.forEach((join) => {
        queryString += ` ${join.type} JOIN ${join.table} ON ${join.on}`;
      });
    }

    if (this.conditions.length > 0 || this.subqueries.length > 0) {
      queryString += ' WHERE ';

      const conditions = this.conditions.map((condition) => {
        const { operator, fieldName, fieldValue } = condition;
        switch (operator.toLowerCase()) {
          case 'in':
            return `${fieldName} IN (${fieldValue})`;
          case 'like':
            return `${fieldName} ${operator} ${"'%"}${fieldValue}${"%'"} `;
          case '=':
          case '<=':
          case '>=':
          case '<>':
            return `${fieldName} ${operator} ${fieldValue}`;
          case 'between':
            return `${fieldName} ${operator} ${fieldValue.v1} ${'AND'} ${fieldValue.v2}`;
          default:
            throw new Error(`Unsupported operator: ${operator}`);
        }
      });

      queryString += conditions.join(' AND ');

      if (this.subqueries.length > 0) {
        if (conditions.length > 0) {
          queryString += ' AND ';
        }
        queryString += this.subqueries.join(' AND ');
      }
    }

    return queryString;
  }
}
module.exports = { QueryBuilder }