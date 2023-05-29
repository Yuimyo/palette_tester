<script setup lang="ts">
import { defineComponent, ref, computed, ComputedRef } from "vue";
import { Record as ImmutableRecord, Map, Set } from "immutable";
import { Palette, MonoColor } from "@/lib/Palette";
import ColorPicker from "@/components/color_picker/ColorPicker.vue";
import PaletteViewer from "@/components/color_picker/PaletteViewer.vue";

defineComponent({
  name: "PaletteMakerView",
  components: {
    ColorPicker,
    PaletteViewer,
  },
});

// { paletteId, index } <-> colorSourceId

const __PaletteCoordBase = ImmutableRecord({
  id: 0,
  index: 0,
});
class PaletteCoord extends __PaletteCoordBase {
  constructor(id: number, index: number) {
    super({ id, index });
  }
}

let toPaletteCoord: Set<PaletteCoord>[] = [];
let toColorSourceId: Map<PaletteCoord, number> = Map<PaletteCoord, number>();

function pair(coord: PaletteCoord, colorSourceId: number) {
  toPaletteCoord[colorSourceId] = toPaletteCoord[colorSourceId].add(coord);
  toColorSourceId = toColorSourceId.set(coord, colorSourceId);
}
function unpair(coord: PaletteCoord, colorSourceId: number) {
  if (toPaletteCoord[colorSourceId].has(coord)) {
    toPaletteCoord[colorSourceId] = toPaletteCoord[colorSourceId].delete(coord);
  }
  if (toColorSourceId.has(coord)) {
    toColorSourceId = toColorSourceId.delete(coord);
  }
}

const colorSourceElements = ref<{ id: number; source: MonoColor }[]>([]);

let _colorSourceElementId = 0;
function addColorSource() {
  let i = _colorSourceElementId++;
  let colorSource = new MonoColor();
  colorSourceElements.value.push({ id: i, source: colorSource });
  toPaletteCoord.push(Set<PaletteCoord>());
  colorSource.onChanged.addEventListener((e) => {
    toPaletteCoord[i].forEach((coord) => {
      setColor(coord, i);
    });
  });
}
function removeColorSource() {
  // 削除しようとするColorSourceを使用中なら、処理をしない。
  if (toPaletteCoord.length == 0) return;
  if (toPaletteCoord[toPaletteCoord.length - 1].count() > 0) return;

  _colorSourceElementId--;
  colorSourceElements.value.pop();
  toPaletteCoord.pop();
  // 対となるaddColorSource()にて追加されるcolorSource.onChanged上のリスナーは、このままではGCにて回収される予定。
}

const paletteElements = ref<{ id: number; palette: Palette }[]>([]); //  sourceIds: number[];

let _paletteElementId = 0;
function addPalette() {
  paletteElements.value.push({
    id: _paletteElementId++,
    palette: new Palette(),
  });
}
function removePalette() {
  if (paletteElements.value.length == 0) return;
  _paletteElementId--;
  paletteElements.value.pop();
}

for (let i = 0; i < 1; i++) {
  addColorSource();
}

for (let i = 0; i < 1; i++) {
  addPalette();
}

const setColor = (coord: PaletteCoord, sourceId: number) => {
  const length = paletteElements.value[coord.id].palette.length;
  const color = colorSourceElements.value[sourceId].source.getColor();
  if (coord.index < length) {
    paletteElements.value[coord.id].palette.replace(coord.index, color);
  } else if (coord.index == length) {
    paletteElements.value[coord.id].palette.push(color);
  } else {
    throw new Error("Out of range.");
  }

  paletteRefs.value[coord.id]?.setColor(coord.index, color);
  paletteRefs.value[coord.id]?.setColorNumber(coord.index, sourceId + 1);
};

const removeColor = (coord: PaletteCoord) => {
  paletteElements.value[coord.id].palette.remove(coord.index);
};

const logg = (e: MouseEvent) => {
  console.log(`toPaletteCoord`);
  for (let i = 0; i < toPaletteCoord.length; i++) {
    for (let x of toPaletteCoord[i].entries()) {
      console.log(`    [${i}]:`);
      console.log(`        ${x[0]}`);
    }
  }
  console.log(`toColorSourceId`);
  for (let x of toColorSourceId.entries()) {
    console.log(`    [${x[0]}]: ${x[1]}`);
  }
};

