import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import Modal from "react-modal";
import { db } from '../firebase';

Modal.setAppElement(".parents");

type Props = {
    flag: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddRoom = (props: Props) => {
    const [room, setRoom] = useState('');
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Firestoreにデータを追加
        try {
            const docRef = await addDoc(collection(db, "rooms"), {
                name: room,
            });
            collection(db, "rooms", docRef.id, "players");
            const ref = collection(db, "rooms", )
            setRoom('');
            setIsOpen(false);
            props.set(!props.flag);
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
          minWidth: "0%",
          maxWidth: "50%",
        },
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                ルームを追加
            </button>
            <div className="parents">
                <Modal isOpen={modalIsOpen} style={customStyles}>
                    <form onSubmit={handleSubmit} className="p-1 rounded-lg">
                        <div className="mb-4">
                            <label className="block text-gray-700">ルーム名</label>
                            <input
                                type="text"
                                value={room}
                                onChange={handleNameChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mt-6 mb-2 flex justify-center items-center gap-7">
                            <button
                                type="submit"
                                className="px-3 py-2 md:px-4 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                決定
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-3 py-2 md:px-4 bg-green-500 text-white rounded hover:bg-green-600"
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

export default AddRoom;