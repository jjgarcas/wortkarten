const words = [
    { genre: 'f', singular: 'Flasche', plural: 'Flaschen', id: 'flasche', lesson: 3 },
    { genre: 'm', singular: 'Kuli', plural: 'Kulis', id: 'kuli', lesson: 3 },
    { genre: 'n', singular: 'Handy', plural: 'Handys', id: 'handy', lesson: 3 },
    { genre: 'm', singular: 'Radiergummi', plural: 'Radiergummis', id: 'radiergummi', lesson: 3 },
    { genre: 'm', singular: 'Bleistift', plural: 'Bleistifte', id: 'bleistift', lesson: 3 },
    { genre: 'n', singular: 'Buch', plural: 'Bücher', id: 'buch', lesson: 3 },
    { genre: 'm', singular: 'Stuhl', plural: 'Stühle', id: 'stuhl', lesson: 3 },
    { genre: 'n', singular: 'Tablet', plural: 'Tablets', id: 'tablet', lesson: 3 },
    { genre: 'm', singular: 'Tisch', plural: 'Tische', id: 'tisch', lesson: 3 },
    { genre: 'n', singular: 'Fenster', plural: 'Fenster', id: 'fenster', lesson: 3 },
    { genre: 'm', singular: 'Papierkorb', plural: 'Papierkörbe', id: 'papierkorb', lesson: 3 },
    { genre: 'f', singular: 'Tasche', plural: 'Taschen', id: 'tasche', lesson: 3 },
    { genre: 'n', singular: 'Heft', plural: 'Hefte', id: 'heft', lesson: 3 },
    { genre: 'f', singular: 'Tasse', plural: 'Tassen', id: 'tasse', lesson: 3 },
    { genre: 'f', singular: 'Tafel', plural: 'Tafeln', id: 'tafel', lesson: 3 },
    { genre: 'f', singular: 'Lampe', plural: 'Lampen', id: 'lampe', lesson: 3 },
    { genre: 'f', singular: 'Jacke', plural: 'Jacken', id: 'jacke', lesson: 3 },
    { genre: 'f', singular: 'Tür', plural: 'Türen', id: 'tur', lesson: 3 },
    { genre: 'm', singular: 'Kursraum', plural: 'Kursräume', id: 'kursraum', lesson: 3 },
    { genre: 'f', singular: 'Wand', plural: 'Wände', id: 'wand', lesson: 3 },
    { genre: 'm', singular: 'Boden', plural: 'Böden', id: 'boden', lesson: 3 },
    { genre: 'f', singular: 'Uhr', plural: 'Uhren', id: 'uhr', lesson: 3 },
    { genre: 'f', singular: 'Brille', plural: 'Brillen', id: 'brille', lesson: 3 },
    { genre: 'm', singular: 'Zettel', plural: 'Zettel', id: 'zettel', lesson: 3 },
    { genre: 'f', singular: 'Zeitung', plural: 'Zeitungen', id: 'zeitung', lesson: 3 },
    { genre: 'n', singular: 'Bett', plural: 'Betten', id: 'bett', lesson: 3 },
    { genre: 'n', singular: 'Flugzeug', plural: 'Flugzeuge', id: 'flugzeug', lesson: 3 },
    { genre: 'n', singular: 'Kino', plural: 'Kinos', id: 'kino', lesson: 3 },
    { genre: 'm', singular: 'Ball', plural: 'Bälle', id: 'ball', lesson: 3 },
    { genre: 'f', singular: 'Maus', plural: 'Mäuse', id: 'maus', lesson: 3 },
    { genre: 'n', singular: 'Auto', plural: 'Autos', id: 'auto', lesson: 3 },
    { genre: 'f', singular: 'Tochter', plural: 'Töchter', id: 'tochter', lesson: 3 },
    { genre: 'm', singular: 'Apfel', plural: 'Äpfel', id: 'apfel', lesson: 3 },
    { genre: 'n', singular: 'Bild', plural: 'Bilder', id: 'bild', lesson: 3 },
    { genre: 'm', singular: 'Schrank', plural: 'Schränke', id: 'schrank', lesson: 3 },
    { genre: 'n', singular: 'Motorrad', plural: 'Motorräder', id: 'motorrad', lesson: 3 },
    { genre: 'm', singular: 'Sohn', plural: 'Söhne', id: 'sohn', lesson: 3 },
    { genre: 'm', singular: 'Monat', plural: 'Monate', id: 'monat', lesson: 3 },
    { genre: 'm', singular: 'Salat', plural: 'Salate', id: 'salat', lesson: 3 },
    { genre: 'n', singular: 'Glas', plural: 'Gläser', id: 'glas', lesson: 3 },
    { genre: 'f', singular: 'Rechnung', plural: 'Rechnungen', id: 'rechnung', lesson: 3 },
    { genre: 'f', singular: 'Zahl', plural: 'Zahlen', id: 'zahl', lesson: 3 },
    { genre: 'f', singular: 'Süßigkeit', plural: 'Süßigkeiten', id: 'sussigkeit', lesson: 3 },
    { genre: 'n', singular: 'Mäppchen', plural: 'Mäppchen', id: 'mappchen', lesson: 3 },
    { genre: 'n', singular: 'Taschentuch', plural: 'Taschentücher', id: 'taschentuch', lesson: 3 },
    { genre: 'm', singular: 'Lutscher', plural: 'Lutscher', id: 'lutscher', lesson: 3 },
    { genre: 'm', singular: 'Rucksack', plural: 'Rucksäcke', id: 'rucksack', lesson: 3 },
    { genre: 'm', singular: 'Computer', plural: 'Computer', id: 'computer', lesson: 3 },
    { genre: 'm', singular: 'Laptop', plural: 'Laptops', id: 'laptop', lesson: 3 },
    { genre: 'm', singular: 'Spitzer', plural: 'Spitzer', id: 'spitzer', lesson: 3 },
    { genre: 'm', singular: 'Kopfhörer', plural: 'Kopfhörer', id: 'kopfhorer', lesson: 3 },
    { genre: 'f', singular: 'Geige', plural: 'Geigen', id: 'geige', lesson: 3 },
    { genre: 'm', singular: 'Füller', plural: 'Füller', id: 'fuller', lesson: 3 },
    { genre: 'f', singular: 'Stadt', plural: 'Städte', id: 'stadt', lesson: 3 },
    { genre: 'f', singular: 'Pizza', plural: 'Pizzen', id: 'pizza', lesson: 3 },
    { genre: 'm', singular: 'Schuh', plural: 'Schuhe', id: 'schuh', lesson: 4 },
    { genre: 'n', singular: 'Ladekabel', plural: 'Ladekabel', id: 'ladekabel', lesson: 4 },
    { genre: 'm', singular: 'USB-Stick', plural: 'USB-Sticks', id: 'usb-stick', lesson: 4 },
    { genre: 'm', singular: 'Hut', plural: 'Hüte', id: 'hut', lesson: 4 },
    { genre: 'n', singular: 'Kleid', plural: 'Kleider', id: 'kleid', lesson: 4 },
    { genre: 'm', singular: 'Lippenstift', plural: 'Lippenstifte', id: 'lippenstift', lesson: 4 },
    { genre: 'f', singular: 'Sonnenbrille', plural: 'Sonnenbrillen', id: 'sonnenbrille', lesson: 4 },
    { genre: 'f', singular: 'Batterie', plural: 'Batterien', id: 'batterie', lesson: 4 },
    { genre: 'f', singular: 'Handyhülle', plural: 'Handyhüllen', id: 'handyhulle', lesson: 4 },
    { genre: 'f', singular: 'Hose', plural: 'Hosen', id: 'hose', lesson: 4 },
    { genre: 'f', singular: 'Kette', plural: 'Ketten', id: 'kette', lesson: 4 },
    { genre: 'm', singular: 'Ring', plural: 'Ringe', id: 'ring', lesson: 4 },
    { genre: 'm', singular: 'Koffer', plural: 'Koffer', id: 'koffer', lesson: 4 },
    { genre: 'n', singular: 'Spielzeug', plural: 'Spielzeuge', id: 'spielzeug', lesson: 4 },
    { genre: 'm', singular: 'Mantel', plural: 'Mäntel', id: 'mantel', lesson: 4 },
    { genre: 'm', singular: 'Pullover', plural: 'Pullover', id: 'pullover', lesson: 4 },
    { genre: 'n', singular: 'T-Shirt', plural: 'T-Shirts', id: 't-shirt', lesson: 4 },
    { genre: 'f', singular: 'Bluse', plural: 'Blusen', id: 'bluse', lesson: 4 },
    { genre: 'n', singular: 'Hemd', plural: 'Hemden', id: 'hemd', lesson: 4 },
    { genre: 'm', singular: 'Anzug', plural: 'Anzüge', id: 'anzug', lesson: 4 },
    { genre: 'm', singular: 'Stiefel', plural: 'Stiefel', id: 'stiefel', lesson: 4 },
    { genre: 'f', singular: 'Mütze', plural: 'Mützen', id: 'mutze', lesson: 4 },
    { genre: 'm', singular: 'Handschuh', plural: 'Handschuhe', id: 'handschuh', lesson: 4 },
    { genre: 'm', singular: 'Regenschirm', plural: 'Regenschirme', id: 'regenschirm', lesson: 4 },
    { genre: 'm', singular: 'Rock', plural: 'Röcke', id: 'rock', lesson: 4 },
    { genre: 'f', singular: 'Sonne', plural: 'Sonnen', id: 'sonne', lesson: 4 },
    { genre: 'm', singular: 'Mond', plural: 'Monde', id: 'mond', lesson: 4 },
    { genre: 'f', singular: 'Wolke', plural: 'Wolken', id: 'wolke', lesson: 4 },
    { genre: 'm', singular: 'Himmel', plural: 'Himmel', id: 'himmel', lesson: 4 },
    { genre: 'm', singular: 'Laden', plural: 'Läden', id: 'laden', lesson: 4 },
    { genre: 'm', singular: 'Junge', plural: 'Jungen', id: 'junge', lesson: 4 },
    { genre: 'n', singular: 'Mädchen', plural: 'Mädchen', id: 'madchen', lesson: 4 },
    { genre: 'n', singular: 'Fahrrad', plural: 'Fahrräder', id: 'fahrrad', lesson: 4 },
    { genre: 'm', singular: 'Schlüssel', plural: 'Schlüssel', id: 'schlussel', lesson: 4 },
    { genre: 'f', singular: 'Taschenlampe', plural: 'Taschenlampen', id: 'taschenlampe', lesson: 4 },
    { genre: 'f', singular: 'Kamera', plural: 'Kameras', id: 'kamera', lesson: 4 }
];
