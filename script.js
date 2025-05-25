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

function parseEntry(entry) {
    entry = entry.trim();

    // Try to parse as a full verse (book chapter:verse)
    const verseMatch = entry.match(/^(.+?)\s+(\d+):(\d+)$/);
    if (verseMatch) {
        const bookName = verseMatch[1].trim();
        const chapter = parseInt(verseMatch[2]);
        const verseNum = parseInt(verseMatch[3]);

        if (getBookIndex(bookName) === -1) {
            return { error: `Invalid book name in entry: ${entry}` };
        }

        return {
            type: 'verse',
            bookName,
            chapter,
            verse: verseNum,
            original: entry
        };
    }

    // If not a full verse, check if it's a valid book name alone
    const bookName = entry;
    if (getBookIndex(bookName) !== -1) {
        return {
            type: 'book',
            bookName,
            original: entry
        };
    }

    // If it's neither a valid verse nor a valid book name, it's an error
    return { error: `Invalid entry format or book name: ${entry}` };
}

function showMessage(message, isError = false) {
    const messageSection = document.getElementById('messageSection');
    messageSection.textContent = message;
    messageSection.classList.add('show');
    if (isError) {
        messageSection.classList.add('error');
    } else {
        messageSection.classList.remove('error');
    }
}

function hideMessage() {
    const messageSection = document.getElementById('messageSection');
    messageSection.textContent = '';
    messageSection.classList.remove('show', 'error');
}

function sortVerses(order = 'reverse') {
    const input = document.getElementById('verseInput').value;
    const entries = input.split(/[\n,]+/).map(v => v.trim()).filter(v => v);

    // Find duplicates
    const uniqueEntries = new Set();
    const duplicates = new Set();

    entries.forEach(entry => {
        if (uniqueEntries.has(entry)) {
            duplicates.add(entry);
        } else {
            uniqueEntries.add(entry);
        }
    });

    // Parse entries and collect errors and valid parsed entries
    const parsedEntries = [];
    const errors = [];

    Array.from(uniqueEntries).forEach(entry => {
        const parsed = parseEntry(entry);
        if (parsed.error) {
            errors.push(parsed.error);
        } else {
            parsedEntries.push(parsed);
        }
    });

    // Show messages
    let message = '';
    if (duplicates.size > 0) {
        message += `Removed ${duplicates.size} duplicate entry(s):\n${Array.from(duplicates).join('\n')}\n\n`;
    }
    if (errors.length > 0) {
        message += `Invalid entries:\n${errors.join('\n')}`;
        showMessage(message, true);
        document.getElementById('sortedVerses').textContent = ''; // Clear previous results on error
        return;
    } else if (duplicates.size > 0) {
        showMessage(message);
    } else {
        hideMessage();
    }

    // Update output title based on sort order
    const outputTitle = document.getElementById('outputTitle');
    outputTitle.textContent = order === 'reverse' ? 
        'Sorted Verses (Revelation to Genesis)' : 
        'Sorted Verses (Genesis to Revelation)';

    // Sort entries
    parsedEntries.sort((a, b) => {
        const bookAIndex = getBookIndex(a.bookName);
        const bookBIndex = getBookIndex(b.bookName);

        if (bookAIndex !== bookBIndex) {
            return order === 'reverse' ? 
                bookAIndex - bookBIndex : 
                bookBIndex - bookAIndex;
        }

        // If both are verses, sort by chapter and verse
        if (a.type === 'verse' && b.type === 'verse') {
            if (a.chapter !== b.chapter) {
                return order === 'reverse' ? 
                    b.chapter - a.chapter : 
                    a.chapter - b.chapter;
            }
            return order === 'reverse' ? 
                b.verse - a.verse : 
                a.verse - b.verse;
        }

        // If one is a book and one is a verse of the same book, put the book first
        if (a.type === 'book' && b.type === 'verse') return -1;
        if (a.type === 'verse' && b.type === 'book') return 1;

        // If both are books of the same name (shouldn't happen with unique entries, but for completeness)
        return 0;
    });

    const output = parsedEntries.map(v => {
        if (v.type === 'verse') {
            return `${v.bookName} ${v.chapter}:${v.verse}`;
        } else {
            return v.bookName; // For entries of type 'book'
        }
    }).join('\n');
    document.getElementById('sortedVerses').textContent = output;
}

function resetForm() {
    document.getElementById('verseInput').value = '';
    document.getElementById('sortedVerses').textContent = '';
    hideMessage();
} 