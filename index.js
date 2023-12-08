const { QueryBuilder } = require('./utils/queryBuilder');
const { MySQLConnection } = require('./database/mysql');
const mysqlConnection = new MySQLConnection(require('./database/dbConfig'));
let jsonInput = require('./input/allInput');

async function connectDB() {

  if (process.env.NODE_ENV.toString() == "dev".toString()) {
    await mysqlConnection.connect();
    console.log("DB connection successful in ENV", process.env.NODE_ENV)
  } else {
    console.log("DB connection skipped in ENV", process.env.NODE_ENV)
  }
}

async function executeQuery(functionName, query) {
  return new Promise(async (resolve, reject) => {
    if (process.env.NODE_ENV.toString() == "dev".toString()) {
      try {
        const queryResult = await mysqlConnection.query(query);
        console.log(process.env.NODE_ENV, 'Query Result of ' + functionName + ':' + query);
        console.log(queryResult.results)
        resolve(queryResult.results)
      } catch (error) {
        reject(error)
      }

    } else {
      resolve('Query  ' + functionName + ' : ' + query)
      console.log(process.env.NODE_ENV, 'Query ' + functionName + ' : ' + query);
    }
  })
}


async function equal() {
  try {
    const queryBuilder = new QueryBuilder();
    queryBuilder.conditions = jsonInput.equal_condition;
    queryBuilder.addTable('table1').addSelect("age,name");
    const query = queryBuilder.build();
    await executeQuery("equal", query)
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
    await executeQuery("inCondition", query)
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
    await executeQuery("likeCondition", query)
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
    await executeQuery("gteCondition", query)
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
    await executeQuery("lteCondition", query)
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
    await executeQuery("betweenCondition", query)
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
    await executeQuery("join", query)
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
    await executeQuery("subquery", query)
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