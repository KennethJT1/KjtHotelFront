import React, { useState, useEffect } from "react";
import axios from "axios";
import { Room } from "../components/Room";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";

export const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  //format date
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicateroom, setduplicateroom] = useState([]);

  //data picker
  const { RangePicker } = DatePicker;

  //seacher and filtering
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  // Functionalities
  const getrooms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/room/getAllRooms");
      setRooms(data);
      setduplicateroom(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error.message);
      setLoading(false);
    }
  };

  const filterByDate = (val, dates) => {
    setfromdate(moment(dates[0]).format("MM-DD-YYYY"));
    settodate(moment(dates[1]).format("MM-DD-YYYY"));

    let temprooms = [];

    let availability = false;
    //To ensure that a room that is booked is not showing when a date within its range is selected
    for (const room of duplicateroom) {
      if (room.currentbookings.length > 0) {
        //since it is an array
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("MM-DD-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("MM-DD-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            //To check if equal to
            if (
              moment(dates[0]).format("MM-DD-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("MM-DD-YYYY") !== booking.todate &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability == true || room.currentbookings.length === 0) {
        temprooms.push(room);
      }

      setRooms(temprooms);
    }
  };

  const filterBySearch = () => {
    //I can't filter the original room that's why l'm using duplicatrRoom
    const temproom = duplicateroom.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase()));

    setRooms(temproom);
  };

  const filterByType = (e) => {
    //if yhis is not put when selecting other fields it will be showing All
    setType(e);

    //To ensure that when filtering by type the value for select ALL is not changed
    if (e !== "all") {
      const temproom = duplicateroom.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );

      setRooms(temproom);
    } else {
      setRooms(duplicateroom)
    }
  };

  useEffect(() => {
    getrooms();
  }, []);

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format={"DD-MM-YYYY"} onChange={filterByDate} />
        </div>

         {/* For searching */}
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search for your choose"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>

        {/*  Filtering by type */}
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {filterByType(e.target.value)}}
          >
            <option value="all">All</option>
            <option value="deluxe">Deluxe</option>
            <option value="non-deluxe">Non-Deluxe</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loading />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
