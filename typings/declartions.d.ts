/* eslint-disable quotes */
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}
