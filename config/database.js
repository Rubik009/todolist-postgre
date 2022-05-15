const pg = require('pg');
require('dotenv').config();
const {Sequelize} = require('sequelize');


module.exports = new Sequelize (
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host : process.env.HOST,
    dialect : process.env.DIALECT
  }
)


/*const client = new pg.Client(process.env.DATABASE_URL);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
  });

});

module.exports = client;*/
