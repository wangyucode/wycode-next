import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Hits, SearchBox } from "react-instantsearch-hooks-web";
import Hit from "./hit";

export default function Search() {

    let [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

    function closeModal() {
        setIsOpenMobileNav(false);
    }

    function openModal() {
        setIsOpenMobileNav(true);
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className='mr-4 md:mr-0 dark:hover:bg-white/5 hover:bg-black/5 px-2 py-1 rounded-md flex items-center'
            >
                <MagnifyingGlassIcon className='inline mr-1 h-6 w-6 md:w-4 md:h-4' />
                <span className='hidden md:inline'>搜索</span>
            </button>
            <Transition appear show={isOpenMobileNav} as={Fragment}>
                <Dialog
                    onClose={closeModal}
                    className="relative z-50 p-4"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur" aria-hidden="true" />
                    <div className='p-4 fixed inset-0'>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative mx-auto mt-16 max-w-xl p-4 rounded-xl bg-white dark:bg-slate-900">
                                <SearchBox
                                    placeholder="搜索博客"
                                    resetIconComponent={()=><></>}
                                    classNames={{
                                        root: 'pb-4 border-b border-slate-700/30 dark:border-slate-300/30',
                                        form: 'relative mr-12',
                                        input: 'w-full p-2 pl-8 rounded border outline-offset-0 border-slate-700/30 dark:border-slate-300/30',
                                        submit: 'absolute left-2 top-3',
                                        submitIcon: 'w-4 h-4 dark:fill-slate-50 dark:stroke-slate-50',
                                        loadingIndicator: 'absolute right-8 top-3 dark:stroke-slate-50'
                                    }} />
                                <Hits hitComponent={Hit} />
                                <button className='absolute right-4 top-4 p-2 rounded-md dark:hover:bg-white/5 hover:bg-black/5' onClick={closeModal}><XMarkIcon height={24} width={24} /></button>
                            </Dialog.Panel>
                        </Transition.Child> 
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}