export interface IModuleDatabase {
  install(moduleId: string): Promise<void>;
  uninstall(moduleId: string): Promise<void>;
}