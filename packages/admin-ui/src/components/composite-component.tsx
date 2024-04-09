type ComponentMap<T> = {
  [K in keyof T]: React.FC<T[K]>;
};
type CompositeComponent<P, T> = React.FC<P> & ComponentMap<T>;

const createCompositeComponent = <P, T>(
  component: React.FC<P>,
  components: ComponentMap<T>,
  baseName?: string,
): CompositeComponent<P, T> => {
  component.displayName ??= baseName;
  Object.entries(components).forEach(([k, v]) => {
    (v as React.FC).displayName ??= `${baseName}.${k}`;
  });
  return Object.assign(component, components);
};

export default createCompositeComponent;
