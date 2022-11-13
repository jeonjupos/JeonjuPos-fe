import { useRouter } from 'next/router';
import { useState } from 'react';

const useQueryChange = () => {
  const router = useRouter();
  const [pushState, setPushState] = useState(false);

  const routerPush = async (url: string, shallow: boolean | undefined = false) => {
    if (!pushState) {
      setPushState(true);
      await router.push(url);
      setPushState(false);
    }
  };

  const routerReplace = async (url: string) => {
    if (!pushState) {
      setPushState(true);
      await router.replace(url);
      setPushState(false);
    }
  };

  return { router, routerPush, routerReplace };
};

export default useQueryChange;
