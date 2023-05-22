/**
 * 色情報について、RGB → HSV に変換します。
 * r, g, b ∈ [0, 1], h ∈ [0, 360), s, v ∈ [0, 1]
 */
export function RgbToHsv(
  r: number,
  g: number,
  b: number
): [h: number, s: number, v: number] {
  const v = Math.max(r, g, b);
  const xMax = v;
  const xMin = Math.min(r, g, b);
  const c = xMax - xMin;
  let h = 0;
  if (c != 0) {
    if (v == r) {
      h = 60 * ((Math.floor((g - b) / c) + 6) % 6);
    }
    if (v == g) {
      h = 60 * ((b - r) / c + 2);
    }
    if (v == b) {
      h = 60 * ((r - g) / c + 4);
    }
  }
  const s = v != 0 ? c / v : 0;
  return [h, s, v];
}

/**
 * 色情報について、RGB → HSV に変換します。
 * r, g, b ∈ [0, 1], h ∈ [0, 360), s, v ∈ [0, 1]
 */
export function HsvToRgb(
  h: number,
  s: number,
  v: number
): [r: number, g: number, b: number] {
  const c = v * s;
  const i = h / 60;
  const x = c * (1 - Math.abs((i % 2) - 1));
  const m = v - c;
  switch (Math.floor(i) % 6) {
    default:
    case 0:
      return [c + m, x + m, 0 + m];
    case 1:
      return [x + m, c + m, 0 + m];
    case 2:
      return [0 + m, c + m, x + m];
    case 3:
      return [0 + m, x + m, c + m];
    case 4:
      return [x + m, 0 + m, c + m];
    case 5:
      return [c + m, 0 + m, x + m];
  }
}

/**
 * 色情報について、RGB → カラーコード に変換します。
 * r, g, b ∈ [0, 1]
 */
export function RgbToCode(r: number, g: number, b: number): string {
  const rInt = Math.round(r * 255);
  const gInt = Math.round(g * 255);
  const bInt = Math.round(b * 255);
  const hex = "0123456789abcdef";
  return (
    "#" +
    `${hex[Math.floor(rInt / 16)]}${hex[Math.floor(rInt % 16)]}` +
    `${hex[Math.floor(gInt / 16)]}${hex[Math.floor(gInt % 16)]}` +
    `${hex[Math.floor(bInt / 16)]}${hex[Math.floor(bInt % 16)]}`
  );
}

/**
 * 色情報について、カラーコード → RGB に変換します。
 * r, g, b ∈ [0, 1]
 */
export function CodeToRgb(code: string): [r: number, g: number, b: number] {
  code = code.trim();
  let isValid = true;
  if (code.length != 7) isValid = false;
  if (code[0] != "#") isValid = false;
  const hex = "0123456789abcdef";
  for (let i = 1; i < 7; i++) {
    let contain = false;
    for (let j = 0; j < 16; j++) {
      if (code[i] == hex[j]) contain = true;
    }
    if (!contain) isValid = false;
  }
  if (!isValid) throw new Error(`Invalid colorcode("${code}").`);
  const value = parseInt(code.substring(1, 7), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return [r, g, b];
}
