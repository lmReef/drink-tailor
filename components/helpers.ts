import { convert, Volume } from 'convert';

const roundmls = (num) => {
  const goods = [
    5, 10, 15, 22, 30, 60, 90, 120, 150, 180, 210, 230, 250, 280, 310,
  ];

  const newMl = goods.filter((good) => good + 1 === num || good - 1 === num);

  return newMl[0] || num;
};

const handleOut = (
  out: number | number[],
  initialUnit: Volume,
  unit: Volume,
  mod: '-' | '/' | null = null,
) => {
  if (mod === '-')
    return `${Math.ceil(convert(out[0], initialUnit).to(unit))}-${Math.ceil(
      convert(out[1], initialUnit).to(unit),
    )} ${unit}`;
  else if (mod === '/')
    return `${Math.ceil(
      convert(eval(`${out[0]}/${out[1]}`), initialUnit).to(unit) as number,
    )} ${unit}`;
  else return `${Math.ceil(convert(out, initialUnit).to(unit))} ${unit}`;
};

export const convertUnits = (input: string, unit: Volume = 'ml') => {
  if (!input) return input;

  const regex = input?.match(/(ml|L)|(oz|Z)|(cl|L)|(shots?)|(parts?)/) || null;
  let initialUnit: Volume =
    ((regex && regex[0])?.toLowerCase() as Volume) || null;
  if (
    initialUnit?.includes('oz') ||
    initialUnit?.includes('shot') ||
    initialUnit?.includes('part')
  )
    initialUnit = 'fl oz';

  if (!initialUnit) return input;

  // handle rough amounts
  if (input.includes('-')) {
    const vals = input.match(/[0-9]+/g);

    return handleOut(
      [parseInt(vals[0]), parseInt(vals[1])],
      initialUnit,
      unit,
      '-',
    );
  }
  // handle fractions
  else if (input.includes('/')) {
    const vals = input.match(/[0-9]+/g);

    return handleOut(
      [parseInt(vals[0]), parseInt(vals[1])],
      initialUnit,
      unit,
      '/',
    );
  }
  // handle regular
  else {
    const val = parseInt(input) || null;

    if (val) {
      return handleOut(val, initialUnit, unit);
    }
  }

  // catch all
  return input;
};
