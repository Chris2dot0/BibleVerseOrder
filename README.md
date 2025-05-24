# Bible Verse Sorter

A simple web application that sorts Bible verses from Revelation to Genesis (reverse chronological order).

## Features

- Accepts multiple Bible verses as input
- Sorts verses from Revelation to Genesis
- Handles common variations in book names
- Supports both comma-separated and newline-separated input
- Clean, modern user interface

## How to Use

1. Open `index.html` in your web browser
2. Enter Bible verses in the text area, either:
   - One per line, or
   - Separated by commas
3. Click the "Sort Verses" button
4. View the sorted verses in the output section

## Input Format

Enter verses in the format: `Book Chapter:Verse`

Examples:
```
John 3:16
Genesis 1:1
Revelation 22:21
```

## Supported Book Name Variations

The application supports common variations in book names, including:
- Abbreviations (e.g., "Ps" for "Psalms")
- Roman numerals (e.g., "I John" for "1 John")
- Alternative names (e.g., "Song of Songs" for "Song of Solomon")

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No external dependencies required
- Works in all modern browsers 