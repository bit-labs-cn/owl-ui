/** 内嵌页组件缓存。同一路径只保留一份组件。 */
export class FrameRegistry {
  readonly frames = new Map<string, unknown>();

  remember(path: string, component: unknown): void {
    this.frames.set(path, component);
  }

  list(): Array<[string, unknown]> {
    return [...this.frames.entries()];
  }

  lookup(path?: string): unknown {
    if (path) return this.frames.get(path);
    return this.list();
  }

  forget(path: string): void {
    this.frames.delete(path);
  }
}

export const frameRegistry = new FrameRegistry();
