import { Palette } from "@/lib/Palette";
import { describe, expect, test } from "@jest/globals";
import {
  Record as ImmutableRecord,
  Map as ImmutableMap,
  Set as ImmutableSet,
} from "immutable";

const __PaletteCoordBase = ImmutableRecord({
  id: 0,
  index: 0,
});

class PaletteCoord extends __PaletteCoordBase {
  constructor(id: number, index: number) {
    super({ id, index });
  }
}

test("map, setについて、Immutable性の挙動をテストする", () => {
  const defaultSet: Set<PaletteCoord> = new Set<PaletteCoord>();
  let immutableSet: ImmutableSet<PaletteCoord> = ImmutableSet<PaletteCoord>();
  const immutableSetConst: ImmutableSet<PaletteCoord> =
    ImmutableSet<PaletteCoord>();
  const defaultMap: Map<PaletteCoord, number> = new Map<PaletteCoord, number>();
  let immutableMap: ImmutableMap<PaletteCoord, number> = ImmutableMap<
    PaletteCoord,
    number
  >();
  const immutableMapConst: ImmutableMap<PaletteCoord, number> = ImmutableMap<
    PaletteCoord,
    number
  >();

  const valueA1 = new PaletteCoord(1, 1);
  const valueA2 = new PaletteCoord(1, 1);
  const valueB = new PaletteCoord(1, 2);
  const valueC = new PaletteCoord(124, 1);
  const valueD = new PaletteCoord(-114, 150);

  defaultSet.add(valueA1);
  defaultMap.set(valueA1, 555);

  // Assignment is needed.
  immutableSet = immutableSet.add(valueA1);
  immutableMap = immutableMap.set(valueA1, 1055);

  immutableSetConst.add(valueA1);
  immutableMapConst.set(valueA1, 1055);
  console.log(defaultSet);
  expect(defaultSet.has(new __PaletteCoordBase())).toBeFalsy();
  expect(defaultSet.has(valueA1)).toBeTruthy();
  expect(defaultSet.has(valueA2)).toBeFalsy();
  expect(defaultSet.has(valueB)).toBeFalsy();
  expect(defaultSet.has(valueC)).toBeFalsy();
  expect(defaultSet.has(valueD)).toBeFalsy();

  expect(defaultMap.has(new __PaletteCoordBase())).toBeFalsy();
  expect(defaultMap.has(valueA1)).toBeTruthy();
  expect(defaultMap.has(valueA2)).toBeFalsy();
  expect(defaultMap.has(valueB)).toBeFalsy();
  expect(defaultMap.has(valueC)).toBeFalsy();
  expect(defaultMap.has(valueD)).toBeFalsy();

  expect(immutableSet.has(new __PaletteCoordBase())).toBeFalsy();
  expect(immutableSet.has(valueA1)).toBeTruthy();
  expect(immutableSet.has(valueA2)).toBeTruthy();
  expect(immutableSet.has(valueB)).toBeFalsy();
  expect(immutableSet.has(valueC)).toBeFalsy();
  expect(immutableSet.has(valueD)).toBeFalsy();

  expect(immutableMap.has(new __PaletteCoordBase())).toBeFalsy();
  expect(immutableMap.has(valueA1)).toBeTruthy();
  expect(immutableMap.has(valueA2)).toBeTruthy();
  expect(immutableMap.has(valueB)).toBeFalsy();
  expect(immutableMap.has(valueC)).toBeFalsy();
  expect(immutableMap.has(valueD)).toBeFalsy();

  expect(immutableSetConst.has(new __PaletteCoordBase())).toBeFalsy();
  expect(immutableSetConst.has(valueA1)).toBeFalsy();
  expect(immutableSetConst.has(valueA2)).toBeFalsy();
  expect(immutableSetConst.has(valueB)).toBeFalsy();
  expect(immutableSetConst.has(valueC)).toBeFalsy();
  expect(immutableSetConst.has(valueD)).toBeFalsy();

  expect(immutableMapConst.has(new __PaletteCoordBase())).toBeFalsy();
  expect(immutableMapConst.has(valueA1)).toBeFalsy();
  expect(immutableMapConst.has(valueA2)).toBeFalsy();
  expect(immutableMapConst.has(valueB)).toBeFalsy();
  expect(immutableMapConst.has(valueC)).toBeFalsy();
  expect(immutableMapConst.has(valueD)).toBeFalsy();
});
