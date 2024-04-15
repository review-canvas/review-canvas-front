type ComponentMap<T> = {
  [K in keyof T]: React.FC<T[K]>;
};
type CompositeComponent<P, T> = React.FC<P> & ComponentMap<T>;

const createCompositeComponent = <P, T>(
  baseComponent: React.FC<P>,
  additionalComponents: ComponentMap<T>,
  baseName?: string,
): CompositeComponent<P, T> => {
  baseComponent.displayName ??= baseName;
  Object.entries(additionalComponents).forEach(([k, v]) => {
    (v as React.FC).displayName ??= `${baseName}.${k}`;
  });
  return Object.assign(baseComponent, additionalComponents);
};

export default createCompositeComponent;
