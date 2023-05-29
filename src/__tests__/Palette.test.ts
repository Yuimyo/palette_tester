import { describe, expect, test } from "@jest/globals";
import { Palette, IColorSource, MonoColor } from "../lib/Palette";
import { CustomEventEmitter } from "../lib/CustomEventEmitter";
// D:\Kyopro\palette_tester\src\lib\Palette.ts

export interface TestOnChangedEvent extends Event {
  detail: TestOnChangedEventType;
}
export type TestOnChangedEventType = {
  value: string;
};

test("CustomEventEmitterに追加したリスナーは正常に実行されるか", () => {
  // const emitter = new CustomEventEmitter(); // <TestOnChangedEvent>
  // const event1 = new CustomEvent("これ意味ない1？", {
  //   detail: { value: "OMG" },
  // });
  // const event2 = new CustomEvent("これ意味ない2？", {
  //   detail: { value: "Nugege" },
  // });
  // const event3 = new CustomEvent("password", { detail: { value: "Hogemaru" } });
  // const event4 = new CustomEvent("password", { detail: { value: "Pixel" } });
  // let result1 = "Not";
  // let result2 = "Not";
  // emitter.addEventListener("onChanged", (e) => {
  //   result1 = e.detail.value;
  // });
  // emitter.addEventListener("onTapped", (e) => {
  //   result2 = e.detail.value;
  // });
  // emitter.dispatchEvent("onChanged", event1);
  // expect(result1).toBe("OMG");
  // expect(result2).toBe("Not");
  // emitter.dispatchEvent("onChanged", event2);
  // expect(result1).toBe("Nugege");
  // expect(result2).toBe("Not");
  // emitter.dispatchEvent("onTapped", event3);
  // expect(result1).toBe("Nugege");
  // expect(result2).toBe("Hogemaru");
  // emitter.dispatchEvent("onChanged", event3);
  // emitter.dispatchEvent("onTapped", event4);
  // expect(result1).toBe("Hogemaru");
  // expect(result2).toBe("Pixel");
});
