
/* -------------------------------------------------------------------------- */
/*                                    card                                    */
/* -------------------------------------------------------------------------- */

const numerosSalvosList = document.querySelector('.to-do-list');
const graficoCanvas = document.getElementById('chartCanvas');
const ctx = graficoCanvas.getContext('2d');

function add() {
  const numeros = {
    'USO DE ENERGIA': parseFloat(document.getElementById('numero1').value),
    'USO DE ÁGUA': parseFloat(document.getElementById('numero2').value),
    'USO DE RECICLAGEM': parseFloat(document.getElementById('numero3').value),
    'USO DE TRANSPORTE': parseFloat(document.getElementById('numero4').value),
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



function getRandomGreenColor() {
  const hue = Math.floor(Math.random() * 80) + 80; // Gerar tons de verde (80-140)
  const saturation = Math.floor(Math.random() * 10) + 20; // Saturação entre 60 e 80
  const lightness = Math.floor(Math.random() * 40) + 40; // Luminosidade entre 40 e 60
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function exibirGrafico() {
  const numerosSalvos = JSON.parse(localStorage.getItem('numeros'));
  if (numerosSalvos) {
    const numerosArray = Object.values(numerosSalvos).map(Number);

    const total = numerosArray.reduce((acc, num) => acc + num, 0);

    ctx.clearRect(0, 0, graficoCanvas.width, graficoCanvas.height);

    const textWidth = -10;
    const textHeight = 5;

    let startAngle = 0;
    for (let i = 0; i < numerosArray.length; i++) {
      const sliceAngle = (numerosArray[i] / total) * (2 * Math.PI);
      const endAngle = startAngle + sliceAngle;
      const middleAngle = startAngle + sliceAngle / 2;

      ctx.fillStyle = getRandomGreenColor();
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

      // Calcular a posição para mostrar a porcentagem dentro do pedaço
      const textX = Math.cos(middleAngle) * (graficoCanvas.height / 4 - textWidth) + graficoCanvas.width / 2;
      const textY = Math.sin(middleAngle) * (graficoCanvas.height / 4 - textHeight) + graficoCanvas.height / 2;

      const percentage = ((numerosArray[i] / total) * 100).toFixed(1);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${percentage}%`, textX, textY);

      startAngle = endAngle;
    }
  }
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

ativar_cards.forEach(ativar_card => {
  ativar_card.addEventListener('click', () => {
    const wrap = ativar_card.closest('.wrap');
    wrap.classList.toggle('wrap-ativado');
  });
});


window.addEventListener("scroll", () => {
  const FirstSection = document.querySelector(".first");
  const SecondSection = document.querySelector(".second");
  const ThirdSection = document.querySelector(".third");
  //const QuadSection = document.querySelector(".Quad");
  const scrollPosition = window.scrollY;

  // Reduz a opacidade do logotipo à medida que a página é rolada
  FirstSection.style.opacity = 1 - scrollPosition / 500;
});









const lembrete = document.querySelector('.lembrete');
const input = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];

itemsArray.forEach(addTask);

function addTask(text){
  const li = document.createElement('li')
  li.textContent = text;
  lembrete.appendChild(li);
}

function addlembrete(){
  const SearchBox = document.querySelectorAll('input');
  SearchBox.forEach(function(searchBox) {
    const width = searchBox.offsetWidth;
    if (width > 100) {
      itemsArray.push(input.value);
      localStorage.setItem('items', JSON.stringify(itemsArray));
      addTask(input.value);
      input.value = '';
    } else {
      console.log("Item não atende ao critério de distância.");
    }
  });
};

function dellembrete(){
  localStorage.clear();
  lembrete.innerHTML = '';
  itemsArray = [];
}













