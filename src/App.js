import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
// const myTable = [];

const fileDataToUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
function App() {
  const [FName, setFName] = useState();
  const [MName, setMName] = useState();
  const [LName, setLName] = useState();
  const [BDate, setBDate] = useState();
  const [Address, setAddress] = useState();
  const [ContactNumber, setContactNumber] = useState();
  const [myTable, setMyTable] = useState([]);
  const [myImg, setmyImg] = useState();

  // state name , state update name
  function saveDetails() {
    setMyTable([
      ...myTable,
      {
        LName,
        FName,
        MName,
        BDate,
        Address,
        ContactNumber,
        myImg,
      },
    ]);

    //myTable.push();
    console.log(myTable);
  }

  function handleOnchange(file) {
    if (!file) {
      setmyImg("");
      return;
    }

    fileDataToUri(file).then((dataUri) => {
      setmyImg(dataUri);
    });
  }

  return (
    <div className="App flex justify-center flex-col items-center">
      <div className=" p-10 border my-5  ">
        <div className="w-full text-left font-bold">Form Details</div>
        <p className="text-4xl text-redx" id="changeText"></p>

        <div className="text-left my-1">
          <label>Last Name</label>
          <input
            type="text"
            id="txtLName"
            className="rounded-xs border uppercase w-full my-1"
            onChange={(e) => setLName(e.target.value)}
          />
        </div>
        <div className="text-left my-1">
          <label>First Name</label>
          <input
            type="text"
            className="rounded-xs border uppercase w-full my-1"
            onChange={(e) => setFName(e.target.value)}
          />
        </div>

        <div className="text-left my-1">
          <label>Middle Name</label>
          <input
            type="text"
            className="rounded-xs border uppercase w-full my-1"
            onChange={(e) => setMName(e.target.value)}
          />
        </div>

        <div className="text-left my-1">
          <label>Birth Date</label>
          <input
            type="date"
            className="rounded-xs border uppercase w-full my-1"
            onChange={(e) => setBDate(e.target.value)}
          />
        </div>

        <div className="text-left my-1">
          <label>Contact Number</label>
          <input
            type="text"
            className="rounded-xs border uppercase w-full my-1"
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <div className="text-left my-1">
          <label>Address</label>
          <input
            type="text"
            className="rounded-xs border uppercase w-full my-1"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="text-left my-1">
          <label>Image</label>
          <input
            type="file"
            className="w-full my-1"
            onChange={(e) => handleOnchange(e.target.files[0] || null)}
          />
        </div>

        <button
          className="rounded-md border bg-zinc-900 text-white h-[35px] px-2"
          onClick={() => saveDetails()}
        >
          Save Details
        </button>
      </div>

      <div>
        <div className="grid grid-cols-4 gap-4">
          {myTable.map((element, indx) => {
            return (
              <div className="border rounded-md p-10" key={indx}>
                <img
                  className="border h-[150px] w-full rounded-full"
                  src={element.myImg}
                ></img>
                <div>
                  <div className="text-left my-1">
                    <label className="font-bold">Fullname : </label>
                    {`${element.LName}, ${element.FName} ${element.MName} `}
                  </div>
                  <div className="text-left my-1">
                    <label className="font-bold">Birth Date : </label>
                    {element.BDate}
                  </div>
                  <div className="text-left my-1">
                    <label className="font-bold">Contact Number : </label>
                    {element.ContactNumber}
                  </div>
                  <div className="text-left my-1">
                    <label className="font-bold">Address : </label>
                    {element.Address}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <table className="table table-fixed border-separate border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">#</th>
              <th className="border border-slate-300">Firs Name</th>
              <th className="border border-slate-300">Middle Name</th>
              <th className="border border-slate-300">Last Name</th>
              <th className="border border-slate-300">Birth Date</th>
              <th className="border border-slate-300">Contact Number</th>
              <th className="border border-slate-300">Address</th>
            </tr>
          </thead>
          <tbody>
            {myTable.map((element, indx) => {
              return (
                <tr key={indx}>
                  <td className="border border-slate-300">{indx + 1}</td>
                  <td className="border border-slate-300">{element.FName}</td>
                  <td className="border border-slate-300">{element.MName}</td>
                  <td className="border border-slate-300">{element.LName}</td>
                  <td className="border border-slate-300">{element.BDate}</td>
                  <td className="border border-slate-300">
                    {element.ContactNumber}
                  </td>
                  <td className="border border-slate-300">{element.Address}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default App;
