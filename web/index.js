
const colors = [
  'red',
  'green',
  'blue',
  'yellow',
];

const shapes = {
  square: 'Square',
  rectangle: 'Rectangle',
  circle: 'Circle',
  oval: 'Oval',
  triangle: 'Triangle',
  diamond: 'Diamond',
  hexagon: 'Hexagon',
  star: 'Star',
  heart: 'Heart',
  crescent: 'Crescent / Moon',
};

const saveCanvasEl = document.getElementById('save-canvas');
const buttonEl = document.querySelector('button');
const svgEl = document.querySelector('.svg-source');
const cardEl = svgEl.querySelector('.card');
const nameEl = svgEl.querySelector('.name');
const shapeEls = svgEl.querySelectorAll('.shape');
const thumbGroupEl = svgEl.querySelector('.thumbs');

const CardBuilder = {
  shapeIdx: 0,
  colorIdx: 0,
  building: false,
  timer: null,

  build() {
    if (this.building) {
      this.stopBuilding();
      return;
    }

    console.log('Start building');
    buttonEl.innerHTML = 'Stop';
    this.building = true;
    this.buildNext();
  },

  stopBuilding() {
    buttonEl.innerHTML = 'Build';
    this.building = false;
  },

  buildNext() {
    const shapeEntries = Object.entries(shapes);
    if (this.colorIdx >= colors.length) {
      this.colorIdx = 0;
      this.shapeIdx++;
    }
    if (this.shapeIdx >= shapeEntries.length) {
      this.stopBuilding();
      return false;
    }

    const [shape, nameText] = shapeEntries[this.shapeIdx];
    const color = colors[this.colorIdx];

    console.log('Building a', color, shape)

    // Change the color
    cardEl.classList.remove('red');
    cardEl.classList.remove('green');
    cardEl.classList.remove('blue');
    cardEl.classList.remove('yellow');
    cardEl.classList.add(color);

    // Add the shape class
    let cardClass = cardEl.getAttribute('class').replace(/shape-[^\s]+/g, '');
    cardEl.setAttribute('class', cardClass);
    cardEl.classList.add(`shape-${shape}`);

    // Update shapes
    Array.from(shapeEls).forEach((el) => {
      el.setAttribute('href', `#${shape}`);
    });

    // Shape name
    nameEl.innerHTML = nameText;

    // Save
    this.save(shape, color)
    .then(response => {
      if (!response.ok) {
        console.log('ERROR', response);
        return;
      }

      // Again
      if (this.building) {
        this.colorIdx++;
        setTimeout(() => this.buildNext(), 500);
      }
    });
  },

  save(shape, color) {
    const data = {
      shape,
      color,
    }

    console.log('Saving', color, shape);

    // Transfer to canvas
    const src = svgEl.innerHTML.trim();
    canvg(saveCanvasEl, src);
    data.img = saveCanvasEl.toDataURL('image/png');

    return fetch('./save', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
      body: JSON.stringify(data)
    })
  }
}

buttonEl.addEventListener('click', () => {
  CardBuilder.build();
});
