import { CustomEventEmitter } from "@/lib/CustomEventEmitter";

export class Parameter {
  private _name: string;
  private _value: number;

  public readonly onChanged: CustomEventEmitter<ParameterOnChangedEvent> =
    new CustomEventEmitter<ParameterOnChangedEvent>();

  get name(): string {
    return this._name;
  }

  set name(input: string) {
    this._name = input;
  }

  get value(): number {
    return this._value;
  }

  set value(input: number) {
    this._value = input;
    this.onChanged.dispatchEvent(
      new CustomEvent<ParameterOnChangedEventType>("", {
        detail: { value: input },
      })
    );
  }

  constructor(name: string, value: number) {
    this._name = name;
    this._value = value;
  }
}

export type ParameterOnChangedEventType = {
  value: number;
};

export interface ParameterOnChangedEvent extends Event {
  detail: ParameterOnChangedEventType;
}
