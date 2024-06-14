import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import Review from "../../components/card/Review";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_SERVER_HOST, getOne } from "../../api/goodsApi";
import FetchingModal from "../../components/common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import ReservationModal from "../../components/common/ReservationModal";

//초기값
const initState = {
  gno: 0,
  title: "",
  place: "",
  startDate: "",
  endDate: "",
  gdesc: "",
  runningTime: 0,
  age: 0,
  genre: "",
  exclusive: 0,
  uploadFileNames: [],
  times: [],
};

//예약 초기값
const reservationInitState = {
  email: 0,
  gno: "",
  reservationDate: "",
  seatClass: "",
  seatNumber: "",
  price: 0,
  cancelFlag: false,
};

const host = API_SERVER_HOST;

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

const selectMenu = [
  {
    id: 1,
    name: "공연정보",
  },
  {
    id: 2,
    name: "공연후기",
  },
];

const reviewSample = {
  id: 1,
  nickname: "hong1234",
  date: 2022 - 11,
  heart: 7,
  title: "댓글",
  des: "댓글내용",
};

function ReadPage() {
  const { gno } = useParams();

  const [goods, setGoods] = useState(initState);

  const [fetching, setFetching] = useState(false);
  const { loginState, moveToLogin } = useCustomLogin(); //로그인 커스텀 훅

  const [date, setDate] = useState(initState.startDate);

  const [reservation, setReservation] = useState(reservationInitState); //예약 초기값
  const [reservationModal, setReservationModal] = useState(false); //예약모달

  const [selectedTime, setSelectedTime] = useState(1); //예매
  const [selectedMenu, setSelectedMenu] = useState("공연정보");

  //캘린더에서 날짜 선택 시
  const handleDateChange = (newDate) => {
    // 날짜를 "YYYY-MM-DD" 형식으로 변환
    const formattedDate = newDate.toISOString().split("T")[0];

    setDate(formattedDate);
  };

  //예약하기
  const handleClickReservation = () => {
    if (loginState.email === "") {
      alert("로그인이 필요한 서비스 입니다.");
      moveToLogin();
    } else {
      setReservationModal(true); //좌석 선택 모달
    }
  };

  //회차 변경
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  //메뉴 변경
  const handleMenuChange = (menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    setFetching(true);
    getOne(gno).then((data) => {
      setGoods(data);
      setReservation((prev) => ({ ...prev, gno }));
      setFetching(false);
    });
  }, [gno]);

  //결과 모달창 닫기
  const closeModal = () => {
    setReservationModal(false);
  };

  //모달에서 좌석 선택 후 예약 클릭 시
  const handleClickReservationInModal = (seatData) => {
    console.log(seatData); //좌석 데이터

    //API 서버 통신
  };

  //날짜 변환
  const startDate = new Date(goods.startDate);
  const endDate = new Date(goods.endDate);

  return (
    <div className="flex flex-col md:flex-row   justify-center ">
      {reservationModal ? (
        <ReservationModal
          selectedTime={selectedTime}
          startDate={startDate}
          selectedDate={date}
          goods={goods}
          onCancel={closeModal}
          onConfirm={handleClickReservationInModal}
        />
      ) : (
        <></>
      )}
      {fetching ? <FetchingModal /> : <></>}
      {/* left */}
      <div className="flex flex-col w-full md:w-6/12  mt-5 p-3 ">
        <div className="flex flex-col my-5 space-y-2">
          <div className="text-2xl font-bold">{goods.title}</div>
          <div className="text-sm">⭐⭐⭐⭐⭐(9/10)</div>
        </div>

        <div className="flex space-x-11">
          <div className="w-80 h-96">
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
              <div>{goods.age == 0 ? "전체이용가" : `${goods.age}세 이상`}</div>
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
        {/* menu */}
        <div className="flex  mt-40 font-bold">
          {selectMenu.map((menu) => (
            <div
              key={menu.id}
              className={`${
                selectedMenu == menu.name ? "border-b-8 border-orange-400" : ""
              }  p-4 cursor-pointer`}
              onClick={() => handleMenuChange(menu.name)}
            >
              {menu.name}
            </div>
          ))}
        </div>
        <div className="w-full border-b"></div>

        <div className="flex flex-col pt-10">
          {/* 공연정보 */}
          <div>{goods.gdesc}</div>
          {/* 공연후기 */}
          {selectedMenu == "공연후기" ? (
            <div className="flex flex-col text-stone-700 space-y-10 ">
              <div className="space-y-2">
                <div className="font-bold"> 꼭 읽어주세요</div>
                <div>
                  게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이
                  블라인드 처리될 수 있습니다. <br />
                  특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며
                  전화번호, 이메일 등의 개인정보는 악용될 우려가 있으므로 게시를
                  삼가 주시기 바랍니다. <br />
                  사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한
                  게시자의 경우 인터파크 티켓 게시판 작성 권한이 제한됩니다.
                </div>
              </div>
              <div className="font-bold ">
                총 <span className="text-orange-400">1973</span>개의 관람후기가
                등록되었습니다.
              </div>

              <Review review={reviewSample} />
              <Review review={reviewSample} />
              <Review review={reviewSample} />
              <Review review={reviewSample} />
              <Review review={reviewSample} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* right */}
      <div className="flex  w-full md:w-3/12   flex-col pt-10 ">
        <div className="flex   flex-col items-center rounded justify-center sticky top-0 text-stone-600">
          {/* cal */}
          <div className="flex mt-5 flex-col border rounded-xl p-3 ">
            <div className=" ml-4 font-semibold ">관람일</div>
            <div className="border-b">
              <CalendarBox>
                <StyleCalendar
                  locale="en"
                  onChange={handleDateChange}
                  value={date}
                  minDate={startDate}
                  maxDate={endDate}
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
            onClick={handleClickReservation}
            className="flex justify-center cursor-pointer items-center  w-96 m-4 h-14 rounded text-xl text-white font-bold bg-orange-400"
          >
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

  .react-calendar__tile--now {
    background-color: #ffd9b3;
  }
`;

export default ReadPage;
