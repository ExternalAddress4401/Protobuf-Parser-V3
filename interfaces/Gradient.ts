export interface Gradient {
  AlphaKeys: {
    Alpha: number;
    Time: number;
  }[];
  ColorKeys: {
    Color: string;
    Time: number;
  };
}
