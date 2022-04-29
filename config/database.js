const pg = require('pg');

var client = new pg.Client("postgres://pvnhzcrj:jC7pqIy-pSXe77IwU3sEvIcGH0PBRWYP@chunee.db.elephantsql.com/pvnhzcrj");

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

module.exports = client;
