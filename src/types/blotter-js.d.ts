declare module 'blotter.js' {
  interface IBlotterTextOptions {
    family?: string;
    size?: number;
    fill?: string;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  }

  class Text {
    constructor(text: string, options?: IBlotterTextOptions);
  }

  class Material {
    uniforms: {
      [key: string]: {
        value: any;
        type?: string;
      };
    };
  }


  class LiquidDistortMaterial extends Material {
    constructor();
  }

  class Blotter {
    static Text: typeof Text;
    static LiquidDistortMaterial: typeof LiquidDistortMaterial;
    
    constructor(material: Material, options?: { texts?: any });
    forText(text: any): { appendTo: (element: HTMLElement) => void };
    destroy(): void;
  }

  const _default: typeof Blotter;
  export default _default;
}
