import { useMemo } from 'react';
import { createPortal } from 'react-dom';

interface PortalPropType {
  children: React.ReactNode,
  selector: string
}

const Portal = ({ children, selector } : PortalPropType) => {
  const rootElement : Element | null = useMemo(() => {
    if (typeof window !== 'undefined') {
      let el = document.querySelector(selector);

      if (!el) {
        el = document.createElement('div');
        el.id = selector.replace('#', '');
        document.body.append(el);
      }

      return el;
    }
    return null;
  }, [
    selector,
  ]);

  return rootElement && createPortal(children, rootElement);
};

export default Portal;
