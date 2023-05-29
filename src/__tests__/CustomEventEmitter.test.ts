import { describe, expect, test } from "@jest/globals";
import { CustomEventEmitter } from "../lib/CustomEventEmitter";
// import { CustomEventEmitter2 } from "../lib/CustomEventEmitter2";

type HogeTypeA = {
  value: string;
};
type HogeTypeB = {
  value: number;
};
type HogeTypeC = {
  value: number[];
};

test("CustomEventEmitterに追加したリスナーは正常に実行されるか", () => {
  const emitter = new CustomEventEmitter<CustomEvent<HogeTypeA>>();
  let expectingA = "Nope";
  const func1 = (event: CustomEvent<HogeTypeA>) => {
    expect(event.detail.value).toBe(expectingA);
  };
  emitter.addEventListener(func1);

  expectingA = "Yahoo!";
  emitter.dispatchEvent(
    new CustomEvent<HogeTypeA>("namae", { detail: { value: "Yahoo!" } })
  );
  expectingA = "Nyandato!";
  emitter.dispatchEvent(
    new CustomEvent<HogeTypeA>("namae", { detail: { value: "Nyandato!" } })
  );
  emitter.removeEventListener(func1);
});

test("CustomEventEmitterに追加したリスナーは正常に実行されるか", () => {
  const emitter = new CustomEventEmitter<CustomEvent<HogeTypeB>>();
  let expectingB1 = -1000;
  let expectingB2 = -1000;
  const func2 = (event: CustomEvent<HogeTypeB>) => {
    expect(event.detail.value).toBe(expectingB1);
  };
  const func3 = (event: CustomEvent<HogeTypeB>) => {
    expect(event.detail.value * 2).toBe(expectingB2);
  };
  emitter.addEventListener(func2);
  emitter.addEventListener(func3);

  expectingB1 = 114514;
  expectingB2 = 114514 * 2;
  emitter.dispatchEvent(
    new CustomEvent<HogeTypeB>("namae", { detail: { value: 114514 } })
  );
  expectingB1 = 115514;
  expectingB2 = 115514 * 2;
  emitter.dispatchEvent(
    new CustomEvent<HogeTypeB>("namae", { detail: { value: 115514 } })
  );
});

// test("CustomEventEmitter2に追加したリスナーは正常に実行されるか", () => {
//   const emitter = new CustomEventEmitter2();
//   let expectingA: string = "Nope";
//   let expectingB1: number = -1000;
//   let expectingB2: number = -1000;
//   let expectingC: number[] = [-1, -1];
//   const func1 = (event: CustomEvent<HogeTypeA>) =>
//   {
//     expect(event.detail.value).toBe(expectingA);
//     console.log(`CustomA: ${event.detail.value}`);
//   };
//   const func2 = (event: CustomEvent<HogeTypeB>) =>
//   {
//     expect(event.detail.value).toBe(expectingB1);
//     console.log(`CustomBx1: ${event.detail.value}`);
//   };
//   const func3 = (event: CustomEvent<HogeTypeB>) =>
//   {
//     expect(event.detail.value * 2).toBe(expectingB2);
//     console.log(`CustomBx2: ${event.detail.value * 2}`);
//   };
//   emitter.addEventListener("Hoge", func1);

//   expectingA = "Yahoo!";
//   emitter.dispatchEvent("Hoge", new CustomEvent<HogeTypeA>("namae", { detail: { value: "Yahoo!" } }));
//   emitter.addEventListener("Hoge", func2);
//   emitter.addEventListener("Hoge", func3);

//   expectingA = "Yahoo!";
//   emitter.dispatchEvent("Hoge", new CustomEvent<HogeTypeA>("namae", { detail: { value: "Yahoo!" } }));

//   expectingB1 = 114514;
//   expectingB2 = 114514 * 2;
//   emitter.dispatchEvent("Hoge", new CustomEvent<HogeTypeB>("namae", { detail: { value: 114514} }));
//   expectingB1 = 115514;
//   expectingB2 = 115514 * 2;
//   emitter.dispatchEvent("Hoge", new CustomEvent<HogeTypeB>("namae", { detail: { value: 115514 } }));
//   emitter.dispatchEvent("Hoge", new CustomEvent<HogeTypeC>("namae", { detail: { value: [0, 4, 5] } }));
//   //emitter.dispatchEvent("Hoge", new Event());
//   emitter.removeEventListener("Hoge", func1);
//   emitter.removeEventListener("Hoge", func2);
//   emitter.removeEventListener("Hoge", func3);
// });
