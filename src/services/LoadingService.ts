type Listener = (isLoading: boolean) => void;

class LoadingService {
  private count = 0;
  private listeners = new Set<Listener>();

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    // notify initial state
    fn(this.isLoading());
    return () => this.listeners.delete(fn);
  }

  private notify() {
    const state = this.isLoading();
    this.listeners.forEach((fn) => fn(state));
  }

  isLoading() {
    return this.count > 0;
  }

  increment() {
    this.count += 1;
    this.notify();
  }

  decrement() {
    if (this.count > 0) this.count -= 1;
    this.notify();
  }

  reset() {
    this.count = 0;
    this.notify();
  }
}

export default new LoadingService();
