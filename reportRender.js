const hola = document.getElementById('hola')
const bntnHola = document.getElementById('generarReporte')

bntnHola.addEventListener('click', () => {
  hola.innerHTML += 'HOLA'
})
