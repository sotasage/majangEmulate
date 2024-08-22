import AddPlayer from "@/components/AddPlayer";
import AddResult from "@/components/AddResult";
import RankingList from "@/components/RankingList";
import DeletePlayer from "@/components/DeletePlayer";
import Reset from "@/components/Reset";
import {useState, useEffect} from "react";
import Header from "@/components/Header"
import { useRouter } from 'next/router'

export default function Home() {
  const [UpdateRankingFlag, setUpdateRankingFlag] = useState(false);
  const router = useRouter();
  const [roomID, setRoomID] = useState<string|null>(null);
  useEffect(() => {
    if (!router.isReady) return;
    const roomID = router.query.id;
    if (typeof roomID === 'string') {
      setRoomID(roomID);
    } else {
      setRoomID(null);  // id が string でない場合は null にセット
    }
    console.log(roomID);
  }, [router.isReady, router.query.id])

  if (!roomID) {
    console.error("Room ID is null or undefined");
    return;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
        <Header />
        <div className="absolute right-1 top-1 flex ">
          <button
            onClick={() => {router.push("/")}}
            className="px-4 py-2 bg-green-500 text-white text-2xl rounded hover:bg-green-600"
          >
            退室
          </button>
        </div>
        <div>
            <div className="flex justify-center items-center gap-4">
            <AddPlayer SetRflag={setUpdateRankingFlag} Rflag={UpdateRankingFlag} roomID={roomID} />
            <AddResult SetRflag={setUpdateRankingFlag} Rflag={UpdateRankingFlag} roomID={roomID} />
            <DeletePlayer SetRflag={setUpdateRankingFlag} Rflag={UpdateRankingFlag} roomID={roomID} />
            <Reset SetRflag={setUpdateRankingFlag} Rflag={UpdateRankingFlag} roomID={roomID} />
            </div>
            <RankingList Rflag={UpdateRankingFlag} roomID={roomID} />
        </div>
    </main>
  );
}
