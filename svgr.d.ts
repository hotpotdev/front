
declare module '*.svg' {
  const content: React.ElementType<SVGAttributes<string>>;
  export default content
}

declare module "*.svg?url" {
  const content: string
  export default content;
}
