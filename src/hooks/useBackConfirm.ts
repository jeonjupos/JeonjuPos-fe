import Router from 'next/router';
import { useEffect } from 'react';

const useBackConfirm = (unsavedCondition: boolean, callback: () => boolean) => {
  useEffect(() => {
    const routeChangeStart = () => {
      if (!unsavedCondition) return;
      const ok = callback();
      if (!ok) {
        Router.events.emit('routeChangeError');
        // Router.replace(Router, Router.asPath, { shallow: true });
        throw 'Abort route change. Please ignore this error.';
      }
    };

    Router.events.on('routeChangeStart', routeChangeStart);

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [unsavedCondition]);
};

export default useBackConfirm;
