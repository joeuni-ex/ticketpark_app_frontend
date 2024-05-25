import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

function ReadPage() {
  const [date, setDate] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState("1회차");

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // 예약을 위한 추가 로직을 여기에 작성할 수 있습니다.
  };

  const handleSessionChange = (session) => {
    setSelectedSession(session);
  };

  return (
    <div className="flex  justify-center">
      {/* left */}
      <div className="flex flex-col w-6/12 bg-slate-500">
        <div>제목</div>
        <div className="flex">
          <div className="w-80 h-96 bg-green-500">
            <img src="" alt="" />
          </div>

          <div>
            <p>장소 </p>
            <p>장소 </p>
            <p>장소 </p>
            <p>장소 </p>
            <p>장소 </p>
          </div>
        </div>
        <div>공연정보/ 관람후기</div>
      </div>

      {/* right */}
      <div className="flex w-3/12 h-screen flex-col pt-10 ">
        <div className="flex   flex-col items-center rounded justify-center sticky top-0 ">
          {/* cal */}
          <div className="flex mt-5 flex-col border rounded-xl p-3 text-stone-600">
            <div className=" ml-4 font-semibold ">관람일</div>
            <div className="border-b">
              <CalendarBox>
                <StyleCalendar
                  locale="en"
                  onChange={handleDateChange}
                  value={date}
                />
              </CalendarBox>
            </div>
            <div className="flex flex-col m-4 space-y-2 ">
              <div className=" font-semibold ">회차</div>
              <div className="flex ">
                <div
                  className={`flex space-x-2 mt-2 w-1/2 p-4 border rounded-l-md cursor-pointer text-sm ${
                    selectedSession === "1회차"
                      ? "border-orange-400 text-orange-500 font-semibold "
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSessionChange("1회차")}
                >
                  <div>1회차</div>
                  <div>14:00</div>
                </div>

                <div
                  className={`flex space-x-2 mt-2  w-1/2  p-4 border rounded-r-md cursor-pointer text-sm ${
                    selectedSession === "2회차"
                      ? "border-orange-400 text-orange-500 font-semibold "
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSessionChange("2회차")}
                >
                  <div>2회차</div>
                  <div>18:30</div>
                </div>
              </div>
              <div className="text-sm ml-2">
                <p>
                  VIP석 <span className="font-bold">0</span>
                </p>
                <p>
                  R석 <span className="font-bold">0</span>
                </p>
                <p>
                  S석 <span className="font-bold">0</span>
                </p>
                <p>
                  A석 <span className="font-bold">0</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center  w-96 m-4 h-14 rounded text-xl text-white font-bold bg-orange-400">
            예매하기
          </div>
        </div>
      </div>
    </div>
  );
}

// 캘린더 커스텀 css
export const CalendarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyleCalendar = styled(Calendar)`
  max-width: 100%;
  border: none;
  margin-bottom: 15px;
  padding: 20px;

  .react-calendar__navigation {
    display: flex;
    height: 24px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 24px;
    background-color: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #e8e8e8;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e8e8e8;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.15em;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 1.2em 0.5em;
  }

  .react-calendar__tile--hasActive {
    color: #ffffff;
    background-color: #797979;
    border-radius: 5px;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: #797979;
  }

  .react-calendar__tile--active {
    color: #ffffff;
    background-color: #6a6a6a;
    border-radius: 7px;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #6a6a6a;
  }
`;

export default ReadPage;
