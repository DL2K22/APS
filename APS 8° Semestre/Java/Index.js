
/* -------------------------------------------------------------------------- */
/*                                    card                                    */
/* -------------------------------------------------------------------------- */

const ul = document.querySelector('ul');
const input = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];

itemsArray.forEach(addTask);
function addTask(text){
  const li = document.createElement('li')
  li.textContent = text;
  ul.appendChild(li);
}

function add(){
  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  addTask(input.value);
  input.value = '';
}

function del(){
  localStorage.clear();
  ul.innerHTML = '';
  itemsArray = [];
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