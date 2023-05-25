import { Color } from "@/lib/Color";
import { CustomEventEmitter } from "@/lib/CustomEventEmitter";

export interface MonoColorOnChangedEvent extends Event {
  detail: MonoColorOnChangedEventType;
}
export type MonoColorOnChangedEventType = {
  value: MonoColor;
};

export class MonoColor implements IColorSource {
  value: Color = new Color(0, 0, 0);
  getColor(): Color {
    return this.value;
  }
  setColor(color: Color) {
    const myEvent = new CustomEvent<MonoColorOnChangedEventType>("onChanged", {
      detail: {
        value: this,
      },
    });
    this.onChangedEvent.dispatchEvent("onChanged", myEvent);
  }

  // reflesh() {
  //   throw new Error("Not implemented.");
  // }

  private onChangedEvent = new CustomEventEmitter<MonoColorOnChangedEvent>();
  addEventOnChanged(listener: (event: MonoColorOnChangedEvent) => void) {
    this.onChangedEvent.addEventListener("onChanged", listener);
  }
  removeEventOnChanged(listener: (event: MonoColorOnChangedEvent) => void) {
    this.onChangedEvent.removeEventListener("onChanged", listener);
  }
}

interface IColorSource {
  getColor(): Color;
  setColor(color: Color): void;
  addEventOnChanged(listener: (event: Event) => void): void;
  removeEventOnChanged(listener: (event: Event) => void): void;
  // reflesh(): void;
}

export interface PaletteOnChangedEvent extends Event {
  detail: PaletteOnChangedEventType;
}
export type PaletteOnChangedEventType = {
  value: Palette;
};

export class Palette {
  datas: IColorSource[] = [];
  get length(): number {
    return this.datas.length;
  }
  push(source: IColorSource) {
    this.datas.push(source);
  }
  replace(index: number, source: IColorSource) {
    this.datas[index] = source;
  }
  remove(index: number) {
    if (index < 0) throw new Error(`This index (${index}) is not exist.`);
    this.datas.splice(index, 1);
  }

  reflesh() {
    throw new Error("Not implemented.");
  }

  // ColorCircleに伝えてやる
  private onChangedEvent = new CustomEventEmitter<PaletteOnChangedEvent>();
  addEventOnChanged(listener: (event: PaletteOnChangedEvent) => void) {
    this.onChangedEvent.addEventListener("onChanged", listener);
  }
  removeEventOnChanged(listener: (event: PaletteOnChangedEvent) => void) {
    this.onChangedEvent.removeEventListener("onChanged", listener);
  }
}

// 描画指示するのは役割違い
