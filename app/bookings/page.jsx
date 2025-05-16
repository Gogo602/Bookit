import getMyBookings from "../actions/getMyBookings";
import BookedRoomCard from "@/components/BookedRoomCard";

const BookingPage = async () => {
    const bookings = await getMyBookings();

    return ( 
        <>
            {bookings.length === 0 ? (
                <p className="text-gray-600 mt-4">You have no bookings</p>
            ) : (
                bookings.map((booking) => <BookedRoomCard key={booking.$id} booking={booking}/>)
            ) }
        </>
     );
}
 
export default BookingPage;