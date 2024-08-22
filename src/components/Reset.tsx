import React, { useState } from 'react';
import Modal from "react-modal";
import { doc, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

type Props = {
    SetRflag: React.Dispatch<React.SetStateAction<boolean>>;
    Rflag: boolean;
    roomID: string;
};

Modal.setAppElement('#__next');

const Reset = (props: Props) => {
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "0%",
          transform: "translate(-50%, -50%)",
          minWidth: "20%",
          maxWidth: "100%",
        },
    };
    const handleYesClick = async () => {
        const querySnapshot = await getDocs(collection(db, "rooms", props.roomID, "players"));
        querySnapshot.forEach(async (d) => {
            const washingtonRef = doc(db, "rooms", props.roomID, "players", d.id);
            await updateDoc(washingtonRef, {
                score: 0
            });
        })
        setIsOpen(false);
        props.SetRflag(!props.Rflag);
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                スコアをリセット
            </button>
            <div className="parents">
                <Modal isOpen={modalIsOpen} style={customStyles}>
                    <p className="text-lg pt-5 text-center">本当にリセットしますか？</p>
                    <div className="mt-6 mb-2 flex justify-center items-center gap-7">
                        <button
                            onClick={handleYesClick}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            はい
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            キャンセル
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Reset;
