let timeframe = 'weekly'; //valor padrão
const container = document.querySelector('.container');
let regularCards;

// 1. Inicializar menu
const menu = document.querySelectorAll('.menu.link');

menu.forEach(element => {
    element.addEventListener('click', menuOnClick);
});

// 2.Obter Dados de JSON & Criar Cartões
let data = {};

fetch('.js/data.json')
    .then(resp => resp.json())
    .then(jsonData => {
        
        //Criar Cartões
        jsonData.forEach(element => {
            container.insertAdjacentHTML('beforeend',
                createRegularCard(element, timeframe));
        });

        //Converter array para dict
        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        });

        //Eu quero ter referências para os Cards criados
        regularCards = document.querySelectorAll('regular-card');
    });

    // -------- Funções

    function menuOnClick(event){
        menu.forEach(element => {
            element.classList.remove('menu-active');
        });
        event.target.classList.add('menu-active');
        timeframe = event.target.innerText.toLowerCase();

        updateCards(timeframe);
    }

    function updateCards(timeframe){
        regularCards.forEach(card => {
            updateCards(card, timeframe);
        });
    }

    function updateCard(card, timeframe) {
        const title = card.querySelector('.title').innerText;
        const current = data[title][timeframe]['current'];
        const previous = data[title][titleframe]['previous'];

        const timeframeMsg = {
            'diariamente': 'Ontem',
            'semanalmente': 'Semana Passada',
            'mensalmente': 'Mês Passado'
        };

        const hoursElement = card.querySelector('.hours');
        hoursElement.innerText = `${current}hrs`;
        const msgElement = card.querySelector('.description');
        msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
    }

    function createRegularCard(element, timeframe) {
        let title = element['title'];
        let current = element['timeframes'][timeframe]['current'];
        let previous = element['timeframes'][timeframe]['previous'];
    
        const timeframeMsg = {
            'diariamente': 'Ontem',
            'semanalmente': 'Semana Passada',
            'mensalmente': 'Mês Passado'
        };
    
        return `
    <div class="regular-card ${title.toLowerCase().replace(/\s/g, '')}">
        <div class="property-card">
            <div class="row">
                <div class="title">${title}</div>
                <div class="points">
                    <div class="point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                </div>
            </div>
    
            <div class="row-2">
                <div class="hours">${current}hrs</div>
                <div class="description">${timeframeMsg[timeframe]} - ${previous}hrs</div>
            </div>
        </div>
    </div>`
}