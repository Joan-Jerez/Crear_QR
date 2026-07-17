const inputTexto = document.getElementById('texto');
const inputTamano = document.getElementById('tamano');
const inputColor = document.getElementById('color');
const inputFondo = document.getElementById('fondo');
const btnGenerar = document.getElementById('generar');
const btnDescargar = document.getElementById('descargar');
const caja = document.getElementById('qrcode');

let qr = null;

function generarQR() {
  const texto = inputTexto.value.trim();

  if (!texto) {
    alert('Por favor escribe un texto o URL.');
    return;
  }

  caja.innerHTML = '';

  const tamano = parseInt(inputTamano.value, 10);

  qr = new QRCode(caja, {
    text: texto,
    width: tamano,
    height: tamano,
    colorDark: inputColor.value,
    colorLight: inputFondo.value,
    correctLevel: QRCode.CorrectLevel.H
  });

  btnDescargar.disabled = false;
}

function descargarQR() {
  const img = caja.querySelector('img');
  const canvas = caja.querySelector('canvas');

  const enlace = document.createElement('a');
  enlace.download = 'codigo-qr.png';

  if (img && img.src) {
    enlace.href = img.src;
  } else if (canvas) {
    enlace.href = canvas.toDataURL('image/png');
  } else {
    return;
  }

  enlace.click();
}

btnGenerar.addEventListener('click', generarQR);
btnDescargar.addEventListener('click', descargarQR);

inputTexto.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    generarQR();
  }
});
