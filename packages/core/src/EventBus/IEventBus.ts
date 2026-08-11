import type { EventHandler } from "./EventHandler.js";

export interface IEventBus {
  subscribe<T>(event: string, handler: EventHandler<T>): void;

  unsubscribe<T>(event: string, handler: EventHandler<T>): void;

  publish<T>(event: string, payload: T): Promise<void>;

  clear(): void;
}