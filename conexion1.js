const mysql = require('mysql')
const { dbCrendentials } = require('./bdConfig')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'jban',
  password: '',
  database: 'pos1'
})

/** const con = mysql.createConnection(
    dbCrendentials.host,
    dbCrendentials.user,
    dbCrendentials.password,
    dbCrendentials.database
); */

console.log(dbCrendentials.host)

con.connect()
// const query = 'SELECT * FROM productos'

process.exit()
