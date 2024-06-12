import React, { useState } from "react";
import { API_SERVER_HOST } from "../../api/goodsApi";

const host = API_SERVER_HOST;

const initState = {
  id: "",
  seatClass: "",
  seatNumber: "",
  price: 0,
};

function ReservationModal({ selectedDate, goods, onConfirm, onCancel }) {
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

  return (
    <div
      className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center items-center bg-black bg-opacity-20`}
    >
      <div className=" absolute bg-white   shadow opacity-100 w-1/4 rounded mt-10 pb-6  mb-10 px-6 min-w-[1000px] min-h-[700px]">
        <div className="flex justify-between text-xl font-semibold text-stone-700 my-5">
          <div>예매 - 좌석선택</div>
        </div>
        <div className="flex">
          <div className="bg-zinc-700  w-2/3  p-10 space-y-6">
            {/*Screen*/}
            <div className="flex justify-center text-2xl  pt-4 pb-4 text-stone-700 text-center">
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
                    onClick={() => handleSeatClick(seat, index, seatClass)}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <div>{index + 1}</div>
                      <div className="text-xs font-semibold">{seatClass}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-orange-100 text-sm mt-">
              *가격 안내 <br /> VIP석 150,000원/ R석 130,000원/ S석 100,000원 /
              A석 80,000원
            </div>
          </div>
          <div className="flex flex-col  w-1/3 pl-8 justify-between ">
            <div>
              <div className="flex items-center font-semibold space-x-3 text-stone-700 pb-3 border-b border-stone-400">
                <div>{goods.title}</div>

                {goods.age === 0 ? (
                  <div className="flex justify-center items-center min-w-7 min-h-7  rounded-full bg-green-600 text-xs text-white">
                    전체
                  </div>
                ) : (
                  ""
                )}
                {goods.age === 12 ? (
                  <div className="flex justify-center items-center min-w-7 min-h-7 rounded-full bg-blue-500 text-xs text-white">
                    12
                  </div>
                ) : (
                  ""
                )}
                {goods.age === 15 ? (
                  <div className="flex justify-center items-center min-w-7 min-h-7 rounded-full bg-yellow-500 text-xs text-white">
                    15
                  </div>
                ) : (
                  ""
                )}
                {goods.age === 18 ? (
                  <div className="flex justify-center items-center  min-w-7 min-h-7  rounded-full bg-red-500 text-xs text-white">
                    18
                  </div>
                ) : (
                  ""
                )}
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
                <div className="">공연일자 {selectedDate} 2024-12-12</div>
                <div className=" ">공연시작시간 08:45 (1회차) </div>
                <div className=" ">총 {goods.time}분</div>
                <div>
                  선택한 좌석 :
                  <span className="font-semibold text-blue-500">
                    {" "}
                    {`<${selectedSeat.seatClass}> ${
                      selectedSeat ? selectedSeat.seatNumber : ""
                    }`}
                    번
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between text-lg font-semibold ">
                <div>최종결제금액</div>
                <div>
                  <span className="text-orange-400 text-xl">
                    {new Intl.NumberFormat("ko-KR").format(selectedSeat.price)}
                  </span>
                  원
                </div>
              </div>
              {/* button */}
              <div className="justify-end w-full flex space-x-2">
                <button
                  className="w-1/2 rounded bg-gray-500 px-6 pt-4 pb-4 text-lg hover:bg-gray-400 text-white"
                  onClick={() => {
                    if (onCancel) {
                      onCancel();
                    }
                  }}
                >
                  취소
                </button>
                <button
                  className="w-1/2 rounded bg-amber-500  px-6 pt-4 pb-4 text-lg hover:bg-amber-400 text-white"
                  onClick={() => onConfirm(selectedSeat)}
                >
                  예매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;
