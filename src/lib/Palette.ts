import { Color } from "@/lib/Color";
import { CustomEventEmitter } from "@/lib/CustomEventEmitter";

export interface ColorSourceOnChangedEvent extends Event {
  detail: ColorSourceOnChangedEventType;
}
export type ColorSourceOnChangedEventType = {
  value: Color;
};

export class MonoColor implements IColorSource {
  private value: Color = new Color(0, 0, 0);

  rand: number;
  constructor() {
    this.rand = Math.random();
  }

  getColor(): Color {
    return this.value;
  }
  setColor(color: Color) {
    this.value = color;
    console.log(`set: ${this.value.ToCode()} ${this.rand}`);
    const myEvent = new CustomEvent<ColorSourceOnChangedEventType>(
      "onChanged",
      {
        detail: {
          value: this.getColor(),
        },
      }
    );
    this.onChanged.dispatchEvent(myEvent);
  }

  // reflesh() {
  //   throw new Error("Not implemented.");
  // }

  readonly onChanged: CustomEventEmitter<ColorSourceOnChangedEvent> =
    new CustomEventEmitter<ColorSourceOnChangedEvent>();
}

export type IColorSource = {
  getColor(): Color;
  setColor(color: Color): void;
  // reflesh(): void;
  rand: number;
};

export type PaletteOnValueChangedEventType = {
  palette: Palette;
  index: number;
  clickType: string;
};

export interface PaletteOnChangedEvent extends Event {
  detail: PaletteOnChangedEventType;
}

// push, replace: index
// remove: -1
export type PaletteOnChangedEventType = {
  index: number;
  values: Color[];
};

export class Palette {
  private datas: Color[] = [];
  get length(): number {
    return this.datas.length;
  }
  get(index: number): Color {
    return this.datas[index];
  }
  push(color: Color) {
    this.datas.push(color);
    this.onChanged.dispatchEvent(
      new CustomEvent<PaletteOnChangedEventType>("onChanged", {
        detail: { index: this.length - 1, values: this.datas },
      })
    );
  }
  replace(index: number, color: Color) {
    this.datas[index] = color;
    this.onChanged.dispatchEvent(
      new CustomEvent<PaletteOnChangedEventType>("onChanged", {
        detail: { index: index, values: this.datas },
      })
    );
  }

  pop() {
    this.remove(this.length - 1);
  }
  remove(index: number) {
    if (index < 0) throw new Error(`This index (${index}) is not exist.`);
    this.datas.splice(index, 1);
    this.onChanged.dispatchEvent(
      new CustomEvent<PaletteOnChangedEventType>("onChanged", {
        detail: { index: -1, values: this.datas },
      })
    );
  }

  readonly onChanged: CustomEventEmitter<PaletteOnChangedEvent> =
    new CustomEventEmitter<PaletteOnChangedEvent>();

  reflesh() {
    throw new Error("Not implemented.");
  }
}

// 描画指示するのは役割違い
