import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";
import { API_SERVER_HOST, getOne } from "../../../../api/goodsApi";
import moment from "moment";
import styled from "styled-components";
import { useEffect } from "react";
import FetchingModal from "../../../../components/common/FetchingModal";
import { getOneReservation } from "../../../../api/ReservationApi";
import ResultModal from "../../../../components/common/ResultModal";
import AgeComponent from "../../../../components/common/AgeComponent";

const initState = {
  id: "",
  seatClass: "",
  seatNumber: "",
  price: 0,
};

//초기값
const goodsInitState = {
  gno: 0,
  title: "",
  place: "",
  startDate: "",
  endDate: "",
  gdesc: "",
  runningTime: 0,
  age: 0,
  genre: "",
  time: "",
  exclusive: 0,
  uploadFileNames: [],
  times: [],
};

//초기값
const reservationInitState = {
  rno: 0,
  email: "",
  gno: 0,
  sno: 0,
  reservationDate: "",
  seatClass: "",
  seatNumber: 0,
  time: "",
  price: 0,
  dueDate: "",
  cancelFlag: false,
};

//티켓 가격
const seatPrice = [
  {
    id: 1,
    seat: "VIP",
    price: 150000,
  },
  {
    id: 2,
    seat: "R",
    price: 130000,
  },
  {
    id: 3,
    seat: "S",
    price: 100000,
  },
  {
    id: 4,
    seat: "A",
    price: 80000,
  },
];
const host = API_SERVER_HOST;

