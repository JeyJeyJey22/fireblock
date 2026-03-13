import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ContactForm from './ContactForm';

export default function ContactModal({ isOpen, setIsOpen }) {
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-bold leading-6 text-white mb-2 pr-8"
                                >
                                    Свяжитесь с нами
                                </Dialog.Title>
                                <div className="mt-2 mb-8 text-gray-400">
                                    <p>Оставьте заявку, и наши специалисты свяжутся с вами для расчёта стоимости или бесплатной консультации.</p>
                                </div>

                                <ContactForm />

                                <div className="absolute top-4 right-4">
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-white transition focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="sr-only">Закрыть</span>
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
