export class Color {
  public static readonly DEFAULT: Color = new Color(0, 0, 0);

  public readonly R: number = 0;
  public readonly G: number = 0;
  public readonly B: number = 0;

  /**
   * r, g, b ∈ [0, 1]
   */
  constructor(r: number, g: number, b: number) {
    this.R = r;
    this.G = g;
    this.B = b;
  }

  public copy(): Color {
    return new Color(this.R, this.G, this.B);
  }

  /**
   * 色情報について、HSV から初期化します。
   * h ∈ [0, 360), s, v ∈ [0, 1]
   */
  public static FromHsv(h: number, s: number, v: number): Color {
    const c = v * s;
    const i = h / 60;
    const x = c * (1 - Math.abs((i % 2) - 1));
    const m = v - c;
    switch (Math.floor(i) % 6) {
      default:
      case 0:
        return new Color(c + m, x + m, 0 + m);
      case 1:
        return new Color(x + m, c + m, 0 + m);
      case 2:
        return new Color(0 + m, c + m, x + m);
      case 3:
        return new Color(0 + m, x + m, c + m);
      case 4:
        return new Color(x + m, 0 + m, c + m);
      case 5:
        return new Color(c + m, 0 + m, x + m);
    }
  }

  /**
   * 色情報について、カラーコード から初期化します。
   * h ∈ [0, 360), s, v ∈ [0, 1]
   */
  public static FromCode(code: string): Color {
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
    return new Color(r / 255.0, g / 255.0, b / 255.0);
  }

  public GetLuminance(): number {
    return 0.298912 * this.R + 0.586611 * this.G + 0.114478 * this.B;
  }

  /**
   * 色情報について、HSV に変換します。
   * h ∈ [0, 360), s, v ∈ [0, 1]
   */
  public ToHsv(): [h: number, s: number, v: number] {
    const v = Math.max(this.R, this.G, this.B);
    const xMax = v;
    const xMin = Math.min(this.R, this.G, this.B);
    const c = xMax - xMin;
    let h = 0;
    if (c != 0) {
      if (v == this.R) {
        h = 60 * ((Math.floor((this.G - this.B) / c) + 6) % 6);
      }
      if (v == this.G) {
        h = 60 * ((this.B - this.R) / c + 2);
      }
      if (v == this.B) {
        h = 60 * ((this.R - this.G) / c + 4);
      }
    }
    const s = v != 0 ? c / v : 0;
    return [h, s, v];
  }

  /**
   * 色情報について、カラーコード に変換します。
   */
  public ToCode(): string {
    const rInt = Math.round(this.R * 255);
    const gInt = Math.round(this.G * 255);
    const bInt = Math.round(this.B * 255);
    const hex = "0123456789abcdef";
    return (
      "#" +
      `${hex[Math.floor(rInt / 16)]}${hex[Math.floor(rInt % 16)]}` +
      `${hex[Math.floor(gInt / 16)]}${hex[Math.floor(gInt % 16)]}` +
      `${hex[Math.floor(bInt / 16)]}${hex[Math.floor(bInt % 16)]}`
    );
  }
}
