const { QueryBuilder } = require('./utils/queryBuilder');
const { MySQLConnection } = require('./database/mysql');
const mysqlConnection = new MySQLConnection(require('./database/dbConfig'));
let jsonInput = require('./input/allInput');

async function connectDB() {
  await mysqlConnection.connect();
}

async function equal() {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder.conditions = jsonInput.equal_condition;
    queryBuilder.addTable('table1').addSelect("age,name");
    const query = queryBuilder.build();
    const queryResult = await mysqlConnection.query(query);
    console.log('Query Result of equal:' + query, queryResult.results);
  } catch (error) {
    console.log(error)
  }
}
async function inCondition() {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder.conditions = jsonInput.in_condition;
    queryBuilder.addTable('table1').addSelect("age,name");;
    const query = queryBuilder.build();
    const queryResult = await mysqlConnection.query(query);
    console.log('Query Result of IN:' + query, queryResult.results);
  } catch (error) {
    console.log(error)
  }
}

async function likeCondition() {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder.conditions = jsonInput.like_condition;
    queryBuilder.addTable('table1');
    const query = queryBuilder.build();
    const queryResult = await mysqlConnection.query(query);
    console.log('Query Result of LIKE:' + query, queryResult.results);
  } catch (error) {
    console.log(error)
  }
}

async function gteCondition() {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder.conditions = jsonInput.greater_than_equal_condition;
    queryBuilder.addTable('table1');
    const query = queryBuilder.build();
    const queryResult = await mysqlConnection.query(query);
    console.log('Query Result of greater_than_equal_condition:' + query, queryResult.results);
  } catch (error) {
    console.log(error)
  }
}


async function lteCondition() {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder.conditions = jsonInput.less_than_equal_condition;
    queryBuilder.addTable('table1');
    const query = queryBuilder.build();
    const queryResult = await mysqlConnection.query(query);
    console.log('Query Result of less_than_equal_condition:' + query, queryResult.results);
  } catch (error) {
    console.log(error)
  }
}

async function betweenCondition() {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder.conditions = jsonInput.between_condition;
    queryBuilder.addTable('table1');
    queryBuilder.addJoin('INNER', 'table2', 'table1.id = table2.id')
    const query = queryBuilder.build();
    const queryResult = await mysqlConnection.query(query);
    console.log('Query Result of between_condition:' + query, queryResult.results);
  } catch (error) {
    console.log(error)
  }
}


async function join() {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder.conditions = jsonInput.like_condition;
    queryBuilder.addTable('table1')
      .addJoin('INNER', 'table2', 'table1.id = table2.id')
    const query = queryBuilder.build();
    const queryResult = await mysqlConnection.query(query);
    console.log('Query Result of join: ' + query, queryResult.results);
  } catch (error) {
    console.log(error)
  }
}

async function subquery() {
  try {
    const queryBuilder2 = new QueryBuilder();
    queryBuilder2.conditions = jsonInput.subquery_condition2
    queryBuilder2.addTable('table6').addSelect('subquery_field')
    const subquery = queryBuilder2.build();
    jsonInput.subquery_condition[0].fieldValue = `(${subquery})`

    const queryBuilder = new QueryBuilder();
    queryBuilder.conditions = jsonInput.subquery_condition;
    queryBuilder.addTable('table1')
      .addJoin('INNER', 'table2', 'table1.id = table2.id')
    const query = queryBuilder.build();
    const queryResult = await mysqlConnection.query(query);
    console.log('Query Result of Subquery: ' + query, queryResult.results);
  } catch (error) {
    console.log(error)
  }
}

connectDB();

equal();
inCondition()
likeCondition()
gteCondition()
lteCondition()
betweenCondition()
join()
subquery()