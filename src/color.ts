export interface SolidColor {
  type: 'solid',
  hue: string;
}

export interface AnimatedGradientColor {
  type: 'grad-anim',
  gradient: [string, string];
}

export type Color = SolidColor | AnimatedGradientColor;

export const getColorStyle = (color: Color) => {
  switch(color.type) {
    case 'grad-anim': {
      let gradColorStr = ''
      for(let i = 0; i < color.gradient.length; i++) {
        const hue = color.gradient[i];
        gradColorStr += hue;
        if(i !== color.gradient.length - 1) {
          gradColorStr += ',';
        }
      }
      return {
      "backgroundImage": `linear-gradient(0deg, ${gradColorStr})`,
    "backgroundSize": "600% 600%"
      }
    }
    case 'solid': {
      return {
        backgroundColor: color.hue
      }
    }
  }
}
