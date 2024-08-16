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
}

type OptionType = {
    value: string;
    label: string;
  };

const AddResultForm = (props: Props) => {
    const [score, setScore] = useState('');
    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScore(event.target.value);
    };
    const [selectedOptionName, setSelectedOptionName] = useState<SingleValue<OptionType>>(null);
    const handleChangeName = (e: any) => {
        setSelectedOptionName(e);
    };
    useEffect(() => {
        (async() => {
            if (selectedOptionName == null) {
                console.log('error');
            }
            else {
                const docRef = doc(db, "datas", selectedOptionName.value);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    let sum = docSnap.data().score;
                    sum += (Number(score) - 30000) / 1000;
                    if (props.place == "1") sum += 50;
                    else if (props.place == "2") sum += 10;
                    else if (props.place == "3") sum -= 10;
                    else if (props.place == "4") sum -= 30;
                    await updateDoc(docRef, {
                        score: sum
                    });
                    setSelectedOptionName(null);
                    props.SetRflag(!props.Rflag);
                } else {
                    console.log("No such document!");
                }
            }
        })()
    }, [props.flag]);
    
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
                type="number"
                value={score}
                onChange={handleScoreChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

export default AddResultForm;