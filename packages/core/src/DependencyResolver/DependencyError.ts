export class DependencyError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "DependencyError";
  }
}