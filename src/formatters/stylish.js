const sign = {
  remote: '-',
  added: '+',
  space: ' ',
};

// каждое погружение на один уровень добавляет четыре знака
const spaseCount = 4;

// отступ = глубина * количество отступов — смещение влево
// смещение влево — отступ в обратную сторону, т.е. спец. символ + пробел между ним и строкой
const calculateIndent = depth * numberIndents - leftOffset;
