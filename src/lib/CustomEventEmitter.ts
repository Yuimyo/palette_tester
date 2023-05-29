export class CustomEventEmitter<TEvent extends Event> {
  private actions: ((event: TEvent) => void)[] = [];

  // イベントリスナーを追加するメソッドを定義します
  public addEventListener(action: (event: TEvent) => void) {
    this.actions.push(action);
  }

  // イベントリスナーを削除するメソッドを定義します
  public removeEventListener(action: (event: TEvent) => void) {
    const index = this.actions.indexOf(action);
    if (index !== -1) {
      this.actions.splice(index, 1);
    }
  }

  // イベントを発火するメソッドを定義します
  public dispatchEvent(event: TEvent) {
    this.actions.forEach((listener) => listener(event));
  }
}
