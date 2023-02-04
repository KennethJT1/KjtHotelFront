import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import swal from "sweetalert2";
import { Divider, Space, Tag } from "antd";

const { TabPane } = Tabs;
export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("currentuser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>IsAdmin: {user.isAdmin ? "yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getRooms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/booking/getbookingsbyuserid", {
        userid: user._id,
      });
      setBookings(data);
        setLoading(false);
    } catch (error) {
      console.log(error.message);
        setLoading(false);
      setError(error.message);
    }
  };
    
    
    const CancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/booking/cancelbooking", {
        bookingid,
        roomid,
      });
        setLoading(false);
            swal
              .fire("Congrat", "Your booking has been cancelled", "success")
              .then((result) => {
                window.location.reload();
              });
    } catch (error) {
      console.log(error.message);
        setLoading(false);
         swal.fire("Oops", "Something went wrong", "error");
      setError(error.message);
    }
  };
    
    
  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="row">
      <div className=".col-md-6">
        {loading && <Loading />}
        {bookings &&
          bookings.map((booking) => {
            return (
              <div className="bs ">
                <h1>{booking.room}</h1>
                <p>
                  <b>BookingId:</b> {booking._id}
                </p>
                <p>
                  <b>Check In:</b> {booking.fromdate}
                </p>
                <p>
                  <b>Check Out:</b>
                  {booking.todate}
                </p>
                <p>
                  <b>Amount:</b> {booking.totalamount}
                </p>
                <p>
                  <b>Status:</b>
                  {booking.status === "cancelled" ? (
                    <Tag color="red">Cancelled</Tag>
                  ) : (
                    <Tag color="green">Confirmed</Tag>
                  )}
                </p>

                {booking.status !== "cancelled" && (
                  <div className="text-right">
                    <button
                      className="btn"
                      onClick={() => {
                        CancelBooking(booking._id, booking.roomid);
                      }}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
