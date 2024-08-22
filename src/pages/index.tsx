import Header from "../components/Header"
import AddRoom from "../components/AddRoom"
import RoomList from "../components/RoomList";
import { useState } from "react";

export default function Home() {
  const [AddRoomFlag, setAddRoomFlag] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <Header />
      <AddRoom flag={AddRoomFlag} set={setAddRoomFlag} />
      <RoomList flag={AddRoomFlag} />
    </main>
  );
}
