import generateIcon from "../../assets/generateIcon.svg"

import { useEffect, useRef, useState } from "react";
import UserInputModal from "./UserInputModal";

const GenerateButton = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const buttonRef = useRef(null);

    useEffect(() => {
        const updateButtonPosition = () => {
            const inputField = document.querySelector('.msg-form__contenteditable');
            const rect = inputField.getBoundingClientRect();
            const button = buttonRef.current;
            button.style.left = `${rect.right - 25}px`;
            button.style.top = `${rect.bottom - 20}px`;
        };

        const handleFocus = () => {
            const button = buttonRef.current;
            button.style.display = 'block';
            updateButtonPosition();
        };

        const handleBlur = () => {
            setTimeout(() => {
                const button = buttonRef.current;
                button.style.display = 'none';
            }, 500);
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    let inputField = document.querySelector('.msg-form__contenteditable');
                    if (inputField) {
                        inputField.addEventListener('focus', handleFocus);
                        inputField.addEventListener('blur', handleBlur);
                        window.addEventListener('resize', updateButtonPosition);
                        window.addEventListener('scroll', updateButtonPosition);

                        // Disconnect the observer when done
                        observer.disconnect();
                    }
                }
            });
        });

        // Start observing the document with the configured parameters
        observer.observe(document, { childList: true, subtree: true });

        return () => {
            let inputField = document.querySelector('.msg-form__contenteditable');
            if (inputField) {
                inputField.removeEventListener('focus', handleFocus);
                inputField.removeEventListener('blur', handleBlur);
            }
            window.removeEventListener('resize', updateButtonPosition);
            window.removeEventListener('scroll', updateButtonPosition);
        };
    }, []);

    const handleClick = () => {
        openModal()
    }

    return (
        <>
            <button
                onClick={handleClick}
                ref={buttonRef}
                type="button"
                style={{ position: 'absolute', display: 'none' }}
                className="flex flex-row items-center border-none hover:scale-105 transform transition-all duration-500">
                <span className="inline-flex items-center justify-center w-8 h-4 text-xs font-semibold rounded-full hover:cursor-pointer -right-16 -bottom-4">
                    <img src={generateIcon} alt="" />
                </span>
            </button>
            <UserInputModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default GenerateButton;