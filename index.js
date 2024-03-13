function init() {

    const flags = location.search.substring(1).split('&').filter(Boolean).reduce((acc, value) => {
        const [key, val = 'true'] = value.split('=');
        acc[key] = val;
        return acc;
    }, {});

    const body = document.getElementsByTagName('body')[0];
    const container = document.getElementById('container');
    const imgContainer = document.getElementById('imgContainer');
    const cardFront = document.getElementById('cardFront');
    const cardSingular = document.getElementById('cardSingular');
    const cardPlural = document.getElementById('cardPlural');
    const next = document.getElementById('next');
    const previous = document.getElementById('previous');
    const counter = document.getElementById('counter');
    const list = document.getElementById('list');
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsContainer = document.getElementById('settingsContainer');
    const imagesToggle = document.getElementById('imagesToggle');
    const flipToggle = document.getElementById('flipToggle');
    const listToggle = document.getElementById('listToggle');
    const namesToggle = document.getElementById('namesToggle');
    const verbsToggle = document.getElementById('verbsToggle');

    const articles = {
        m: 'der',
        f: 'die',
        n: 'das'
    };

    const verbRegExp = /\[([^\]]*)\]/g;

    let currentWords = [];
    let currentOrderedWords = null;
    let currentWordIndex = 0;
    let totalWords = 0;

    let settingsOpened = false;
    let disabledImages = localStorage.getItem('disabledImages') === 'true';
    let prevDisabledImages = disabledImages;
    let disabledFlip = localStorage.getItem('disabledFlip') === 'true';
    let prevDisabledFlip = disabledFlip;
    let enabledList = localStorage.getItem('enabledList') === 'true';
    let prevEnabledList = enabledList;
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
        body.classList.add('bookColors');
    }

    if (disabledImages) {
        imgContainer.classList.add('disabledImages');
        imagesToggle.classList.add('off');
    }

    if (disabledFlip) {
        container.classList.add('disabledFlip');
        flipToggle.classList.add('off');
    }

    if (enabledList) {
        body.classList.add('enabledList');
        imagesToggle.classList.add('disabled');
        flipToggle.classList.add('disabled');
    } else {
        listToggle.classList.add('off');
    }

    if (disabledNames) {
        namesToggle.classList.add('off');
    }

    if (disabledVerbs) {
        verbsToggle.classList.add('off');
    }

    const revealCard = () => {
        container.classList.add('reveal');
    };

    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    const verbReplaceText = (_, p1) => `<span class='verbVocalChange'>${p1}</span>`;

    const verbReplaceSort = (_, p1) => p1;

    const getVerbText = (verb) => verb.value.replace(verbRegExp, verbReplaceText);

    const getListText = (word) => {
        if (!word.genre) return getVerbText(word);
        let text;
        if (word.singular) text = `${articles[word.genre]} ${word.singular},`;
        else text = '-,';
        if (word.plural) text += ` die ${word.plural}`;
        else text += ' -';
        return text;
    };

    const createList = () => {
        if (currentOrderedWords) {
            return;
        }
        currentOrderedWords = currentWords.toSorted((a, b) => {
            const first = a.genre ? (a.singular || a.plural).toLowerCase() : a.value.replace(verbRegExp, verbReplaceSort);
            const second = b.genre ? (b.singular || b.plural).toLowerCase() : b.value.replace(verbRegExp, verbReplaceSort);
            if (first < second) return -1;
            if (first > second) return 1;
            return 0;
        });
        const container = document.createElement('table');
        currentOrderedWords.forEach((word) => {
            const raw = document.createElement('tr');
            const translation = document.createElement('td');
            translation.className = 'translation';
            translation.innerText = word.translation;
            raw.appendChild(translation);
            const value = document.createElement('td');
            value.className = `value${word.genre ? ` genre_${word.genre}` : ' verb'}${word.separable ? ' separable' : ''}`;
            value.innerHTML = getListText(word);
            raw.appendChild(value);
            container.appendChild(raw);
        });
        list.replaceChildren(container);
    };

    const filterLessons = ({ lesson }) => {
        if (typeof lesson === 'number') {
            return !disabledLessons.includes(lesson);
        }
        return lesson.some((currentLesson) => !disabledLessons.includes(currentLesson));
    };

    const initializeCards = () => {
        currentWordIndex = 0;
        if (!disabledNames) {
            currentWords = names.filter(filterLessons);
        } else {
            currentWords = [];
        }
        if (!disabledVerbs) {
            currentWords = [...currentWords, ...verbs.filter(filterLessons)];
        }
        currentWords = shuffle(currentWords);
        totalWords = currentWords.length;
        previous.classList.add('disabled');
        updateCard();
        if (enabledList) {
            createList();
        }
    };

    const nextWord = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        currentWordIndex++;
        if (currentWordIndex >= totalWords) {
            initializeCards();
        } else {
            updateCard();
            previous.classList.remove('disabled');
        }
    };

    const previousWord = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (currentWordIndex > 0) {
            currentWordIndex--;
            updateCard();
            if (currentWordIndex === 0) {
                previous.classList.add('disabled');
            }
        }
    };

    const getSingularText = (word) => {
        if (!word.genre) return getVerbText(word);
        if (!word.singular) return '-,';
        return `${articles[word.genre]} ${word.singular},`;
    };

    const getPluralText = (word) => {
        if (!word.genre) return '';
        if (!word.plural) return '-';
        return `die ${word.plural}`;
    };

    const updateCard = () => {
        const currentWord = currentWords[currentWordIndex];
        if (currentWord.image) {
            imgContainer.style.backgroundImage = `url('./assets/${currentWord.image}.png')`;
            imgContainer.classList.remove('noImage');
        } else {
            imgContainer.style.backgroundImage = 'none';
            imgContainer.classList.add('noImage');
        }
        imgContainer.innerText = currentWord.translation;
        cardSingular.innerHTML = getSingularText(currentWord);
        cardPlural.innerHTML = getPluralText(currentWord);
        container.classList.remove('reveal', 'genre_f', 'genre_m', 'genre_n', 'genre_p', 'verb', 'separable');
        if (currentWord.genre) {
            container.classList.add(`genre_${currentWord.genre}`);
        } else {
            container.classList.add('verb');
            if (currentWord.separable) {
                container.classList.add('separable');
            }
        }
        counter.innerText = `${currentWordIndex + 1} / ${totalWords}`;
    };

    const toggleSettings = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (settingsOpened) {
            settingsOpened = false;
            settingsIcon.classList.remove('closeIcon');
            settingsContainer.classList.add('hidden');
            const lessonsChanged = prevDisabledLessons.length !== disabledLessons.length || disabledLessons.some(lesson => !prevDisabledLessons.includes(lesson));
            if (lessonsChanged) {
                prevDisabledLessons = [...disabledLessons];
                localStorage.setItem('disabledLessons', JSON.stringify(disabledLessons));
            }
            const namesChanged = prevDisabledNames !== disabledNames;
            if (namesChanged) {
                prevDisabledNames = disabledNames;
                localStorage.setItem('disabledNames', String(disabledNames));
            }
            const verbsChanged = prevDisabledVerbs !== disabledVerbs;
            if (verbsChanged) {
                prevDisabledVerbs = disabledVerbs;
                localStorage.setItem('disabledVerbs', String(disabledVerbs));
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
            const listChanged = prevEnabledList !== enabledList;
            if (listChanged) {
                prevEnabledList = enabledList;
                localStorage.setItem('enabledList', String(enabledList));
                if (enabledList) {
                    body.classList.add('enabledList');
                } else {
                    body.classList.remove('enabledList');
                }
            }
            if (lessonsChanged || namesChanged || verbsChanged) {
                currentOrderedWords = null;
                initializeCards();
            } else if (listChanged && enabledList) {
                currentOrderedWords = null;
                createList();
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

    const toggleList = (ev) => {
        ev?.stopPropagation();
        ev?.preventDefault();
        if (enabledList) {
            enabledList = false;
            listToggle.classList.add('off');
            imagesToggle.classList.remove('disabled');
            flipToggle.classList.remove('disabled');
        } else {
            enabledList = true;
            listToggle.classList.remove('off');
            imagesToggle.classList.add('disabled');
            flipToggle.classList.add('disabled');
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

    const gatherAllLessons = (acc, value) => {
        if (typeof value.lesson === 'number') {
            if (!acc.includes(value.lesson)) acc.push(value.lesson);
        } else {
            value.lesson.forEach((lesson) => {
                if (!acc.includes(lesson)) acc.push(lesson);
            });
        }
        return acc;
    }

    const addSettings = () => {
        const lessonsContainer = document.getElementById('lessonsContainer');
        nameLessons = names.reduce(gatherAllLessons, []);
        verbLessons = verbs.reduce(gatherAllLessons, []);
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
    next.addEventListener('click', nextWord);
    previous.addEventListener('click', previousWord);
    settingsIcon.addEventListener('click', toggleSettings);
    imagesToggle.addEventListener('click', toggleImages);
    flipToggle.addEventListener('click', toggleFlip);
    listToggle.addEventListener('click', toggleList);
    namesToggle.addEventListener('click', toggleNames);
    verbsToggle.addEventListener('click', toggleVerbs);

    addSettings();
    initializeCards();
}