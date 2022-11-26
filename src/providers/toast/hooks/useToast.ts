import { CloseToastType, OpenToastType, ToastType } from '../type/toast';
import { useContext } from 'react';
import { ToastContext } from '../ToastProvider';

const useToast = () => {
  const { toasts, toastComponent, setToasts } = useContext(ToastContext);

  const toast : OpenToastType = (
    msg,
    options,
  ) => {
    const { type = 'warning', emoji = '', duration = 400, stayDuration = 1000 } = options || {};

    const toast: ToastType = {
      id: -1,
      component: toastComponent,
      msg,
      type,
      emoji,
      duration,
      stayDuration,
    };

    const toastList = toasts.current;
    const lastToast = toastList.length > 0 ? toastList[toastList.length - 1] : null;

    toast.id = (lastToast?.id ?? -1) + 1;

    const isMobile = !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i));
    if (isMobile) {
      if (lastToast) {
        if (lastToast.type !== toast.type || lastToast.msg !== toast.msg) {
          setToasts([toast]);
        }
      } else {
        setToasts([toast]);
      }
    } else {
      setToasts([...toastList, toast]);
    }
  };

  const closeToast : CloseToastType = id => {
    const toastList = toasts.current;
    setToasts(toastList.filter(t => t.id !== id));
  };

  return { toast, closeToast };
};

export default useToast;
