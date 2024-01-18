const verbs = [
    { value: 'hören', translation: 'oir', lesson: 1 },
    { value: 'lesen', translation: 'leer', lesson: 1 },
    { value: 'sprechen', translation: 'hablar', lesson: 1 },
    { value: 'kommen', translation: 'venir', lesson: 1 },
    { value: 'schreiben', translation: 'escribir', lesson: 1 },
    { value: 'heißen', translation: 'llamarse', lesson: 1 },
    { value: 'sein', translation: 'ser', lesson: 1 },
    { value: 'markieren', translation: 'marcar', lesson: 1 },
    { value: 'kennen', translation: 'conocer', lesson: 1 },
    { value: 'zeigen', translation: 'mostrar', lesson: 1 },
    { value: 'passen', translation: 'caber', lesson: 1 },
    { value: 'ergänzen', translation: 'completar', lesson: 1 },
    { value: 'antworten', translation: 'contestar', lesson: 1 },
    { value: 'wohnen', translation: 'vivir', lesson: 1 },
    { value: 'variieren', translation: 'variar', lesson: 1 },
    { value: 'gehen', translation: 'ir', lesson: 1 },
    { value: 'fragen', translation: 'preguntar', lesson: 1 },
    { value: 'mögen', translation: 'gustar', lesson: 1 },
    { value: 'kreuzen', translation: 'cruzar', lesson: 1 },
    { value: 'arbeiten', translation: 'trabajar', lesson: 1 },
    { value: 'notieren', translation: 'anotar', lesson: 1 },
    { value: 'stellen', translation: 'colocar', lesson: 1 },
    { value: 'hängen', translation: 'colgar', lesson: 1 },
    { value: 'singen', translation: 'cantar', lesson: 1 },
    { value: 'buchstabieren', translation: 'deletrear', lesson: 1 },
    { value: 'machen', translation: 'hacer', lesson: 2 },
    { value: 'ordnen', translation: 'ordenar', lesson: 2 },
    { value: 'tauschen', translation: 'cambiar', lesson: 2 },
    { value: 'ziehen', translation: 'tirar', lesson: 2 },
    { value: 'suchen', translation: 'buscar', lesson: 2 },
    { value: 'wählen', translation: 'elegir', lesson: 2 },
    { value: 'bleiben', translation: 'quedarse', lesson: 2 },
    { value: 'sagen', translation: 'decir', lesson: 2 },
    { value: 'kleben', translation: 'pegar', lesson: 3 },
    { value: 'setzen', translation: 'poner', lesson: 3 },
    { value: 'zählen', translation: 'contar', lesson: 3 },
    { value: 'sehen', translation: 'ver', lesson: 3 },
    { value: 'fühlen', translation: 'sentir', lesson: 3 },
    { value: 'bringen', translation: 'traer', lesson: 3 },
    { value: 'berichten', translation: 'informar', lesson: 4 },
    { value: 'kaufen', translation: 'comprar', lesson: 4 },
    { value: 'brauchen', translation: 'necesitar', lesson: 4 },
    { value: 'unterstreichen', translation: 'subrayar', lesson: 4 },
    { value: 'denken', translation: 'pensar', lesson: 4 },
    { value: 'helfen', translation: 'ayudar', lesson: 4 },
    { value: 'glauben', translation: 'creer', lesson: 4 },
    { value: 'überprüfen', translation: 'revisar', lesson: 4 },
    { value: 'kosten', translation: 'costar', lesson: 4 },
    { value: 'haben', translation: 'tener', lesson: 4 },
    { value: 'raten', translation: 'recomendar', lesson: 4 },
    { value: 'spielen', translation: 'jugar', lesson: 4 },
    { value: 'finden', translation: 'encontrar', lesson: 4 },
    { value: 'besuchen', translation: 'visitar', lesson: 4 },
    { value: 'beschreiben', translation: 'describir', lesson: 4 },
    { value: 'bekommen', translation: 'recibir', lesson: 4 },
    { value: 'tanzen', translation: 'bailar', lesson: 5 },
    { value: 'wandern', translation: 'hacer senderismo', lesson: 5 },
    { value: 'fotografieren', translation: 'fotografiar', lesson: 5 },
    { value: 'fahren', translation: 'ir en (medio de transporte)', lesson: 5 },
    { value: 'kochen', translation: 'cocinar', lesson: 5 },
    { value: 'treffen', translation: 'quedar con', lesson: 5 },
    { value: 'schwimmen', translation: 'nadar', lesson: 5 },
    { value: 'laufen', translation: 'correr', lesson: 5 },
    { value: 'erzählen', translation: 'contar', lesson: 5 },
    { value: 'treiben', translation: 'practicar (un deporte)', lesson: 5 },
    { value: 'aufstehen', translation: 'levantarse', lesson: 5 },
    { value: 'geben', translation: 'dar', lesson: 5 },
    { value: 'schlafen', translation: 'dormir', lesson: 5 },
    { value: 'waschen', translation: 'lavar', lesson: 5 },
    { value: 'essen', translation: 'comer', lesson: 5 },
    { value: 'malen', translation: 'pintar', lesson: 5 },
    { value: 'fernsehen', translation: 'ver la televisión', lesson: 5 },
    { value: 'schauen', translation: 'mirar', lesson: 5 },
    { value: 'feiern', translation: 'celebrar', lesson: 5 },
    { value: 'surfen', translation: 'surfear / navegar', lesson: 5 },
    { value: 'benutzen', translation: 'utilizar', lesson: 5 },
    { value: 'sammeln', translation: 'recoger / recaudar', lesson: 5 },
    { value: 'einladen', translation: 'invitar', lesson: 5 },
    { value: 'aufräumen', translation: 'ordenar', lesson: 5 }
];