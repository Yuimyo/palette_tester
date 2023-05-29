<script setup lang="ts">
import { defineComponent, ref, computed, ComputedRef, onMounted } from "vue";
import ColorPicker from "@/components/color_picker/ColorPicker.vue";
import PaletteViewer from "@/components/color_picker/PaletteViewer.vue";
import { Palette, IColorSource, MonoColor } from "@/lib/Palette";

defineComponent({
  name: "AboutView",
  components: {
    ColorPicker,
    PaletteViewer,
  },
});

// { paletteId, index } <-> colorSourceId

class PaletteCoord {
  public readonly id: number;
  public readonly index: number;
  constructor(id: number, index: number) {
    this.id = id;
    this.index = index;
  }
}

const toPaletteCoord: Set<PaletteCoord>[] = [];
const toColorSourceId: Record<PaletteCoord, number> = new Map<
  PaletteCoord,
  number
>();

const colorSourceElements = ref<{ id: number; source: MonoColor }[]>([]);

let _colorSourceElementId = 0;
function addColorSource() {
  let i = _colorSourceElementId++;
  let colorSource = new MonoColor();
  colorSourceElements.value.push({ id: i, source: colorSource });
  toPaletteCoord.push(new Set<PaletteCoord>());
  colorSource.onChanged.addEventListener((e) => {
    toPaletteCoord[i].forEach((value) => {
      setColorNumber(value.id, value.index, i);
    });
  });
}
function removeColorSource() {
  // 「palette内の各種色情報とcolorSourceIdとの紐づけをどのように解消・初期化するのか」を決める必要がある。
  // 対となるaddColorSource()にて追加されるcolorSource.onChanged上のリスナーは、このままではGCにて回収される予定。
  throw new Error("Not Implemented.");
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
  throw new Error("Not Implemented.");
}

for (let i = 0; i < 8; i++) {
  addColorSource();
}

for (let i = 0; i < 3; i++) {
  addPalette();
}

const onColorUpClicked = (paletteId: number, index: number) => {
  const coord = new PaletteCoord(paletteId, index);
  console.log(toColorSourceId);
  console.log(coord);
  console.log(toColorSourceId.get(coord));
  const currentColorSourceId = toColorSourceId.get(coord)!;
  if (currentColorSourceId == colorSourceElements.value.length - 1) return; // 既に最大値であるため、処理要求は無視する。

  unpair(coord, currentColorSourceId);
  pair(coord, currentColorSourceId + 1);

  paletteElements.value[paletteId].palette.replace(
    index,
    colorSourceElements.value[currentColorSourceId + 1].source.getColor()
  );
  setColorNumber(paletteId, index, currentColorSourceId + 1);
};
const onColorDownClicked = (paletteId: number, index: number) => {
  const coord = new PaletteCoord(paletteId, index);
  const currentColorSourceId = toColorSourceId.get(coord)!;
  if (currentColorSourceId == 0) return; // 既に最小値であるため、処理要求は無視する。

  unpair(coord, currentColorSourceId);
  pair(coord, currentColorSourceId - 1);

  paletteElements.value[paletteId].palette.replace(
    index,
    colorSourceElements.value[currentColorSourceId - 1].source.getColor()
  );
  setColorNumber(paletteId, index, currentColorSourceId - 1);
};

const onColorAddRequested = (paletteId: number) => {
  let index = paletteElements.value[paletteId].palette.length;
  let colorSourceId = 0; // 初期値
  let colorSource = colorSourceElements.value[colorSourceId].source;

  pair(new PaletteCoord(paletteId, index), colorSourceId);
  paletteElements.value[paletteId].palette.push(colorSource.getColor());
};
const onColorRemoveRequested = (paletteId: number) => {
  let index = paletteElements.value[paletteId].palette.length - 1;
  let colorSourceId = toColorSourceId.get(new PaletteCoord(paletteId, index))!;
  let colorSource = colorSourceElements.value[colorSourceId].source;

  unpair(new PaletteCoord(paletteId, index), colorSourceId);
  paletteElements.value[paletteId].palette.pop();
};

function pair(coord: PaletteCoord, colorSourceId: number) {
  toPaletteCoord[colorSourceId].add(coord);
  toColorSourceId.set(coord, colorSourceId);
}
function unpair(coord: PaletteCoord, colorSourceId: number) {
  // console.log(toPaletteCoord);
  // console.log(toPaletteCoord[colorSourceId]);
  if (toPaletteCoord[colorSourceId].has(coord)) {
    toPaletteCoord[colorSourceId].delete(coord);
  }
  if (toColorSourceId.has(coord)) {
    toColorSourceId.delete(coord);
  }
}

const setColorNumber = (paletteId: number, index: number, value: number) => {
  paletteRefs.value[paletteId]?.setColorNumber(index, value);
};

let paletteRefs: ComputedRef<(InstanceType<typeof PaletteViewer> | null)[]> =
  computed(() => skipUnwrap.paletteRef.value);

function colorIdsToCodes(colorIds: number[]): string[] {
  let ret: string[] = [];
  for (let i = 0; i < colorIds.length; i++) {
    const id = colorIds[i];
    let exist = false;
    let code = "#000000";
    for (let j = 0; j < colorSourceElements.value.length; j++) {
      if (colorSourceElements.value[j].id == id) {
        exist = true;
        code = colorSourceElements.value[j].source.getColor().ToCode();
        // console.log(code);
        break;
      }
    }
    if (exist) {
      ret.push(code);
    } else {
      throw new Error(`that colorIds contain id("${id}") that doesn't exist.`);
    }
  }
  return ret;
}

// https://github.com/vuejs/core/issues/5525#issuecomment-1062336844
const skipUnwrap = {
  paletteRef: ref([]),
};

// onMounted(() => {
//   reloadPalettes();
// });
</script>

<template>
  <div class="flex">
    <div class="m-4">
      <div v-for="detail in paletteElements" :key="detail.id">
        <PaletteViewer
          :ref="skipUnwrap.paletteRef"
          :colorSources="colorSourceElements.map((x) => x.source)"
          :palette="detail.palette"
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
    <div>
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
</template>