const onColorUpClicked = (paletteId: number, index: number) => {
  const coord = new PaletteCoord(paletteId, index);
  const colorSourceId = toColorSourceId.get(coord);

  if (colorSourceId == undefined) return;
  if (colorSourceId == colorSourceElements.value.length - 1) return; // 既に最大値であるため、処理要求は無視する。

  unpair(coord, colorSourceId);
  pair(coord, colorSourceId + 1);

  setColor(coord, colorSourceId + 1);
};
const onColorDownClicked = (paletteId: number, index: number) => {
  const coord = new PaletteCoord(paletteId, index);
  const colorSourceId = toColorSourceId.get(coord);

  if (colorSourceId == undefined) return;
  if (colorSourceId == 0) return; // 既に最小値であるため、処理要求は無視する。

  unpair(coord, colorSourceId);
  pair(coord, colorSourceId - 1);

  setColor(coord, colorSourceId - 1);
};

const onColorAddRequested = (paletteId: number) => {
  if (toPaletteCoord.length == 0) return;
  const index = paletteElements.value[paletteId].palette.length;
  const coord = new PaletteCoord(paletteId, index);
  const colorSourceId = 0; // 初期値

  pair(coord, colorSourceId);

  setColor(coord, colorSourceId);
};
const onColorRemoveRequested = (paletteId: number) => {
  const index = paletteElements.value[paletteId].palette.length - 1;
  const coord = new PaletteCoord(paletteId, index);
  const colorSourceId = toColorSourceId.get(new PaletteCoord(paletteId, index));

  if (colorSourceId == undefined) return;

  unpair(coord, colorSourceId);

  removeColor(coord);
};

let paletteRefs: ComputedRef<(InstanceType<typeof PaletteViewer> | null)[]> =
  computed(() => skipUnwrap.paletteRef.value);

// https://github.com/vuejs/core/issues/5525#issuecomment-1062336844
const skipUnwrap = {
  paletteRef: ref([]),
};
</script>

<template>
  <div class="inline-block border-0 border-emerald-600 place-content-start">
    <div class="flex bg-gray-500 shadow-lg shadow-stone-400 rounded-lg">
      <div class="m-2 p-2 bg-neutral-50 shadow-lg shadow-stone-400 rounded-lg">
        <div>
          <div
            class="inline-block m-2 p-2 bg-neutral-50 shadow-lg shadow-stone-400 rounded-lg"
          >
            <button
              class="w-4 hover:bg-neutral-100 active:bg-neutral-200 focus:outline-dotted focus:outline-1 focus:outline-violet-300"
              type="button"
              @click="addPalette"
            >
              +
            </button>
          </div>
          <div class="inline-block">{{ paletteElements.length }}</div>
          <div
            class="inline-block m-2 p-2 bg-neutral-50 shadow-lg shadow-stone-400 rounded-lg"
          >
            <button
              class="w-4 hover:bg-neutral-100 active:bg-neutral-200 focus:outline-dotted focus:outline-1 focus:outline-violet-300"
              type="button"
              @click="removePalette"
            >
              -
            </button>
          </div>
        </div>
        <div v-for="detail in paletteElements" :key="detail.id">
          <PaletteViewer
            :ref="skipUnwrap.paletteRef"
            :palette="detail.palette"
            :default-text="`1`"
            @requested-add="onColorAddRequested(detail.id)"
            @requested-remove="onColorRemoveRequested(detail.id)"
            @color-clicked="
              (index: number, type: string) => {
                if (type == `up`){
                  onColorUpClicked(detail.id, index);
                }
                if (type == `down`) {
                  onColorDownClicked(detail.id, index);
                }
              }
            "
          />
        </div>
      </div>
      <div class="m-2 p-2 bg-neutral-50 shadow-lg shadow-stone-300 rounded-lg">
        <div>
          <div
            class="inline-block m-2 p-2 bg-neutral-50 shadow-lg shadow-stone-400 rounded-lg"
          >
            <button
              class="w-4 hover:bg-neutral-100 active:bg-neutral-200 focus:outline-dotted focus:outline-1 focus:outline-violet-300"
              type="button"
              @click="addColorSource"
            >
              +
            </button>
          </div>
          <div class="inline-block">{{ colorSourceElements.length }}</div>
          <div
            class="inline-block m-2 p-2 bg-neutral-50 shadow-lg shadow-stone-400 rounded-lg"
          >
            <button
              class="w-4 hover:bg-neutral-100 active:bg-neutral-200 focus:outline-dotted focus:outline-1 focus:outline-violet-300"
              type="button"
              @click="removeColorSource"
            >
              -
            </button>
          </div>
        </div>
        <div v-for="colorSource in colorSourceElements" :key="colorSource.id">
          <ColorPicker
            :colorSource="colorSource.source"
            @onChanged="
              (color) => {
                //colorSources[colorSource.id].value.setColor(color);
                // reloadPalettes();
              }
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
