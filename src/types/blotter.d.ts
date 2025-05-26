declare module 'blotter' {
  export interface IBlotterTextOptions {
    family?: string;
    size?: number;
    fill?: string;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  }

  export class Text {
    constructor(text: string, options?: IBlotterTextOptions);
  }

  export class Blotter {
    static Text: typeof Text;
    
    constructor(material: Material, options?: { texts?: any });
    forText(text: any): { appendTo: (element: HTMLElement) => void };
    destroy(): void;
  }
  
  export class Material {
    uniforms: {
      [key: string]: {
        value: any;
        type?: string;
      };
    };
    
    constructor();
  }

  const BlotterExport: {
    Text: typeof Text;
    new (material: Material, options?: { texts?: any }): Blotter;
  };

  export default BlotterExport;
}

declare module 'blotter/build/materials/liquidDistortMaterial' {
  import { Material } from 'blotter';
  
  class LiquidDistortMaterial extends Material {
    constructor();
  }
  
  export default LiquidDistortMaterial;
}
