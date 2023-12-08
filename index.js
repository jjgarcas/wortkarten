function init() {

    const container = document.getElementById('container');
    const imgContainer = document.getElementById('imgContainer');
    const cardFront = document.getElementById('cardFront');
    const cardSingular = document.getElementById('cardSingular');
    const cardPlural = document.getElementById('cardPlural');
    const cardNext = document.getElementById('cardNext');
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsContainer = document.getElementById('settingsContainer');

    let settingsOpened = false;
    let lessons;
    let allLessonsToggle;
    let disabledLessons = JSON.parse(localStorage.getItem('disabledLessons') || '[]');
    let prevDisabledLessons = [...disabledLessons];
    const lessonToggles = [];

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
        remainingWords = words.filter(({ lesson }) => !disabledLessons.includes(lesson));
    };

    const updateCard = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (!remainingWords?.length) initializeCards();
        const index = Math.floor(Math.random() * remainingWords.length);
        const currentWord = remainingWords.splice(index, 1)[0];
        imgContainer.style.backgroundImage = `url('./assets/${currentWord.id}.png')`;
        cardSingular.innerText = `${articles[currentWord.genre]} ${currentWord.singular}${currentWord.plural ? ',' : ''}`;
        cardPlural.innerText = currentWord.plural ? `die ${currentWord.plural}` : '';
        container.classList.remove('reveal', 'genre_f', 'genre_m', 'genre_n');
        container.classList.add(`genre_${currentWord.genre}`);
    };

    const toggleSettings = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (settingsOpened) {
            settingsOpened = false;
            settingsIcon.classList.remove('closeIcon');
            settingsContainer.classList.add('hidden');
            if (prevDisabledLessons.length !== disabledLessons.length || disabledLessons.some(lesson => !prevDisabledLessons.includes(lesson))) {
                console.log('new disabled lessons');
                prevDisabledLessons = [...disabledLessons];
                localStorage.setItem('disabledLessons', JSON.stringify(disabledLessons));
                initializeCards();
                updateCard();
            }
        } else {
            settingsOpened = true;
            settingsIcon.classList.add('closeIcon');
            settingsContainer.classList.remove('hidden');
        }
    };

    const getLessonDisabled = (lesson) => {
        if (lesson === 'all') return disabledLessons.length > 0;
        return disabledLessons.includes(lesson);
    };

    const toggleLesson = (lesson, ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        const isDisabled = getLessonDisabled(lesson);
        if (lesson === 'all') {
            if (isDisabled) {
                disabledLessons = [];
                allLessonsToggle.classList.remove('disabled');
                lessonToggles.forEach(lessonToggle => lessonToggle.classList.remove('disabled'));
            }
        } else if (isDisabled) {
            disabledLessons = disabledLessons.filter(value => value !== lesson);
            lessonToggles.find(lessonToggle => lessonToggle.id === `lesson${lesson}`).classList.remove('disabled');
            if (getLessonDisabled('all')) {
                allLessonsToggle.classList.add('disabled');
            } else {
                allLessonsToggle.classList.remove('disabled');
            }
        } else if (disabledLessons.length < lessons.length - 1) {
            disabledLessons.push(lesson);
            lessonToggles.find(lessonToggle => lessonToggle.id === `lesson${lesson}`).classList.add('disabled');
            allLessonsToggle.classList.add('disabled');
        }
    };

    const addSettings = () => {
        lessons = words.reduce((acc, value) => {
            if (!acc.includes(value.lesson)) acc.push(value.lesson);
            return acc;
        }, []);
        const container = document.createElement('div');
        container.className = 'lessonContainer';
        const lessonName = document.createElement('div');
        lessonName.className = 'lessonName';
        lessonName.innerText = 'Alle Themen';
        container.appendChild(lessonName);
        const lessonToggle = document.createElement('div');
        lessonToggle.className = `lessonToggle${getLessonDisabled('all') ? ' disabled' : ''}`;
        lessonToggle.addEventListener('click', toggleLesson.bind(null, 'all'));
        allLessonsToggle = lessonToggle;
        container.appendChild(lessonToggle);
        settingsContainer.appendChild(container);
        lessons.forEach((lesson) => {
            const container = document.createElement('div');
            container.className = 'lessonContainer';
            const lessonName = document.createElement('div');
            lessonName.className = 'lessonName';
            lessonName.innerText = `Thema ${lesson}`;
            container.appendChild(lessonName);
            const lessonToggle = document.createElement('div');
            lessonToggle.className = `lessonToggle${getLessonDisabled(lesson) ? ' disabled' : ''}`;
            lessonToggle.id = `lesson${lesson}`;
            lessonToggle.addEventListener('click', toggleLesson.bind(null, lesson));
            lessonToggles.push(lessonToggle);
            container.appendChild(lessonToggle);
            settingsContainer.appendChild(container);
        });
    };

    cardFront.addEventListener('click', revealCard);
    cardNext.addEventListener('click', updateCard);
    settingsIcon.addEventListener('click', toggleSettings);

    addSettings();
    updateCard();
}