import { MutableRefObject, useEffect, useRef, useState } from 'react';

export function useOnScreen(ref: MutableRefObject<any>): boolean {
  /****
     * хук проверяет, находится ли компонент в видимой области экрана
     * (например, видна ли карточка во время скролла списка карточек)
     * принимает реф на проверяемый компонент, возвращает boolean
     * 
     * пример:
       const DummyComponent = () => {
    
          const ref = useRef()
          const isVisible = useOnScreen(ref)
          
          return <div ref={ref}>{isVisible && `Yep, I'm on screen`}</div>
        }
     */

  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}
