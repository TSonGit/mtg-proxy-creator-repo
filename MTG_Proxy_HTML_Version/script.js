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
  'W': 'mana-w',
  'U': 'mana-u',
  'B': 'mana-b',
  'R': 'mana-r',
  'G': 'mana-g',
  'C': 'mana-c',
  'X': 'mana-x',
  '1': 'mana-1',
  '2': 'mana-2',
  '3': 'mana-3',
  '4': 'mana-4',
  '5': 'mana-5',
  '6': 'mana-6',
  '7': 'mana-7',
  '8': 'mana-8',
  '9': 'mana-9',
  '10': 'mana-10',
  // hybrids:
  'W/U': 'mana-wu',
  'U/B': 'mana-ub',
  'B/R': 'mana-br',
  'R/G': 'mana-rg',
  'G/W': 'mana-gw',
  'W/B': 'mana-wb',
  'U/R': 'mana-ur',
  'B/G': 'mana-bg',
  'R/W': 'mana-rw',
  'G/U': 'mana-gu',
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
    // console.log("Updating mana display with:", manaCounts);
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

  // Use PNG images from Manamoji Slack repo (replace with local path if downloaded)
  // The GitHub repo has files like: w.png, u.png, white-blue.png, etc.
  img.src = `images/${filename}.png`;
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
    updateManaDisplay(); // This re-renders the cleared state
    // console.log("Cleared manaCounts:", JSON.stringify(manaCounts));

    alert("Mana value cleared.");
}