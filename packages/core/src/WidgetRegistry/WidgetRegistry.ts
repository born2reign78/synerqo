import type { IWidgetRegistry } from "./IWidgetRegistry.js";
import type { Widget } from "./Widget.js";

export class WidgetRegistry implements IWidgetRegistry {
  private readonly widgets = new Map<string, Widget>();

  public register(widget: Widget): void {
    if (this.widgets.has(widget.id)) {
      throw new Error(`Widget "${widget.id}" already exists.`);
    }

    this.widgets.set(widget.id, widget);
  }

  public get(id: string): Widget | undefined {
    return this.widgets.get(id);
  }

  public getAll(): readonly Widget[] {
    return [...this.widgets.values()];
  }

  public has(id: string): boolean {
    return this.widgets.has(id);
  }

  public remove(id: string): void {
    this.widgets.delete(id);
  }

  public clear(): void {
    this.widgets.clear();
  }

  public count(): number {
    return this.widgets.size;
  }
}