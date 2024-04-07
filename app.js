
function replaceString() {
    var originalString = document.getElementById("originalString").value;
    var replacementsString = document.getElementById("replacements").value;
    var replacements = parseReplacements(replacementsString);

    originalString = applyReplacements(originalString, replacements);

    document.getElementById("result").value = originalString;
}

function parseReplacements(replacementsString) {
    var replacements = [];

    var replacementPairs = replacementsString.split(', '); // Split input by comma and space
    replacementPairs.forEach(function(pair) {
        var position = parseInt(pair.slice(0, -1)); // Extract position (remove last character)
        var operation = pair.slice(-1); // Extract operation (last character)

        if (!isNaN(position) && (operation === 'X' || operation.match(/[A-Za-z]/))) {
            replacements.push({ position: position, operation: operation });
        }
    });

    return replacements;
}

function applyReplacements(originalString, replacements) {
    // Sort replacements by position in descending order to handle deletions correctly
    replacements.sort((a, b) => b.position - a.position);

    replacements.forEach(function(replacement) {
        var position = replacement.position;
        var operation = replacement.operation;

        if (operation === 'X') {
            // Delete the character at the specified position
            if (position >= 1 && position <= originalString.length) {
                originalString = originalString.substr(0, position - 1) + originalString.substr(position);
            }
        } else if (operation.match(/[A-Za-z]/)) {
            // Replace the character at the specified position
            var letter = operation;
            if (position >= 1 && position <= originalString.length) {
                originalString = originalString.substr(0, position - 1) + letter + originalString.substr(position);
            }
        }
    });

    return originalString;
}