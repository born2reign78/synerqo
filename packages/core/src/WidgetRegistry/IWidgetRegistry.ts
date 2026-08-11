import type { Widget } from "./Widget.js";

export interface IWidgetRegistry {
  register(widget: Widget): void;

  get(id: string): Widget | undefined;

  getAll(): readonly Widget[];

  has(id: string): boolean;

  remove(id: string): void;

  clear(): void;

  count(): number;
}