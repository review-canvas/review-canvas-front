import { useRef, useEffect } from 'react';

interface IntersectionBoundaryProps {
  loadMore: () => unknown;
  offset?: number;
}

function IntersectionBoundary({ loadMore, offset }: IntersectionBoundaryProps) {
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional
  }, []);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    if (entities[0].isIntersecting) {
      loadMore();
    }
  };

  return (
    <div
      className="w-full h-1 bg-transparent"
      ref={loader}
      style={{
        transform: `translateY(${offset}px)`,
      }}
    />
  );
}

export default IntersectionBoundary;
