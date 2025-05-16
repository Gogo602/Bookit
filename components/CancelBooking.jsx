"use client"
import cancelBooking from "@/app/actions/cancelBookings"
import { toast } from "react-toastify"

const CancelBooking = ({ bookingId }) => {

    const handleCancel = async () => {
        const confirmed = window.confirm('Are you sure you want to cancel this booking?');

        if (confirmed) {
            console.log("Attempting to cancel booking with ID:", bookingId); 

            try {
                const response = await cancelBooking(bookingId);
                toast.success('Booking canceled Successfully')
            } catch (error) {
                console.log('Failed to Cancel booking', error);
                toast.error('Failed to Cancel booking')
            }
        }
    } 
  return (
      <button
          onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
            >
                Cancel Booking
            </button> 
  )
}

export default CancelBooking