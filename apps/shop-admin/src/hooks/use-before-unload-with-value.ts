import { useEffect } from 'react';

function useBeforeUnloadWithValue(values: any[]) {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '변경 사항이 저장되지 않았습니다. 페이지를 떠나시겠습니까?';
    };

    if (values.some((value) => value !== undefined)) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [JSON.stringify(values)]);
}

export default useBeforeUnloadWithValue;
