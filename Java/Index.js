
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



const predefinedColors = ['#FF5733', '#FFC300', '#36A2EB', '#33FF57', '#B136EB'];

// Mantém o registro das cores usadas
const usedColors = [];

function getRandomColor() {
  let availableColors = predefinedColors.filter(color => !usedColors.includes(color));
  if (availableColors.length === 0) {
    usedColors.length = 0; // Reseta o array de cores usadas quando todas foram usadas
    availableColors = predefinedColors.slice();
  }
  
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  const selectedColor = availableColors[randomIndex];
  usedColors.push(selectedColor); // Adiciona a cor usada ao registro
  return selectedColor;
}



function exibirGrafico() {
  const numerosSalvos = JSON.parse(localStorage.getItem('numeros'));
  if (numerosSalvos) {
    const numerosArray = Object.values(numerosSalvos).map(Number);

    const maxIndex = numerosArray.indexOf(Math.max(...numerosArray)); // Índice do maior número

    const total = numerosArray.reduce((acc, num) => acc + num, 0);

    ctx.clearRect(0, 0, graficoCanvas.width, graficoCanvas.height);

    const nomesNumeros = Object.keys(numerosSalvos);

    const width = -5;
    const height = 5;

    let startAngle = 0;
    for (let i = 0; i < numerosArray.length; i++) {
      const sliceAngle = (numerosArray[i] / total) * (2 * Math.PI);
      const endAngle = startAngle + sliceAngle;
      const middleAngle = startAngle + sliceAngle / 2;

      const color = getRandomColor();
      ctx.fillStyle = color;
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

      // Calcular a posição para mostrar o maior número dentro do pedaço
      const textX = Math.cos(middleAngle) * (graficoCanvas.height / 4 - width) + graficoCanvas.width / 2;
      const textY = Math.sin(middleAngle) * (graficoCanvas.height / 4 - height) + graficoCanvas.height / 2;

      let label = nomesNumeros[i];
      if (numerosArray.every(num => num === numerosArray[0])) {
        label = 'Iguais';
      }
      ctx.fillStyle = '#000';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.textTransform = 'uppercase';
      ctx.textBaseline = 'middle';
      ctx.fillText(label.toUpperCase(), textX, textY);

      startAngle = endAngle;
    }
  }
  else {
    ctx.clearRect(0, 0, graficoCanvas.width, graficoCanvas.height); // Limpa o canvas se não houver números salvos
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

const scrollButton = document.getElementById("scrollButton");

// Função para rolar suavemente para a próxima sessão
scrollButton.addEventListener("click", () => {
  const contentSection = document.querySelector(".second");
  contentSection.scrollIntoView({ behavior: "smooth" });
});


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













