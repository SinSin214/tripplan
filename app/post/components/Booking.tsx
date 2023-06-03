'use client'

import Button from "@mui/material/Button"

export function Booking() {
    function onBooking() {
        alert('aaa');
    }
    return (
        <div>
            <Button onClick={() => onBooking()}>BOOKING NOW</Button>
        </div>
    )
}