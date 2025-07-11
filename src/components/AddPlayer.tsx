import React, { useState } from 'react';
import { doc, setDoc, collection } from 'firebase/firestore';
import Modal from "react-modal";
import { db } from '../firebase';

type Props = {
    SetRflag: React.Dispatch<React.SetStateAction<boolean>>;
    Rflag: boolean;
    roomID: string
};

Modal.setAppElement('#__next');

const AddPlayer = (props: Props) => {
    const [name, setName] = useState('');
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Firestoreにデータを追加
        try {
            const roomRef = collection(db, "rooms", props.roomID, "players");
            await setDoc(doc(db, "rooms", props.roomID, "players", name), {
                score: 0
            });
            setName('');
            setIsOpen(false);
            props.SetRflag(!props.Rflag);
        } catch (e) {
            console.error("error adding document", e)
        }
    };
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "20%",
          minWidth: "300px",
        },
    };

    return (
        <div className="max-w-md mx-auto mt-5 md:my-8">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                プレイヤーを追加
            </button>
            <div className="parents">
                <Modal isOpen={modalIsOpen} style={customStyles}>
                    <form onSubmit={handleSubmit} className="p-1 rounded-lg">
                        <div className="mb-4">
                            <label className="block text-gray-700">名前</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mt-6 mb-2 flex justify-center items-center gap-7">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                決定
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                閉じる
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default AddPlayer;