export class ManifestValidationError extends Error {
  public constructor(message: string) {
    super(message);

    this.name = "ManifestValidationError";
  }
}