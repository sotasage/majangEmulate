import AddPlayer from "../components/AddPlayer";
import AddResult from "../components/AddResult";
import RankingList from "../components/RankingList";
import DeletePlayer from "../components/DeletePlayer";
import Reset from "../components/Reset";
import {useState} from "react";

export default function Home() {
  const [UpdateRankingFlag, setUpdateRankingFlag] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-2xl font-mono">麻雀順位点計算ソフト</h1>
      <div>
        <div className="flex justify-center items-center gap-4">
          <AddPlayer SetRflag={setUpdateRankingFlag} Rflag={UpdateRankingFlag} />
          <AddResult SetRflag={setUpdateRankingFlag} Rflag={UpdateRankingFlag} />
          <DeletePlayer SetRflag={setUpdateRankingFlag} Rflag={UpdateRankingFlag} />
          <Reset SetRflag={setUpdateRankingFlag} Rflag={UpdateRankingFlag} />
        </div>
        <RankingList Rflag={UpdateRankingFlag} />
      </div>
    </main>
  );
}
