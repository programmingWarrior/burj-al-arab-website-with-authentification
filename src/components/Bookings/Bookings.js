import React, { useContext, useEffect, useState } from "react";
import {UserContext} from "../../App";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/booking?email='+loggedInUser.email,{
      method:'GET',
      headers: { 'Content-Type': 'application/json', 
      'authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
    })
     
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      });
  }, []);

  return (
    <div>
      <h3>You have: {bookings.length}</h3>
      {bookings.map((book) => (
        <div style={{ 
            border:"1px solid blue",margin:"20px",
            padding:"20px",
            color:"purple"
        }}>
          <li>{book.name}</li>
          <li>From: {(new Date(book.checkIn).toDateString('dd/MM/YYYY'))}</li>
          <li>To: {(new Date(book.checkOut).toDateString('dd/MM/YYYY'))}</li>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
