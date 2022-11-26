import { CheckModalType, CloseModalType, ModalType, OpenModalType, ResolveModalType } from '../type/modal';
import { useContext, useEffect } from 'react';
import { ModalContext } from '../ModalProvider';
import {useLocation} from 'react-router-dom';

const useModal = () => {
  const location = useLocation();
  const { pathname } = location;
  const { modals, setModals, scrollRelease, scrollFreeze } = useContext(ModalContext);

  const checkModal : CheckModalType = (
    component,
    onlyLastCheck = false,
  ) => {
    const modalList = modals.current;

    if (onlyLastCheck) {
      return modalList.length > 0
        ? modalList[modalList.length - 1].component.name === component.name
        : false;
    }
    return modalList.some(m => m.component.name === component.name);
  };

  const openModal : OpenModalType = async (
    component,
    props,
    duplicateCheck = false,
  ) => {
    return new Promise((resolve, reject) => {
      const modal: ModalType = {
        id: -1,
        props,
        component,
        resolve,
        reject,
      };

      scrollFreeze && scrollFreeze();

      const modalList = modals.current;

      let duplicate = checkModal(modal.component, true);
      if (duplicateCheck) duplicate = checkModal(modal.component);
      if (duplicate) return;

      modal.id = (modalList[modalList.length - 1]?.id ?? -1) + 1;

      setModals([...modalList, modal]);
    });
  };

  const closeModal : CloseModalType = id => {
    const newModalList = modals.current.filter(m => m.id !== id);

    setModals(newModalList);
    if (!newModalList.length && scrollRelease) scrollRelease();
  };

  const resolveModal : ResolveModalType = (modal, result) => {
    modal.resolve(result);
    closeModal(modal.id);
  };

  const resetModal = () => {
    setModals([]);
    scrollRelease && scrollRelease();
  };

  useEffect(() => {
    return () => {
      resetModal();
    };
  }, [pathname]);

  return {
    modals,
    modal: openModal,
    openModal,
    closeModal,
    resolveModal,
    checkModal,
    resetModal,
  };
};

export default useModal;
