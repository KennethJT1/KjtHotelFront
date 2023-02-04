import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import swal from "sweetalert2"

const { TabPane } = Tabs;

//ADMIN Component
export const Admin = () => {
  const amAdmin = async () => {
    if (!JSON.parse(localStorage.getItem("currentuser")).isAdmin) {
      window.location.href = "/home";
    }
  };

  useEffect(() => {
    amAdmin();
  }, []);
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AddRoom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
};

//BOOKING Component
export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const allBooking = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/getallbookings");
      setBookings(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    allBooking();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loading />}

        <table className="table table-bordered table-dark">
          <thead className="bs ">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//ROOM Component
export const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const allBooking = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/room/getAllRooms");
      setRooms(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    allBooking();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loading />}

        <table className="table table-bordered table-dark">
          <thead className="bs ">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent per day</th>
              <th>Max count</th>
              <th>Phone number</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//USER Component
export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const allUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/getallusers");
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loading />}

        <table className="table table-bordered table-dark">
          <thead className="bs ">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>

          <tbody>
            {users.length &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//ADD ROOM Component
export const AddRoom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  //data
  const [name, setname] = useState();
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState();
  const [phone, setphone] = useState();
  const [type, settype] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();

  const addRoom = async () => {

    const newRoom = {
      name,
      rentperday,
      maxcount,
      description,
      phone,
      type,
      imageurls: [imageurl1, imageurl2],
    };


    try {
      setLoading(true);
       const { data } = await axios.post("/api/room/addroom", newRoom);
      setLoading(false);
      swal
        .fire("Congratulations", "Your room has been created", "success")
        .then((result) => {
          window.location.href = "/home";
        });
    } catch (error) {
      setLoading(false);
      swal.fire("Oops", "Something went wrong", "error");
      setError(error.message);
    }
  };

  return (
    <div className="row">
      {loading && <Loading />}
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Room name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Rent per day"
          value={rentperday}
          onChange={(e) => setrentperday(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Max count"
          value={maxcount}
          onChange={(e) => setmaxcount(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Type"
          value={type}
          onChange={(e) => settype(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image url 1"
          value={imageurl1}
          onChange={(e) => setimageurl1(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image url 2"
          value={imageurl2}
          onChange={(e) => setimageurl2(e.target.value)}
        />

        <div className="text-right">
          <button className="btn" onClick={addRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};
