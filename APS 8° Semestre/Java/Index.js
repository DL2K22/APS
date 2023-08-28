
/* -------------------------------------------------------------------------- */
/*                                    card                                    */
/* -------------------------------------------------------------------------- */

const numerosSalvosList = document.querySelector('.to-do-list');
const graficoCanvas = document.getElementById('chartCanvas');
const ctx = graficoCanvas.getContext('2d');

function add() {
  const numeros = {
    'numero 1': parseFloat(document.getElementById('numero1').value),
    'numero 2': parseFloat(document.getElementById('numero2').value),
    'numero 3': parseFloat(document.getElementById('numero3').value),
    'numero 4': parseFloat(document.getElementById('numero4').value),
  };
  localStorage.setItem('numeros', JSON.stringify(numeros));
  exibirNumerosSalvos();
  exibirGrafico();
  alert('Números adicionados com sucesso!');
}

function del() {
  localStorage.removeItem('numeros');
  exibirNumerosSalvos();
  exibirGrafico();
  alert('Números apagados com sucesso!');
}

function exibirNumerosSalvos() {
  numerosSalvosList.innerHTML = '';
  const numerosSalvos = JSON.parse(localStorage.getItem('numeros'));
  if (numerosSalvos) {
    for (const key in numerosSalvos) {
      const li = document.createElement('li');
      li.textContent = `${key}: ${numerosSalvos[key]}`;
      numerosSalvosList.appendChild(li);
    }
  } else {
    numerosSalvosList.innerHTML = '<li>Nenhum número salvo.</li>';
  }
}
exibirNumerosSalvos();

function exibirGrafico() {
  const numerosSalvos = JSON.parse(localStorage.getItem('numeros'));
  if (numerosSalvos) {
    const numerosArray = Object.values(numerosSalvos).map(Number);

    const total = numerosArray.reduce((acc, num) => acc + num, 0);

    ctx.clearRect(0, 0, graficoCanvas.width, graficoCanvas.height);

    let startAngle = 0;
    for (let i = 0; i < numerosArray.length; i++) {
      const sliceAngle = (numerosArray[i] / total) * (2 * Math.PI);
      const endAngle = startAngle + sliceAngle;

      ctx.fillStyle = getRandomColor(); // Define uma cor aleatória para cada fatia
      ctx.beginPath();
      ctx.moveTo(graficoCanvas.width / 2, graficoCanvas.height / 2);
      ctx.arc(
        graficoCanvas.width / 2,
        graficoCanvas.height / 2,
        graficoCanvas.height / 2,
        startAngle,
        endAngle
      );
      ctx.lineTo(graficoCanvas.width / 2, graficoCanvas.height / 2);
      ctx.fill();

      startAngle = endAngle;
    }
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


/* -------------------------------------------------------------------------- */
/*                                    SITE                                    */
/* -------------------------------------------------------------------------- */
window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


const ativar_cards = document.querySelectorAll(".dots");
const ativado = document.querySelector(".wrap");
let isRunning = false;

ativar_cards.forEach(ativar_card => {
  ativar_card.addEventListener('click', () => {
    if(isRunning){
      const wrap = ativar_card.closest('.wrap');
      wrap.classList.remove('wrap-ativado');
      isRunning = false;
      console.log('adad');
    } else {
      const wrap = ativar_card.closest('.wrap');
      wrap.classList.add('wrap-ativado');
      isRunning = true;
      console.log('adadsssssss');
    }
  });
});