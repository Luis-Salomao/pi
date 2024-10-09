let balance = 48; 
let profit = 0;   

function updateBalance(amount) {
  balance += amount; 
  document.getElementById('user-balance').innerText = `Saldo: R$${balance.toFixed(2)}`;
}

function playGame() {
  if (balance >= 12) {
    updateBalance(-12); 
    getBeer();          
  } else {
    alert("Saldo insuficiente para continuar jogando.");
  }
}

function calculateProfit(beerPrice) {
  const profitPerGame = beerPrice - 12; 
  profit += profitPerGame;              
  updateProfitDisplay();                 
  console.log(`Lucro/prejuízo atual: R$${profit.toFixed(2)}`);
}

async function getBeer() {
  const beerContainer = document.getElementById('beer-container');
  const beerInfo = document.querySelector('.beer-info'); 

  beerInfo.classList.remove('visible');
  beerInfo.classList.add('fade');

  setTimeout(async () => {
    try {
      const response = await fetch('https://api.sampleapis.com/beers/ale');
      const data = await response.json();
      const randomBeer = data[Math.floor(Math.random() * data.length)];

      const beerName = randomBeer.name;
      const beerPrice = parseFloat(randomBeer.price.replace('$', ''));
      const beerRating = randomBeer.rating.average || 'N/A';
      const beerReviews = randomBeer.rating.reviews || 0;
      const beerImage = randomBeer.image || 'https://via.placeholder.com/200';

      document.getElementById('beer-name').innerText = `Nome: ${beerName}`;
      document.getElementById('beer-price').innerText = `Preço: R$${beerPrice.toFixed(2)}`;
      document.getElementById('beer-rating').innerText = `Avaliação: ${beerRating} (${beerReviews} avaliações)`;
      document.getElementById('beer-image').src = beerImage;

      beerInfo.classList.remove('fade');
      beerInfo.classList.add('visible');

      calculateProfit(beerPrice);
    } catch (error) {
      document.getElementById('beer-name').innerText = 'Erro ao carregar a cerveja!';
      document.getElementById('beer-price').innerText = '';
      document.getElementById('beer-rating').innerText = '';
      document.getElementById('beer-image').src = '';
      console.error(error);
    }
  }, 1000);
}

function updateProfitDisplay() {
  document.getElementById('profit').innerText = `Lucro/Prejuízo Total: R$${profit.toFixed(2)}`;
}

document.getElementById('release-beer-button').addEventListener('click', () => {
  playGame(); 
});

window.onload = function() {
  const userName = localStorage.getItem('userName');
  const entryTime = localStorage.getItem('entryTime');
  const userBalance = localStorage.getItem('userBalance');

  document.getElementById('user-name').innerText = userName;
  document.getElementById('time-left').innerText = `Você entrou às ${entryTime}`;
  document.getElementById('user-balance').innerText = `Saldo: R$${parseFloat(userBalance).toFixed(2)}`;

  updateBalance(0); 
  updateProfitDisplay(); 
};

document.addEventListener('DOMContentLoaded', function () {
  const userInfo = document.getElementById('user-info');
  userInfo.classList.add('fade-in');
  setTimeout(() => {
    userInfo.classList.add('show');
  }, 100); 

  const modal = document.getElementById("myModal");
  const btnDepositar = document.querySelector(".tit2 button");
  const span = document.getElementsByClassName("close")[0];

  btnDepositar.onclick = function () {
    modal.style.display = "block";
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});
