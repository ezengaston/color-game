const formatRgb = document.getElementById("rgb");
const formatHex = document.getElementById("hex");
const formatHsl = document.getElementById("hsl");
const difficultyEasy = document.getElementById("easy");
const difficultyMedium = document.getElementById("medium");
const difficultyHard = document.getElementById("hard");
const colorString = document.querySelector("[data-color-string]");
const result = document.querySelector("[data-correct]");
const nextButton = document.querySelector("[data-next-color]");

export function startGame() {
  const red = createRandomColor();
  const green = createRandomColor();
  const blue = createRandomColor();

  if (formatRgb.checked) {
    createBoard(red, green, blue);
    colorString.textContent = `rgb(${red}, ${green}, ${blue})`;
    colorString.dataset.rgb = `rgb(${red}, ${green}, ${blue})`;
  } else if (formatHex.checked) {
    createBoard(red, green, blue);
    colorString.textContent = convertRgbToHex(red, green, blue);
    colorString.dataset.rgb = `rgb(${red}, ${green}, ${blue})`;
  } else if (formatHsl.checked) {
    createBoard(red, green, blue);
    colorString.textContent = convertRgbToHsl(red, green, blue);
    colorString.dataset.rgb = `rgb(${red}, ${green}, ${blue})`;
  }
}

function createBoard(red, green, blue) {
  const arrayOfId = [1, 2, 3, 4, 5, 6];
  const selectedId = chooseId() + 1;
  const selectedSquare = document.getElementById(`${selectedId.toString()}`);
  selectedSquare.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

  const newArrayOfId = arrayOfId.filter((items) => items !== selectedId);

  newArrayOfId.forEach((item) => {
    const element = document.getElementById(`${item}`);
    element.style.backgroundColor = randomColorForTheRest(red, green, blue);
  });
}

export function nextTry() {
  result.setAttribute("hidden", "");
  nextButton.setAttribute("hidden", "");
  const arrayOfId = [1, 2, 3, 4, 5, 6];

  arrayOfId.forEach((item) => {
    const element = document.getElementById(item);
    element.classList.remove("wrong");
    element.removeAttribute("disabled");
  });
}

export function winCase(box) {
  if (box.style.backgroundColor === colorString.dataset.rgb) {
    const winId = box.id;
    const arrayOfId = [1, 2, 3, 4, 5, 6];
    const newArrayOfId = arrayOfId.filter((item) => item !== parseFloat(winId));

    newArrayOfId.forEach((item) => {
      const element = document.getElementById(`${item}`);
      element.classList.add("wrong");
      element.setAttribute("disabled", "");
    });

    result.textContent = "Correct";
    result.removeAttribute("hidden");
    nextButton.removeAttribute("hidden");
  }
}

export function loseCase(box) {
  if (box.style.backgroundColor !== colorString.dataset.rgb) {
    const arrayOfId = [1, 2, 3, 4, 5, 6];
    const winId = arrayOfId.filter((item) => {
      const element = document.getElementById(item);
      if (element.style.backgroundColor !== colorString.dataset.rgb) return;
      return element.id;
    });

    const looseId = arrayOfId.filter((items) => {
      const element = document.getElementById(items);
      if (element.id !== winId[0].toString()) return element.id;
    });

    looseId.forEach((item) => {
      const element = document.getElementById(item);
      element.classList.add("wrong");
      element.setAttribute("disabled", "");
    });

    document.getElementById(winId[0]).setAttribute("disabled", "");

    result.textContent = "Wrong";
    result.removeAttribute("hidden");
    nextButton.removeAttribute("hidden");
  }
}

function randomColorForTheRest(red, green, blue) {
  if (difficultyEasy.checked) {
    const red = createRandomColor();
    const green = createRandomColor();
    const blue = createRandomColor();

    return `rgb(${red}, ${green}, ${blue})`;
  } else if (difficultyMedium.checked) {
    const mediumRed = medium(red);
    const mediumGreen = medium(green);
    const mediumBlue = medium(blue);

    return `rgb(${mediumRed}, ${mediumGreen}, ${mediumBlue})`;
  } else if (difficultyHard.checked) {
    const hardRed = hard(red);
    const hardGreen = hard(green);
    const hardBlue = hard(blue);

    return `rgb(${hardRed}, ${hardGreen}, ${hardBlue})`;
  }
}

function createRandomColor() {
  const color = Math.floor(Math.random() * 256);
  return color;
}

function chooseId() {
  const id = Math.floor(Math.random() * 6);
  return id;
}

function convertRgbToHex(red, green, blue) {
  let redHex = red.toString(16);
  let greenHex = green.toString(16);
  let blueHex = blue.toString(16);

  if (redHex.length == 1) {
    redHex = "0" + redHex;
  }

  if (greenHex.length == 1) {
    greenHex = "0" + greenHex;
  }

  if (blueHex.length == 1) {
    blueHex = "0" + blueHex;
  }

  return `#${redHex}${greenHex}${blueHex}`;
}

function convertRgbToHsl(red, green, blue) {
  let hue = 0;
  let saturation = 0;
  let lightness = 0;

  red /= 255;
  green /= 255;
  blue /= 255;

  const minimum = Math.min(red, green, blue);
  const maximum = Math.max(red, green, blue);
  const delta = maximum - minimum;

  if (delta === 0) {
    hue = 0;
  } else if (maximum === red) {
    hue = ((green - blue) / delta) % 6;
  } else if (maximum === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  hue = Math.round(hue * 60);

  if (hue < 0) {
    hue += 360;
  }

  lightness = (maximum + minimum) / 2;

  if (delta === 0) {
    saturation = 0;
  } else {
    delta / (1 - Math.abs(2 * lightness - 1));
  }

  saturation = +(saturation * 100).toFixed(1);
  lightness = +(lightness * 100).toFixed(1);

  return `hsl(${Math.round(hue)}%, ${Math.round(saturation)}%, ${Math.round(
    lightness
  )}%)`;
}

function hard(color) {
  const numberForColor = randomNumber(30) + 1;

  const signForColor = randomSign();

  let newColor = signCheck(signForColor, numberForColor, color);

  if (newColor > 255) {
    newColor -= numberForColor * 2;
  } else if (newColor < 0) {
    newColor += numberForColor * 2;
  }

  return newColor;
}

function medium(color) {
  const numberForColor = randomNumber(100) + 1;

  const signForColor = randomSign();

  let newColor = signCheck(signForColor, numberForColor, color);

  if (newColor > 255) {
    newColor -= numberForColor * 2;
  } else if (newColor < 0) {
    newColor += numberForColor * 2;
  }

  return newColor;
}

function signCheck(signForColor, numberForColor, color) {
  if (signForColor === "+") {
    return (color += numberForColor);
  } else if (signForColor === "-") {
    return (color -= numberForColor);
  }
}

function randomSign() {
  const number = randomNumber(2) + 1;
  if (number === 1) {
    return "+";
  } else {
    return "-";
  }
}

function randomNumber(maximum) {
  return Math.floor(Math.random() * maximum);
}
