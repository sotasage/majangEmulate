import React, { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import Modal from "react-modal";
import AddResultForm from "./AddResultForm"
import { propagateServerField } from 'next/dist/server/lib/render-server';

type OptionType = {
    value: string;
    label: string;
};

type Props = {
    SetRflag: React.Dispatch<React.SetStateAction<boolean>>;
    Rflag: boolean;
};

Modal.setAppElement(".parents");

const AddResult = (props: Props) => {
    const [options, setOptions] = useState<OptionType[]>([]);
    const handleAddClick = async () => {
        let O: {value: string, label: string}[] = [];
        const querySnapshot = await getDocs(collection(db, "datas"));
        querySnapshot.forEach((doc) => {
            O.push({value: doc.id, label: doc.id})
        });
        setOptions(O);
        setIsOpen(true);
    };
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const customStyles = {
        content: {
          top: "40%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "0%",
          transform: "translate(-50%, -50%)",
          minWidth: "0%",
          maxWidth: "35%",
        },
    };
    const [ SubmitFlag, setSubmitFlag ] = useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitFlag(!SubmitFlag);
        setIsOpen(false);
    };
    
    return (
        <div className="max-w-md mx-auto my-8">
            <button
                onClick={handleAddClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                対局結果を入力
            </button>
            <div className="parents">
                <Modal isOpen={modalIsOpen} style={customStyles}>
                    <div className="bg-white w-100 p-6">
                        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white rounded-lg">
                            <AddResultForm array={options} flag={SubmitFlag} place="1" SetRflag={props.SetRflag} Rflag={props.Rflag} />
                            <AddResultForm array={options} flag={SubmitFlag} place="2" SetRflag={props.SetRflag} Rflag={props.Rflag} />
                            <AddResultForm array={options} flag={SubmitFlag} place="3" SetRflag={props.SetRflag} Rflag={props.Rflag} />
                            <AddResultForm array={options} flag={SubmitFlag} place="4" SetRflag={props.SetRflag} Rflag={props.Rflag} />
                            <div className="mt-10 mb-2 flex justify-center items-center gap-7">
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
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AddResult;