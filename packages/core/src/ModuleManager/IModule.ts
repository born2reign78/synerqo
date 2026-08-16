  import type { IKernel } from "../Kernel/IKernel.js";
  import type { ModuleManifest } from "./ModuleManifest.js";

  export interface IModule {
    /**
     * Manifeste du module.
     */
    readonly manifest: ModuleManifest;

    /**
     * Appelé avant le démarrage du module.
     */
    register(kernel: IKernel): Promise<void>;

    /**
     * Appelé après l'enregistrement.
     */
    boot(kernel: IKernel): Promise<void>;

    /**
     * Arrêt propre du module.
     */
    shutdown(kernel: IKernel): Promise<void>;
  }