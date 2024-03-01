import { useEffect, useRef, useState } from "react"
import { VscSend } from "react-icons/vsc";
import { GrPowerCycle } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";

const UserInputModal = ({ isOpen, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([])

    const handleGenerate = (e) => {
        e.preventDefault();
        setMessages([{ isUser: true, text: prompt }])
        setTimeout(() => {
            setMessages((prev) => {
                return [
                    ...prev,
                    { isUser: false, text: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask." }
                ]
            })
        }, 1500);
        setPrompt("");
    }

    const handleInsertText = () => {
        let inputField = document.querySelector('.msg-form__contenteditable');
        let pTag = inputField.querySelector('p');
        let newText = messages[messages.length - 1].text;
        pTag.textContent = newText;
        onClose()
        setMessages([])
    }

    return (
        <>
            {isOpen && (
                <div className="fixed bg-gray-800/50 flex items-center justify-center h-screen w-screen overflow-hidden" onClick={onClose}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        tabIndex={-1}
                        className="overflow-hidden h-max w-1/3 bg-[#F9FAFB] opacity-100 p-6 rounded-lg"
                    >
                        <div className="w-full space-y-6 mb-6">
                            {messages.map((message, index) => (
                                <div key={index} className={`w-full flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] rounded-lg p-4 ${message.isUser ? 'bg-gray-200' : 'bg-blue-100'}`}>
                                        <p className="text-gray-500 text-2xl">
                                            {message.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleGenerate} className="space-y-6">
                            <input
                                type="text"
                                placeholder="Your prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full min-h-16 px-4 py-1 rounded-lg border border-gray-200 font-semibold text-2xl text-gray-600 focus:outline-none focus:ring-1 focus:border-2 focus:border-gray-300"
                            />
                            <div className="flex justify-end items-center gap-6">
                                {
                                    messages.length > 0 ? (
                                        <>
                                            <button type="button" onClick={handleInsertText} className="flex items-center gap-2 py-3 px-6 border-2 border-gray-500 rounded-lg text-white">
                                                <FaArrowDown size={16} strokeWidth={1} className="w-6 h-6 text-gray-500" />
                                                <span className="font-semibold text-2xl text-gray-500">Insert</span>
                                            </button>
                                            <button disabled className="flex items-center gap-2 py-3 px-6 bg-blue-500 rounded-lg text-white">
                                                <GrPowerCycle size={16} strokeWidth={1} className="w-6 h-6" />
                                                <span className="font-semibold text-2xl">Regenerate</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button type="submit" className="flex items-center gap-2 py-3 px-6 bg-blue-500 rounded-lg text-white">
                                            <VscSend size={16} strokeWidth={1} className="w-6 h-6" />
                                            <span className="font-semibold text-2xl">Generate</span>
                                        </button>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
export default UserInputModal