function ModifyPage() {
  const { rno } = useParams();
  const [date, setDate] = useState(); //캘린더 날짜

  const [gno, setGno] = useState(0);

  const [fetching, setFetching] = useState(false); //로딩 모달
  const [result, setResult] = useState(false); // 결과가 나오면 모달창으로 결과 데이터가 보이게끔

  const [goods, setGoods] = useState(goodsInitState); //굿즈 데이터

  const [reservation, setReservation] = useState(reservationInitState); //예약 데이터

  const [selectSeatBtn, setSelectSeatBtn] = useState(false);
  const [selectedTime, setSelectedTime] = useState(1); //예매

  //캘린더에서 날짜 선택 시
  const handleDateChange = (newDate) => {
    // 날짜를 "YYYY-MM-DD" 형식으로 변환
    setDate(moment(newDate).format("YYYY-MM-DD"));
  };

  //회차 변경
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  //결과 모달창 닫기
  const closeModal = () => {
    //setReservationModal(false);
    setResult(null);
  };

  // =====좌석 변경=======
  const [selectedSeat, setSelectedSeat] = useState(initState);

  const seats = Array.from({ length: 6 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => ({
      id: `R${row + 1}C${col + 1}`,
      row: row + 1,
      col: col + 1,
    }))
  );

  const handleSeatClick = (seat, index, seatClass) => {
    let price = 0;

    if (seatClass === "VIP") {
      price = 150000;
    } else if (seatClass === "R") {
      price = 130000;
    } else if (seatClass === "S") {
      price = 100000;
    } else if (seatClass === "A") {
      price = 80000;
    }
    setSelectedSeat({
      id: seat.id,
      seatClass,
      seatNumber: index + 1,
      price: price,
    });
  };

  useEffect(() => {
    setFetching(true);

    getOneReservation(rno).then((reData) => {
      setReservation(reData);

      setGno(reData.gno);

      setDate(moment(reData.reservationDate).format("YYYY-MM-DD")); // 캘린더 날짜도 초기 값
      //공연데이터
      getOne(reData.gno).then((data) => {
        setGoods(data);
        setFetching(false);
      });
    });
  }, [rno]);

  console.log(goods);
  console.log(reservation);

  //날짜 변환
  const startDate = moment(goods.startDate).format("YYYY-MM-DD");
  const endDate = moment(goods.endDate).format("YYYY-MM-DD");

  return (
    <div className="flex flex-col   justify-center ">
      {fetching ? <FetchingModal /> : <></>}

      {result ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Reservation Add Result"}
          content={`정상적으로 예매가 완료되었습니다.`}
        />
      ) : (
        <></>
      )}
      <div className="font-bold text-stone-800 text-xl py-10 px-5 border-b">
        예약 변경
      </div>
      {/* 좌석 선택 버튼 클릭 여부에 따라 다르게 표시  */}
      {!selectSeatBtn ? (
        // 날짜 선택
        <div className="flex text-stone-800">
          <div className="flex flex-col w-full md:w-7/12  mt-5 p-3 ">
            <div className="flex flex-col my-5 space-y-2">
              <div className="flex items-center font-semibold space-x-3 text-stone-700 pb-3 border-b border-stone-400">
                <div className="text-2xl font-bold">{goods.title}</div>
                <AgeComponent age={goods.age} />
              </div>
            </div>

            <div className="flex space-x-11">
              <div className="w-56  h-80">
                <img
                  src={`${host}/api/goods/view/${goods.uploadFileNames[0]}`}
                  className="w-full h-full object-cover"
                  alt="image"
                />
              </div>

              <div className="flex flex-col w-1/2 space-y-5">
                <div className="flex ">
                  <div className="w-1/4">장소</div>
                  <div>{goods.place}</div>
                </div>
                <div className="flex ">
                  <div className="w-1/4">공연기간</div>
                  <div>{`${goods.startDate} ~ ${goods.endDate}`}</div>
                </div>
                <div className="flex ">
                  <div className="w-1/4">공연시간</div>
                  <div>{goods.runningTime}분</div>
                </div>
                <div className="flex ">
                  <div className="w-1/4">관람연령</div>
                  <div>
                    {goods.age == 0 ? "전체이용가" : `${goods.age}세 이상`}
                  </div>
                </div>
                <div className="flex ">
                  <div className="w-1/4">가격</div>
                  <div className="space-y-2">
                    {seatPrice.map((item) => (
                      <p key={item.id} className="text-stone-500 text-sm">
                        {item.seat}석
                        <span className="font-bold ml-3 text-black">
                          {" "}
                          {item.price.toLocaleString("ko-KR")}원
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="border my-5 b "></div>
            <div className="flex text-stone-800 flex-col">
              <div className="font-semibold text-lg">나의 예약 내역</div>
              <div className="border my-5 b "></div>
              <div className="flex flex-col space-y-3 mt-5">
                <div>장소 : {goods.place}</div>
                <div>예약일자 : {reservation.reservationDate}</div>
                <div>예약시간 : {reservation.time}</div>
                <div>
                  예약좌석 : {`<${reservation.seatClass}>`}
                  {reservation.seatNumber}석
                </div>
              </div>
            </div>
          </div>
          {/* cal */}
          <div className="flex  w-full md:w-4/12   flex-col pt-10 ">
            <div className="flex   flex-col items-center rounded justify-center sticky top-0 text-stone-600">
              {/* cal */}
              <div className="flex mt-5 flex-col border rounded-xl p-3 ">
                <div className=" ml-4 font-semibold ">관람일</div>
                <div className="border-b">
                  <CalendarBox>
                    <StyleCalendar
                      locale="en"
                      onChange={handleDateChange}
                      value={date ? new Date(date) : new Date()}
                      minDate={new Date()}
                      maxDate={new Date(endDate)}
                    />
                  </CalendarBox>
                </div>
                <div className="flex flex-col m-4 space-y-2 ">
                  <div className=" font-semibold ">회차</div>
                  <div className="flex ">
                    {goods.times?.map((time, index) => (
                      <div
                        key={index}
                        className={`flex space-x-2 mt-2 w-1/2 p-4 border rounded-l-md cursor-pointer text-sm ${
                          selectedTime === index + 1
                            ? "border-orange-400 text-orange-500 font-semibold "
                            : "border-gray-300"
                        }`}
                        onClick={() => handleTimeChange(index + 1)}
                      >
                        <div>{index + 1}회차</div>
                        <div>{time}</div>
                      </div>
                    ))}
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
              <div
                onClick={() => setSelectSeatBtn(true)}
                className="flex justify-center cursor-pointer items-center  w-96 m-4  h-14 rounded text-xl text-white font-bold bg-orange-400"
              >
                좌석선택
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 좌석선택 */}
          <div className="flex">
            <div className=" bg-white shadow opacity-100 w-1/4 rounded mt-10 pb-6 mb-10 px-6 min-w-[1000px] min-h-[700px]">
              <div className="flex justify-between text-xl font-semibold text-stone-700 my-5">
                <div>예매 - 좌석선택</div>
              </div>
              <div className="flex">
                <div className="bg-zinc-700 w-2/3 p-10 space-y-6">
                  {/*Screen*/}
                  <div className="flex justify-center text-2xl pt-4 pb-4 text-stone-700 text-center">
                    <div className="flex justify-center items-center mb-4 min-w-[560px] h-24 bg-white shadow-md shadow-white"></div>
                  </div>
                  {/* Seat */}
                  <div className="grid grid-cols-10 gap-2 mx-auto mb-4">
                    {seats.flat().map((seat, index) => {
                      const colSpan =
                        index % 8 === 1 || index % 8 === 5 ? "col-span-2" : "";

                      let seatClass = "";
                      if (index <= 7) {
                        seatClass = "VIP";
                      } else if (index >= 8 && index <= 15) {
                        seatClass = "R";
                      } else if (index >= 16 && index <= 23) {
                        seatClass = "S";
                      } else if (index >= 24 && index <= 31) {
                        seatClass = "S";
                      } else if (index >= 32 && index <= 39) {
                        seatClass = "A";
                      } else if (index >= 40 && index <= 47) {
                        seatClass = "A";
                      }

                      return (
                        <button
                          key={seat.id}
                          className={`w-12 h-12 rounded-t-2xl ${colSpan} ${
                            selectedSeat && selectedSeat.id === seat.id
                              ? "bg-orange-400 text-white"
                              : "bg-zinc-400"
                          }`}
                          onClick={() =>
                            handleSeatClick(seat, index, seatClass)
                          }
                        >
                          <div className="flex flex-col justify-center items-center">
                            <div>{index + 1}</div>
                            <div className="text-xs font-semibold">
                              {seatClass}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-orange-100 text-sm mt-">
                    *가격 안내 <br /> VIP석 150,000원/ R석 130,000원/ S석
                    100,000원 / A석 80,000원
                  </div>
                </div>
                <div className="flex flex-col w-1/3 pl-8 justify-between ">
                  <div>
                    <div className="flex items-center font-semibold space-x-3 text-stone-700 pb-3 border-b border-stone-400">
                      <div>{goods.title}</div>
                      <AgeComponent age={goods.age} />
                    </div>

                    <div className="w-44 h-64 overflow-hidden mt-3">
                      <img
                        src={`${host}/api/goods/view/${goods.uploadFileNames[0]}`}
                        className="w-full h-full object-cover"
                        alt="image"
                      />
                    </div>

                    <div className="space-y-3 mt-4">
                      <div className=" ">{goods.place} </div>
                      <div className="">공연일자 {date ? date : startDate}</div>
                      <div className=" ">
                        공연시작시간 {goods.times[selectedTime - 1]} (
                        {selectedTime}
                        회차){" "}
                      </div>
                      <div className=" ">총 {goods.runningTime}분</div>
                      <div>
                        선택한 좌석 :
                        <span className="font-semibold text-blue-500">
                          {selectedSeat.seatClass
                            ? `<${selectedSeat.seatClass}> ${selectedSeat.seatNumber}번`
                            : " 선택되지 않음"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between text-lg font-semibold ">
                      <div>최종결제금액</div>
                      <div>
                        <span className="text-orange-400 text-xl">
                          {new Intl.NumberFormat("ko-KR").format(
                            selectedSeat.price
                          )}
                        </span>
                        원
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
    background-color: orange;
    border-radius: 7px;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: orange;
  }

  .react-calendar__tile--now {
    background-color: #ffd9b3;
  }
`;
export default ModifyPage;
