function init() {

    const container = document.getElementById('container');
    const imgContainer = document.getElementById('imgContainer');
    const cardFront = document.getElementById('cardFront');
    const cardSingular = document.getElementById('cardSingular');
    const cardPlural = document.getElementById('cardPlural');
    const cardNext = document.getElementById('cardNext');

    const articles = {
        m: 'der',
        f: 'die',
        n: 'das'
    };

    let remainingWords;

    const revealCard = () => {
        container.classList.add('reveal');
    };

    const initializeCards = () => {
        remainingWords = [...words];
    };

    const updateCard = (ev) => {
        ev?.stopPropagation();
        if (!remainingWords?.length) initializeCards();
        const index = Math.floor(Math.random() * remainingWords.length);
        const currentWord = remainingWords.splice(index, 1)[0];
        imgContainer.style.backgroundImage = `url('./assets/${currentWord.id}.png')`;
        cardSingular.innerText = `${articles[currentWord.genre]} ${currentWord.singular}${currentWord.plural ? ',' : ''}`;
        cardPlural.innerText = currentWord.plural ? `die ${currentWord.plural}` : '';
        container.classList.remove('reveal', 'genre_f', 'genre_m', 'genre_n');
        container.classList.add(`genre_${currentWord.genre}`);
    };

    cardFront.addEventListener('click', revealCard);
    cardNext.addEventListener('click', updateCard);

    updateCard();
}