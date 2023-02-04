import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import StripeCheckout from "react-stripe-checkout";
import swal from "sweetalert2";

export const BookingScreen = () => {
  //stripe secret key
  const StripeKey = process.env.REACT_APP_STRIPE_Publishable_key;


  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [totalamount, settotalamount] = useState(0);

  //hook
  let { roomid, fromdate, todate } = useParams();
  let from = moment(fromdate, "DD-MM-YYYY");
  let to = moment(todate, "DD-MM-YYYY");

  //totaldays== 1 is added to give exact days
  const totaldays = moment.duration(to.diff(from)).asDays() + 1;

  const getroom = async () => {
    if (!localStorage.getItem('currentuser')) {
      window.localStorage.reload = "/login"
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/room/getroombyid", {
        roomid,
      });

      setRoom(data);
      settotalamount(data.rentperday * totaldays);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error.message);
    }
  };

  const onToken = async (token) => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentuser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/booking/bookroom ",
        bookingDetails
      );
      setLoading(false);
      swal
        .fire("Congratulations", "Congrat, your room is booked", "success")
        .then((result) => {
          window.location.href = "/profile";
        });
    } catch (error) {
      setLoading(false);
      swal.fire("Oops", "Something went wrong", "error");
      console.log(error.message);
    }
  };

  useEffect(() => {
    getroom();
  }, []);

  return (
    <div className="m-5">
      {loading ? (
        <Loading />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img
                src={room.imageurls[0]}
                className="bigimg"
                style={{ width: "120%" }}
              />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>
                    Name :{JSON.parse(localStorage.getItem("currentuser")).name}
                  </p>
                  <p>From Date : {fromdate} </p>
                  <p>To Date : {todate} </p>
                  <p>Max Count : </p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1> Amount</h1>
                  <hr />
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : &#8358;{room.rentperday}</p>
                  <p>Total Amount : &#8358;{totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="NGN"
                  stripeKey={StripeKey}
                >
                  <button className="btn">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};
