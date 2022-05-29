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
  console.log(color)
  switch(color.type) {
    case 'grad-anim': {
      return {
      "backgroundImage": `linear-gradient(135deg, ${color.gradient[0]}, ${color.gradient[1]})`,
    "backgroundSize": "600% 600%"
      }
    }
  }
  return { background: 'black'}
}
