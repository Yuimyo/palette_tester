export class CustomEventEmitter<TEvent extends Event> {
  // イベントリスナーを格納するためのマップを定義します
  private listeners: Map<string, ((event: TEvent) => void)[]> = new Map();

  // イベントリスナーを追加するメソッドを定義します
  public addEventListener(
    eventName: string,
    listener: (event: TEvent) => void
  ) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    this.listeners.get(eventName)?.push(listener);
  }

  // イベントリスナーを削除するメソッドを定義します
  public removeEventListener(
    eventName: string,
    listener: (event: TEvent) => void
  ) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  // イベントを発火するメソッドを定義します
  public dispatchEvent(eventName: string, event: TEvent) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(event));
    }
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
