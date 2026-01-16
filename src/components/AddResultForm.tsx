import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

type Props = {
    array: OptionType[];
    flag: boolean;
    place: string;
    SetRflag: React.Dispatch<React.SetStateAction<boolean>>;
    Rflag: boolean;
    roomID: string;
}

type OptionType = {
    value: string;
    label: string;
  };

const AddResultForm = (props: Props) => {
    const [score, setScore] = useState('0');
    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === '' || val === '-' || !isNaN(Number(val))) {
            setScore(val);
        }
    };
    const [selectedOptionName, setSelectedOptionName] = useState<SingleValue<OptionType>>(null);
    const handleChangeName = (e: any) => {
        setSelectedOptionName(e);
    };
    const Aflag = props.flag;
    useEffect(() => {
        (async() => {
            if (selectedOptionName == null) {
                console.log('error');
            }
            else {
                const docRef = doc(db, "rooms", props.roomID, "players", selectedOptionName.value);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    let sum = docSnap.data().score;
                    sum += (Number(score) - 25000) / 1000;
                    if (props.place == "1") sum += 15;
                    else if (props.place == "2") sum += 5;
                    else if (props.place == "3") sum -= 5;
                    else if (props.place == "4") sum -= 15;
                    await updateDoc(docRef, {
                        score: Number(sum.toFixed(1))
                    });
                    setSelectedOptionName(null);
                    props.SetRflag(!props.Rflag);
                } else {
                    console.log("No such document!");
                }
            }
        })()
    }, [Aflag]);
    
    return (    
        <div className="w-90 mb-4 flex justify-center items-center gap-4">
            <p className="w-2/12 text-lg pt-5">{props.place}位</p>
            <div className="w-5/12">
                <label className="block text-gray-700">名前</label>
                <Select
                    value={selectedOptionName}
                    onChange={handleChangeName}
                    options={props.array}
                    menuPortalTarget={document.body}
                    className="w-full"
                    styles={{
                        menu: (provided) => ({ ...provided, width: '100%' }), // ドロップダウンメニューの幅を固定
                    }}
                />
            </div>
            <div className="w-5/12">
                <label className="block text-gray-700">得点</label>
                <input
                    type="text"
                    inputMode="decimal"
                    pattern="[-0-9]*"
                    value={score}
                    onChange={handleScoreChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

export default AddResultForm;