// Bible book order from Revelation to Genesis
const bibleBooks = [
    'Revelation', 'Jude', '3 John', '2 John', '1 John', '2 Peter', '1 Peter',
    'James', 'Hebrews', 'Philemon', 'Titus', '2 Timothy', '1 Timothy',
    '2 Thessalonians', '1 Thessalonians', 'Colossians', 'Philippians',
    'Ephesians', 'Galatians', '2 Corinthians', '1 Corinthians', 'Romans',
    'Acts', 'John', 'Luke', 'Mark', 'Matthew', 'Malachi', 'Zechariah',
    'Haggai', 'Zephaniah', 'Habakkuk', 'Nahum', 'Micah', 'Jonah', 'Obadiah',
    'Amos', 'Joel', 'Hosea', 'Daniel', 'Ezekiel', 'Lamentations', 'Jeremiah',
    'Isaiah', 'Song of Solomon', 'Ecclesiastes', 'Proverbs', 'Psalms', 'Job',
    'Esther', 'Nehemiah', 'Ezra', '2 Chronicles', '1 Chronicles', '2 Kings',
    '1 Kings', '2 Samuel', '1 Samuel', 'Ruth', 'Judges', 'Joshua',
    'Deuteronomy', 'Numbers', 'Leviticus', 'Exodus', 'Genesis'
];

function getBookIndex(bookName) {
    // Handle common variations in book names
    const normalizedBookName = bookName.trim()
        .replace(/^1\s+/, '1 ')
        .replace(/^2\s+/, '2 ')
        .replace(/^3\s+/, '3 ')
        .replace(/^I\s+/, '1 ')
        .replace(/^II\s+/, '2 ')
        .replace(/^III\s+/, '3 ')
        .replace(/^Song of Songs$/, 'Song of Solomon')
        .replace(/^Song$/, 'Song of Solomon')
        .replace(/^Songs$/, 'Song of Solomon')
        .replace(/^Eccl$/, 'Ecclesiastes')
        .replace(/^Prov$/, 'Proverbs')
        .replace(/^Ps$/, 'Psalms')
        .replace(/^Lam$/, 'Lamentations')
        .replace(/^Jer$/, 'Jeremiah')
        .replace(/^Isa$/, 'Isaiah')
        .replace(/^Dan$/, 'Daniel')
        .replace(/^Ezek$/, 'Ezekiel')
        .replace(/^Hos$/, 'Hosea')
        .replace(/^Joel$/, 'Joel')
        .replace(/^Amos$/, 'Amos')
        .replace(/^Obad$/, 'Obadiah')
        .replace(/^Jonah$/, 'Jonah')
        .replace(/^Micah$/, 'Micah')
        .replace(/^Nah$/, 'Nahum')
        .replace(/^Hab$/, 'Habakkuk')
        .replace(/^Zeph$/, 'Zephaniah')
        .replace(/^Hag$/, 'Haggai')
        .replace(/^Zech$/, 'Zechariah')
        .replace(/^Mal$/, 'Malachi');

    return bibleBooks.indexOf(normalizedBookName);
}

function parseVerse(verse) {
    // Split the verse into book and chapter:verse
    const match = verse.match(/^(.+?)\s+(\d+):(\d+)$/);
    if (!match) return null;

    const bookName = match[1].trim();
    const chapter = parseInt(match[2]);
    const verseNum = parseInt(match[3]);

    return {
        bookName,
        chapter,
        verse: verseNum,
        original: verse
    };
}

function sortVerses() {
    const input = document.getElementById('verseInput').value;
    const verses = input.split(/[\n,]+/).map(v => v.trim()).filter(v => v);
    
    const parsedVerses = verses.map(parseVerse).filter(v => v !== null);
    
    parsedVerses.sort((a, b) => {
        const bookA = getBookIndex(a.bookName);
        const bookB = getBookIndex(b.bookName);
        
        if (bookA !== bookB) return bookA - bookB;
        if (a.chapter !== b.chapter) return b.chapter - a.chapter;
        return b.verse - a.verse;
    });

    const output = parsedVerses.map(v => v.original).join('\n');
    document.getElementById('sortedVerses').textContent = output;
}

function resetForm() {
    document.getElementById('verseInput').value = '';
    document.getElementById('sortedVerses').textContent = '';
} 