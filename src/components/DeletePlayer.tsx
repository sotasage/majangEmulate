import React, { useState } from 'react';
import Modal from "react-modal";
import Select, { MultiValue } from 'react-select';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";

type OptionType = {
    value: string;
    label: string;
};

type Props = {
    SetRflag: React.Dispatch<React.SetStateAction<boolean>>;
    Rflag: boolean;
    roomID: string;
};

Modal.setAppElement('#__next');

const DeletePlayer = (props: Props) => {
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const customStyles = {
        content: {
          top: "35%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "0%",
          transform: "translate(-50%, -50%)",
          minWidth: "30%",
          maxWidth: "100%",
        },
    };
    const [options, setOptions] = useState<OptionType[]>([]);
    const handleDeleteClick = async () => {
        let O: {value: string, label: string}[] = [];
        const querySnapshot = await getDocs(collection(db, "rooms", props.roomID, "players"));
        querySnapshot.forEach((doc) => {
            O.push({value: doc.id, label: doc.id})
        });
        setOptions(O);
        setIsOpen(true);
    };
    const [selectedOptionName, setSelectedOptionName] = useState<MultiValue<OptionType>>([]);
    const handleChangeName = (e: MultiValue<OptionType>) => {
        setSelectedOptionName(e);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {   
        event.preventDefault();
        selectedOptionName.map(async (d) => {
            await deleteDoc(doc(db, "rooms", props.roomID, "players", d.value));
        })
        setSelectedOptionName([]);
        setIsOpen(false);
        props.SetRflag(!props.Rflag);
    };
    
    return (
        <div className="max-w-md mx-auto my-8">
            <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                プレイヤーを削除
            </button>
            <div className="parents">
                <Modal isOpen={modalIsOpen} style={customStyles}>
                    <form onSubmit={handleSubmit} className=" w-full mt-4 p-4 bg-white rounded-lg">
                        <Select
                            value={selectedOptionName}
                            onChange={handleChangeName}
                            options={options}
                            isMulti
                            menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                            //menuPortalTarget={document.body}
                        />
                        <div className="mt-8 mb-2 flex justify-center items-center gap-7">
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

export default DeletePlayer;