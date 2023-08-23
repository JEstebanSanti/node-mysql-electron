const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'jban',
  password: '',
  database: 'pos1'
})

const query = 'SELECT * FROM productos'

function queryFunct () {
  return new Promise((resolve, reject) => {
    con.connect()
    con.query(query, (result) => {
      resolve(result)
    })
  })
}

async function reporte (query) {
  try {
    const resultado = await queryFunct(query)
    console.log(resultado)
  } catch (err) {
    console.log(err)
  }
}

reporte(query)
process.exit()
