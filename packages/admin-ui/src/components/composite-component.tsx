type ComponentMap<T> = {
  [K in keyof T]: React.FC<T[K]>
}
type CompositeComponent<P, T> = React.FC<P> & ComponentMap<T>

const createCompositeComponent = <P, T>(component: React.FC<P>, components: ComponentMap<T>, baseName?: string): CompositeComponent<P, T> => {
  component.displayName ??= baseName;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- 타입 추론 가능
  Object.entries(components).forEach(([k, v]) => {
    (v as React.FC).displayName ??= `${baseName}.${k}`;
  });
  return Object.assign(component, components);
}

export default createCompositeComponent;