import type { IConfiguration } from "./IConfiguration.js";
import type { ConfigurationOptions } from "./ConfigurationOptions.js";

/**
 * Implémentation du service de configuration.
 */
export class Configuration implements IConfiguration {
  private readonly values = new Map<string, unknown>();

  public constructor(
    private readonly options: ConfigurationOptions
  ) {}

  /**
   * Charge les options dans la mémoire.
   */
  public async load(): Promise<void> {
    this.values.set("env", this.options.env);
    this.values.set("debug", this.options.debug);
    this.values.set("version", this.options.version);
  }

  public get<T>(key: string): T {
    if (!this.values.has(key)) {
      throw new Error(`Configuration key "${key}" not found.`);
    }

    return this.values.get(key) as T;
  }

  public set<T>(key: string, value: T): void {
    this.values.set(key, value);
  }

  public has(key: string): boolean {
    return this.values.has(key);
  }

  public all(): ReadonlyMap<string, unknown> {
    return this.values;
  }
}