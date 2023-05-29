export class CustomEventEmitter2 {
  // イベントリスナーを格納するためのマップを定義します
  private listeners: Map<string, EventContainer[]> = new Map();

  // イベントリスナーを追加するメソッドを定義します
  public addEventListener<TEvent extends Event>(
    eventName: string,
    action: (event: TEvent) => void
  ) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    const listener = new InternalEventContainer<TEvent>(action);
    this.listeners.get(eventName)?.push(listener);
  }

  // イベントリスナーを削除するメソッドを定義します
  public removeEventListener<TEvent extends Event>(
    eventName: string,
    action: (event: TEvent) => void
  ) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      const listener = new InternalEventContainer<TEvent>(action);
      const index = eventListeners.indexOf(listener);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  // イベントを発火するメソッドを定義します
  public dispatchEvent<TEvent extends Event>(eventName: string, event: TEvent) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener.act(event));
    }
  }
}

abstract class EventContainer {
  public abstract act(event: Event): void;
}

class InternalEventContainer<TEvent extends Event> extends EventContainer {
  private action: (event: TEvent) => void;
  constructor(action: (event: TEvent) => void) {
    super();
    this.action = action;
  }

  // 型のある言語なら、ここで型違いを弾けばよかったが…
  // JavaScript/TypeScriptでは、構造体の型判別は意外とややこしいようだ
  // そういう型違いを弾くために型毎の異なる実装が必要になることが分かった
  // ここがボトルネックとなり、CustomEventEmitter2は没とすることにした。
  public act(event: Event) {
    const convertedEvent: TEvent = event as TEvent;
    if (convertedEvent == null) return;
    this.internalAct(convertedEvent);
  }

  private internalAct(event: TEvent) {
    this.action(event);
  }
}

// // イベントの型を定義します
// interface MyCustomEvent extends Event {
//   detail: {
//     message: string;
//   };
// }

// const myEvent = new CustomEvent<MyCustomEvent>('my-event', {
//   bubbles: true,
//   detail: {
//     message: 'カスタムイベントが発生しました！',
//   },
// });

// newEvent: CustomEvent = new CustomEvent('build', { detail: 12345 });

// fire(){
//     this.dispatchEvent(newEvent);
// }

// let hogeh = new Hogeh();
// hogeh.addEventListener("build");
// elem.addEventListener('awesome', (e) => console.log(e.detail.text()));
