const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'jban',
  password: '',
  database: 'pos1'
})

function queryProductos (query) {
  let consulta = ''
  switch (query) {
    case 1:
      consulta = 'SELECT nombre, sum(cantidad) AS "TOTAL CANTIDAD" FROM ventas_detalle GROUP BY nombre;'
      break
    case 2:
      consulta = 'SELECT * FROM ventas ORDER BY fecha ASC LIMIT 1;'
      break
    case 3:
      consulta = 'SELECT * FROM ventas ORDER BY fecha DESC LIMIT 1;'
      break
    case 4:
      consulta = 'SELECT sum(cantidad) FROM ventas_detalle;'
      break
    case 5:
      consulta = 'SELECT nombre, sum(cantidad) FROM ventas_detalle GROUP BY nombre;'
      break
    case 6:
      consulta = 'SELECT nombre, sum(cantidad) FROM ventas_detalle GROUP BY nombre ORDER BY sum(cantidad) DESC LIMIT 1;'
      break
    case 7:
      consulta = 'SELECT nombre, sum(cantidad) FROM ventas_detalle GROUP BY nombre ORDER BY sum(cantidad) ASC LIMIT 1;'
      break
    case 8:
      consulta = 'SELECT productos.nombre, ventas_detalle.nombre FROM productos LEFT JOIN ventas_detalle USING(nombre) WHERE ventas_detalle.nombre is null;'
      break
    case 9:
      consulta = 'SELECT sum(cantidad*precio) FROM ventas_detalle;'
      break
    case 10:
      consulta = 'SELECT ventas.id AS "VENTA ID", fecha, hora, SUM(cantidad*precio) AS "TOTAL VENTAS"  FROM ventas_detalle INNER JOIN ventas ON ventas_detalle.id_venta = ventas.id'
      break
    case 11:
      consulta = 'SELECT  fecha, sum(cantidad*precio) AS "TOTAL" FROM ventas INNER JOIN ventas_detalle ON ventas_detalle.id_venta = ventas.id group BY YEAR(fecha) order BY fecha ASC'
      break
    case 12:
      consulta = 'SELECT  fecha, sum(cantidad*precio) AS "TOTAL" FROM ventas INNER JOIN ventas_detalle ON ventas_detalle.id_venta = ventas.id group BY YEAR(fecha) order BY TOTAL ASC LIMIT 1'
      break
    case 13:
      consulta = 'SELECT  fecha, sum(cantidad*precio) AS "TOTAL" FROM ventas INNER JOIN ventas_detalle ON ventas_detalle.id_venta = ventas.id group BY YEAR(fecha) order BY TOTAL DESC LIMIT 1'
      break
    case 14:
      consulta = 'SELECT  YEAR(fecha), sum(cantidad*precio) AS "TOTAL", COUNT(*) AS "TOTAL DE VENTAS" FROM ventas INNER JOIN ventas_detalle ON ventas_detalle.id_venta = ventas.id group BY YEAR(fecha) order BY fecha ASC'
      break
    case 15:
      consulta = '(SELECT  YEAR(fecha) AS "AÑO", sum(cantidad*precio) AS "TOTAL", nombre AS "NOMBRE", sum(cantidad) AS "CANTIDAD" FROM ventas INNER JOIN ventas_detalle ON ventas_detalle.id_venta = ventas.id group BY YEAR(fecha) order BY fecha ASC );'
      break
    case 16:
      consulta = 'SELECT nombre, sum(cantidad) FROM ventas_detalles GROUP BY nombre ORDER BY sum(cantidad) asc LIMIT 1;'
      break
    case 17:
      consulta = 'SELECT nombre, sum(cantidad) FROM ventas_detalles GROUP BY nombre ORDER BY sum(cantidad) DESC LIMIT 1;'
      break
    default:
      break
  }

  return new Promise((resolve, reject) => {
    con.connect()
    con.query(consulta, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

async function reporte (query) {
  try {
    const results = await queryProductos(query)
    console.log(results)
  } catch (error) {
    console.error(error)
  } finally {
    con.end()
  }
}

module.exports = {
  reporte
}
