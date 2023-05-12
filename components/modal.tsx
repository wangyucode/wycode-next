import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ isOpen, setIsOpen, children}) {
  return (
    <Transition
      appear
      show={isOpen}
    >
      <Dialog
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/30 flex min-h-full items-center justify-center p-4 text-center"
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="scale-50"
          enterTo="scale-100"
          leave="ease-in duration-200"
          leaveFrom="scale-100"
          leaveTo="scale-50"
        >
          <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-slate-800">
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
