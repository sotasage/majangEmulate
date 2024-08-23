import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
    flag: boolean;
}

const RoomList = (props: Props) => {
    const [RoomList, setRoomList] = useState<{id: string, name: string}[]>([]);
    useEffect(() => {
        (async () => {
            let V: {id: string, name: string}[] = [];
            const querySnapshot = await getDocs(collection(db, "rooms"));
            querySnapshot.forEach((doc) => {
                V.push({id: doc.id, name: doc.data().name})
            });
            setRoomList(V);
        })()
    }, []);
    const Aflag = props.flag;
    useEffect(() => {
        (async () => {
            let V: {id: string, name: string}[] = [];
            const querySnapshot = await getDocs(collection(db, "rooms"));
            querySnapshot.forEach((doc) => {
                V.push({id: doc.id, name: doc.data().name})
            });
            setRoomList(V);
        })()
    }, [Aflag]);
    const router = useRouter();

    return (
        <div className="w-4/5 md:w-1/4 p-4 bg-white">
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2 w-1/6">ルーム一覧</th>
                    </tr>
                </thead>
                <tbody>
                    {RoomList.map((room) => (
                        <tr key={room.id}>
                            <td className="border border-gray-300 p-2 text-center">
                                <div className="w-full flex justify-between items-center">
                                    <p className="text-xl">{room.name}</p>
                                    <button
                                        onClick={() => {router.push(`/rooms/${room.id}`)}}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        入室
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RoomList;