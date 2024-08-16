import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";

type DocListType = {
    name: string;
    score: number;
}

type Props = {
    Rflag: boolean;
};

const RankingList = (props: Props) => {
    const [DocList, setDocList] = useState<DocListType[]>([]);
    const compareFunc = (a: DocListType, b: DocListType) => {
        return b.score - a.score;
    }
    useEffect(() => {
        (async () => {
            const q = query(collection(db, "datas"), orderBy("score", "desc"));
            let V: DocListType[] = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                V.push({name: doc.id, score: doc.data().score})
            });
            setDocList(V);
        })()
    }, []);
    useEffect(() => {
        (async () => {
            const q = query(collection(db, "datas"), orderBy("score", "desc"));
            let V: DocListType[] = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                V.push({name: doc.id, score: doc.data().score})
            });
            setDocList(V);
        })()
    }, [props.Rflag]);
    /*const unsub = onSnapshot(query(collection(db, "datas"), orderBy("score", "desc")), (querySnapshot) => {
        let V: DocListType[] = [];
        querySnapshot.forEach((doc) => {
            V.push({name: doc.id, score: doc.data().score})
        });
        setDocList(V);
    });*/

    return (
        <div className="w-full p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4 text-center">ランキング</h1>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2 w-1/6">順位</th>
                        <th className="border border-gray-300 p-2 w-3/6">名前</th>
                        <th className="border border-gray-300 p-2 w-2/6">スコア</th>
                    </tr>
                </thead>
                <tbody>
                    {DocList.map((entry, index) => (
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 p-2 text-center">{entry.name}</td>
                            <td className="border border-gray-300 p-2 text-center">{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RankingList;