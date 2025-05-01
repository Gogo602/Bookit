import rooms from '@/data/rooms.json'
import RoomCard from '@/components/RoomCard';

export default function Home() {
  return (
    <>
      {rooms.length > 0 ? ( 
        rooms.map((room) =>
          <RoomCard key={room} room={room} />
        )
      ): (
          <p>No Rooms Available</p>
     )}
    </>
  );
}
