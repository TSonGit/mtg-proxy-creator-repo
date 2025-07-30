function toggleHiddenBaseColor() {
    const frameType = document.getElementById("frameType")
    const baseColor = document.getElementById("baseColor");
    const baseColorLabel = document.getElementById("baseColorLabel");

    if (frameType.value === "standard") {
        baseColorLabel.style.display = "block";
        baseColor.style.display = "block";
    } else {
        baseColorLabel.style.display = "none";
        baseColor.style.display = "none";
    }
}

function toggleHiddenPowerToughness() {
    const cardType = document.getElementById("cardType")
    const creaturePower = document.getElementById("creaturePower");
    const creaturePowerLabel = document.getElementById("creaturePowerLabel");
    const creatureToughness = document.getElementById("creatureToughness");
    const creatureToughnessLabel = document.getElementById("creatureToughnessLabel");

    if (cardType.value === "creature") {
        creaturePowerLabel.style.display = "block";
        creaturePower.style.display = "block";
        creatureToughnessLabel.style.display = "block";
        creatureToughness.style.display = "block";
    } else {
        creaturePowerLabel.style.display = "none";
        creaturePower.style.display = "none";
        creatureToughnessLabel.style.display = "none";
        creatureToughness.style.display = "none";
    }
}


const cardManaValue = document.getElementById("cardManaValue");

const manaCounts = {
    X: 0,
    generic: 0,
    C: 0,
    W: 0,
    U: 0,
    B: 0,
    R: 0,
    G: 0,
    'W/U': 0,
    'U/B': 0,
    'B/R': 0,
    'R/G': 0,
    'G/W': 0,
    'W/B': 0,
    'U/R': 0,
    'B/G': 0,
    'R/W': 0,
    'G/U': 0
};

const manaImageMap = {
  'W': 'white',
  'U': 'blue',
  'B': 'black',
  'R': 'red',
  'G': 'green',
  'C': 'colorless',
  'X': 'x',
  '1': '1',
  '2': '2',
  '3': '3',
  // hybrids:
  'W/U': 'white-blue',
  'U/B': 'blue-black',
  'B/R': 'black-red',
  'R/G': 'red-green',
  'G/W': 'green-white',
  'W/B': 'white-black',
  'U/R': 'blue-red',
  'B/G': 'black-green',
  'R/W': 'red-white',
  'G/U': 'green-blue',
};



function addManaSymbol(symbol) {
    if (symbol === 'generic') {
        manaCounts.generic++;
    } else if (symbol === 'X') {
        manaCounts.X = 1; // X is not additive; just show {X} if present
    } else {
        manaCounts[symbol.replace(/[{}]/g, '')]++;
    }

    updateManaDisplay();
}

function updateManaDisplay() {
    const order = ['X', 'generic', 'C', 'W', 'U', 'B', 'R', 'G',
        'W/U', 'U/B', 'B/R', 'R/G', 'G/W', 'W/B', 'U/R', 'B/G', 'R/W', 'G/U'];

    const display = document.getElementById("manaDisplay");
    display.innerHTML = ''; // Clear previous output

    for (const key of order) {
        const count = manaCounts[key];
        if (count > 0) {
            if (key === 'X') {
                display.appendChild(createSymbolImage('X'));
            } else if (key === 'generic') {
                display.appendChild(createSymbolImage(String(count))); // e.g., {3}
            } else {
                for (let i = 0; i < count; i++) {
                    display.appendChild(createSymbolImage(key));
                }
            }
        }
    }
}

function createSymbolImage(symbol) {
  const img = document.createElement('img');
  const filename = manaImageMap[symbol];

  if (!filename) {
    console.warn(`Unknown symbol: ${symbol}`);
    return document.createTextNode(`{${symbol}}`);
  }

  img.src = `https://svgs.scryfall.io/card-symbols/${filename}.svg`;
  img.alt = `{${symbol}}`;
  img.style.width = '30px';
  img.style.height = '30px';
  img.style.margin = '4px';

  img.onerror = () => {
    console.error(`Failed to load image for symbol: ${symbol}`);
    img.replaceWith(document.createTextNode(`{${symbol}}`));
  };

  return img;
}



function clearMana() {
    for (const key in manaCounts) {
        manaCounts[key] = 0;
    }

    cardManaValue.value = '';
    document.getElementById("manaDisplay").innerHTML = ''; // Clear visual display

    alert("Mana value cleared.");
}
