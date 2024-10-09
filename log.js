
let loginRecords = [];


function handleLogin(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const currentTime = new Date().toLocaleString();
    const startingMoney = 48; 

    
    loginRecords.push([name, currentTime, startingMoney]);

    
    localStorage.setItem('userName', name);
    localStorage.setItem('entryTime', currentTime);
    localStorage.setItem('userBalance', startingMoney);

    
    window.location.href = "pagina-da-cerveja.html"; 
}


async function getDadJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        });
        const data = await response.json();
        const joke = data.joke;

        
        document.getElementById('dad-joke').innerText = joke;

        
        const translatedJoke = await translateText(joke, 'pt');
        document.getElementById('dad-joke-translated').innerText = translatedJoke;
    } catch (error) {
        document.getElementById('dad-joke').innerText = 'Erro ao carregar a piada!';
        document.getElementById('dad-joke-translated').innerText = '';
        console.error(error);
    }
}


async function translateText(text, targetLanguage) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`);
        const data = await response.json();
        return data.responseData.translatedText; 
    } catch (error) {
        console.error('Erro ao traduzir o texto:', error);
        return text; 
    }
}


window.onload = function() {
    getDadJoke();
    startRotation(); 
};


function startRotation() {
    const img = document.querySelector('.titulo img');
    img.classList.add('rotating'); 
}


