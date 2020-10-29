const timestampRegex = RegExp('\\[\\d\\d[:.]\\d\\d[:.]\\d\\d\\d?].*$');

function extractLyrics(contents) {
  var lines = contents.split("\n");
  var lyrics = '';

  lines.forEach(line => {
    var lastBracketIndex = line.length;

    while (true) {
      if (lastBracketIndex == 0) { // Exhausted bracket checks i.e, no timestamps found
        break;
      }

      lastBracketIndex = line.lastIndexOf('[', lastBracketIndex - 1);
      console.log(timestampRegex.test(line.substring(lastBracketIndex)));
      if (lastBracketIndex == -1) { // Invalid line in the LRC file
        break;
      } else if (timestampRegex.test(line.substring(lastBracketIndex))) {
        // Current line has a timestamp

        lyrics += line.substring(line.indexOf(']', lastBracketIndex) + 1) + '\n';
        break;
      }
    }
  });

  return lyrics.trim();
}

function generateTranslatedContents(contents, translatedLyrics) {
  var lines = contents.split("\n");
  var lyrics = '';
  var translatedLines = translatedLyrics.split('\n');
  var translatedIndex = 0;

  lines.forEach(line => {
    if (translatedIndex >= translatedLines.length) {
      lyrics += line + '\n';
      return;
    }

    var lastBracketIndex = line.length;

    while (true) {
      if (lastBracketIndex == 0) { // Exhausted bracket checks i.e, no timestamps found
        lyrics += line + '\n';
        break;
      }

      lastBracketIndex = line.lastIndexOf('[', lastBracketIndex - 1);
      if (lastBracketIndex == -1) {
        lyrics += line + '\n'; // This actually adds the original garbage back, preserve or remove?
        break;
      } else if (timestampRegex.test(line.substring(lastBracketIndex))) {
        // Current line has a timestamp

        if (line.substring(line.indexOf(']', lastBracketIndex) + 1).trim().length == 0) {
          lyrics += line;
          if (translatedLines[translatedIndex].trim().length == 0) {
            translatedIndex++;
          }
        } else {
          lyrics += line + '^' + translatedLines[translatedIndex];
          translatedIndex++;
        }

        lyrics += '\n';

        break;
      }
    }
  });

  return lyrics.trim();
}

export default { extractLyrics, generateTranslatedContents };
