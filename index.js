function init() {

    const flags = location.search.substring(1).split('&').filter(Boolean).reduce((acc, value) => {
        const [key, val = 'true'] = value.split('=');
        acc[key] = val;
        return acc;
    }, {});

    const container = document.getElementById('container');
    const imgContainer = document.getElementById('imgContainer');
    const cardFront = document.getElementById('cardFront');
    const cardSingular = document.getElementById('cardSingular');
    const cardPlural = document.getElementById('cardPlural');
    const cardNext = document.getElementById('cardNext');
    const counter = document.getElementById('counter');
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsContainer = document.getElementById('settingsContainer');
    const imagesToggle = document.getElementById('imagesToggle');
    const flipToggle = document.getElementById('flipToggle');
    const namesToggle = document.getElementById('namesToggle');
    const verbsToggle = document.getElementById('verbsToggle');

    let totalWords;
    let settingsOpened = false;
    let disabledImages = localStorage.getItem('disabledImages') === 'true';
    let prevDisabledImages = disabledImages;
    let disabledFlip = localStorage.getItem('disabledFlip') === 'true';
    let prevDisabledFlip = disabledFlip;
    let disabledNames = localStorage.getItem('disabledNames') === 'true';
    let prevDisabledNames = disabledNames;
    let disabledVerbs = localStorage.getItem('disabledVerbs') === 'true';
    let prevDisabledVerbs = disabledVerbs;
    let lessons, nameLessons, verbLessons;
    let allLessonsToggle;
    let disabledLessons = JSON.parse(localStorage.getItem('disabledLessons') || '[]');
    let prevDisabledLessons = [...disabledLessons];
    const lessonToggles = [];

    if (flags.bookColors === 'true') {
        container.classList.add('bookColors');
    }

    if (disabledImages) {
        imgContainer.classList.add('disabledImages');
        imagesToggle.classList.add('off');
    }

    if (disabledFlip) {
        container.classList.add('disabledFlip');
        flipToggle.classList.add('off');
    }

    if (disabledNames) {
        namesToggle.classList.add('off');
    }

    if (disabledVerbs) {
        verbsToggle.classList.add('off');
    }

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
        if (!disabledNames) {
            remainingWords = names.filter(({ lesson }) => !disabledLessons.includes(lesson));
        } else {
            remainingWords = [];
        }
        if (!disabledVerbs) {
            remainingWords = [...remainingWords, ...verbs.filter(({ lesson }) => !disabledLessons.includes(lesson))];
        }
        totalWords = remainingWords.length;
    };

    const updateCard = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (!remainingWords?.length) initializeCards();
        const index = Math.floor(Math.random() * remainingWords.length);
        const currentWord = remainingWords.splice(index, 1)[0];
        if (currentWord.image) {
            imgContainer.style.backgroundImage = `url('./assets/${currentWord.image}.png')`;
            imgContainer.classList.remove('noImage');
        } else {
            imgContainer.style.backgroundImage = 'none';
            imgContainer.classList.add('noImage');
        }
        imgContainer.innerText = currentWord.translation;
        cardSingular.innerText = currentWord.genre ? `${articles[currentWord.genre]} ${currentWord.singular}${currentWord.plural ? ',' : ''}` : currentWord.value;
        cardPlural.innerText = currentWord.plural ? `die ${currentWord.plural}` : '';
        container.classList.remove('reveal', 'genre_f', 'genre_m', 'genre_n', 'verb');
        if (currentWord.genre) {
            container.classList.add(`genre_${currentWord.genre}`);
        } else {
            container.classList.add('verb');
        }
        counter.innerText = `${totalWords - remainingWords.length} / ${totalWords}`;
    };

    const toggleSettings = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (settingsOpened) {
            settingsOpened = false;
            settingsIcon.classList.remove('closeIcon');
            settingsContainer.classList.add('hidden');
            const lessonsChanged = prevDisabledLessons.length !== disabledLessons.length || disabledLessons.some(lesson => !prevDisabledLessons.includes(lesson));
            const namesChanged = prevDisabledNames !== disabledNames;
            const verbsChanged = prevDisabledVerbs !== disabledVerbs;
            if (lessonsChanged) {
                prevDisabledLessons = [...disabledLessons];
                localStorage.setItem('disabledLessons', JSON.stringify(disabledLessons));
            }
            if (namesChanged) {
                prevDisabledNames = disabledNames;
                localStorage.setItem('disabledNames', String(disabledNames));
            }
            if (verbsChanged) {
                prevDisabledVerbs = disabledVerbs;
                localStorage.setItem('disabledVerbs', String(disabledVerbs));
            }
            if (lessonsChanged || namesChanged || verbsChanged) {
                initializeCards();
                updateCard();
            }
            if (prevDisabledImages !== disabledImages) {
                prevDisabledImages = disabledImages;
                localStorage.setItem('disabledImages', String(disabledImages));
                if (disabledImages) {
                    imgContainer.classList.add('disabledImages');
                } else {
                    imgContainer.classList.remove('disabledImages');
                }
            }
            if (prevDisabledFlip !== disabledFlip) {
                prevDisabledFlip = disabledFlip;
                localStorage.setItem('disabledFlip', String(disabledFlip));
                if (disabledFlip) {
                    container.classList.add('disabledFlip');
                } else {
                    container.classList.remove('disabledFlip');
                }
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

    const toggleImages = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (disabledImages) {
            disabledImages = false;
            imagesToggle.classList.remove('off');
        } else {
            disabledImages = true;
            imagesToggle.classList.add('off');
        }
    };

    const toggleFlip = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (disabledFlip) {
            disabledFlip = false;
            flipToggle.classList.remove('off');
        } else {
            disabledFlip = true;
            flipToggle.classList.add('off');
        }
    };

    const disableLessonsWithOnlyNames = () => {
        nameLessons.filter(nameLesson => !verbLessons.includes(nameLesson)).forEach(onlyNameLesson => {
            lessonToggles.find(lessonToggle => lessonToggle.id === `lesson${onlyNameLesson}`).classList.add('disabled');
        });
        if (disabledLessons.length >= verbLessons.length && verbLessons.every(verbLesson => disabledLessons.includes(verbLesson))) {
            const firstVerbLesson = verbLessons[0];
            lessonToggles.find(lessonToggle => lessonToggle.id === `lesson${firstVerbLesson}`).classList.remove('off');
            disabledLessons = disabledLessons.filter(value => value !== firstVerbLesson);
        }
    };

    const disableLessonsWithOnlyVerbs = () => {
        verbLessons.filter(verbLesson => !nameLessons.includes(verbLesson)).forEach(onlyVerbLesson => {
            lessonToggles.find(lessonToggle => lessonToggle.id === `lesson${onlyVerbLesson}`).classList.add('disabled');
        });
        if (disabledLessons.length >= nameLessons.length && nameLessons.every(nameLesson => disabledLessons.includes(nameLesson))) {
            const firstNameLesson = nameLessons[0];
            lessonToggles.find(lessonToggle => lessonToggle.id === `lesson${firstNameLesson}`).classList.remove('off');
            disabledLessons = disabledLessons.filter(value => value !== firstNameLesson);
        }
    };

    const toggleNames = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (disabledNames) {
            disabledNames = false;
            namesToggle.classList.remove('off');
            lessonToggles.forEach(lessonToggle => lessonToggle.classList.remove('disabled'));
        } else if(!disabledVerbs) {
            disabledNames = true;
            namesToggle.classList.add('off');
            disableLessonsWithOnlyNames();
        }
    };

    const toggleVerbs = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (disabledVerbs) {
            disabledVerbs = false;
            verbsToggle.classList.remove('off');
            lessonToggles.forEach(lessonToggle => lessonToggle.classList.remove('disabled'));
        } else if (!disabledNames) {
            disabledVerbs = true;
            verbsToggle.classList.add('off');
            disableLessonsWithOnlyVerbs();
        }
    };

    const canDisableLesson = (lesson) => {
        if (lessonToggles.find(lessonToggle => lessonToggle.id === `lesson${lesson}`).classList.contains('disabled')) {
            return true;
        }
        if (!disabledNames && !disabledVerbs) {
            return disabledLessons.length < lessons.length - 1;
        }
        if (!disabledNames) {
            return nameLessons.filter((nameLesson) => !disabledLessons.includes(nameLesson)).length > 1;
        }
        return verbLessons.filter((verbLesson) => !disabledLessons.includes(verbLesson)).length > 1;
    };

    const toggleLesson = (lesson, ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        const isDisabled = getLessonDisabled(lesson);
        if (lesson === 'all') {
            if (isDisabled) {
                disabledLessons = [];
                allLessonsToggle.classList.remove('off');
                lessonToggles.forEach(lessonToggle => lessonToggle.classList.remove('off'));
            }
        } else if (isDisabled) {
            disabledLessons = disabledLessons.filter(value => value !== lesson);
            lessonToggles.find(lessonToggle => lessonToggle.id === `lesson${lesson}`).classList.remove('off');
            if (getLessonDisabled('all')) {
                allLessonsToggle.classList.add('off');
            } else {
                allLessonsToggle.classList.remove('off');
            }
        } else if (canDisableLesson(lesson)) {
            disabledLessons.push(lesson);
            lessonToggles.find(lessonToggle => lessonToggle.id === `lesson${lesson}`).classList.add('off');
            allLessonsToggle.classList.add('off');
        }
    };

    const addSettings = () => {
        const lessonsContainer = document.getElementById('lessonsContainer');
        nameLessons = names.reduce((acc, value) => {
            if (!acc.includes(value.lesson)) acc.push(value.lesson);
            return acc;
        }, []);
        verbLessons = verbs.reduce((acc, value) => {
            if (!acc.includes(value.lesson)) acc.push(value.lesson);
            return acc;
        }, []);
        lessons = [...nameLessons, ...verbLessons].sort((a, b) => a - b).filter((value, index, array) => index === 0 || value !== array[index - 1]);

        const container = document.createElement('div');
        container.className = `toggleContainer${getLessonDisabled('all') ? ' off' : ''}`;
        container.addEventListener('click', toggleLesson.bind(null, 'all'));
        const lessonName = document.createElement('div');
        lessonName.className = 'toggleName';
        lessonName.innerText = 'Alle Themen';
        container.appendChild(lessonName);
        const lessonToggle = document.createElement('div');
        lessonToggle.className = 'toggle';
        container.appendChild(lessonToggle);
        lessonsContainer.appendChild(container);
        allLessonsToggle = container;
        lessons.forEach((lesson) => {
            const container = document.createElement('div');
            container.className = `toggleContainer${getLessonDisabled(lesson) ? ' off' : ''}`;
            container.id = `lesson${lesson}`;
            container.addEventListener('click', toggleLesson.bind(null, lesson));
            const lessonName = document.createElement('div');
            lessonName.className = 'toggleName';
            lessonName.innerText = `Thema ${lesson}`;
            container.appendChild(lessonName);
            const lessonToggle = document.createElement('div');
            lessonToggle.className = 'toggle';
            container.appendChild(lessonToggle);
            lessonsContainer.appendChild(container);
            lessonToggles.push(container);
        });

        if (disabledNames) {
            disableLessonsWithOnlyNames();
            prevDisabledLessons = disabledLessons;
        }
        if (disabledVerbs) {
            disableLessonsWithOnlyVerbs();
            prevDisabledLessons = disabledLessons;
        }
    };

    cardFront.addEventListener('click', revealCard);
    cardNext.addEventListener('click', updateCard);
    settingsIcon.addEventListener('click', toggleSettings);
    imagesToggle.addEventListener('click', toggleImages);
    flipToggle.addEventListener('click', toggleFlip);
    namesToggle.addEventListener('click', toggleNames);
    verbsToggle.addEventListener('click', toggleVerbs);

    addSettings();
    updateCard();
}