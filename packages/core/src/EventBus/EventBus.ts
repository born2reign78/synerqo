import type { EventHandler } from "./EventHandler.js";
import type { IEventBus } from "./IEventBus.js";

export class EventBus implements IEventBus {
  private readonly handlers = new Map<string, EventHandler[]>();

  public subscribe<T>(event: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(event) ?? [];

    handlers.push(handler as EventHandler);

    this.handlers.set(event, handlers);
  }

  public unsubscribe<T>(event: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(event);

    if (!handlers) {
      return;
    }

    this.handlers.set(
      event,
      handlers.filter((h) => h !== handler)
    );
  }

  public async publish<T>(event: string, payload: T): Promise<void> {
    const handlers = this.handlers.get(event);

    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      await handler(payload);
    }
  }

  public clear(): void {
    this.handlers.clear();
  }
}