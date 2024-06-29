import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../api/goodsApi";
import AgeComponent from "./AgeComponent";
import { PostReserved } from "../../api/ReservationApi";
import { GoX } from "react-icons/go";

const host = API_SERVER_HOST;

const initState = {
  id: "",
  seatClass: "",
  seatNumber: "",
  price: 0,
};

function ReservationModal({
  selectedTime,
  selectedDate,
  startDate,
  goods,
  onConfirm,
  onCancel,
}) {
  const [selectedSeat, setSelectedSeat] = useState(initState);
  const [reservedSeat, setReservedSeat] = useState([]);

  const seats = Array.from({ length: 6 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => ({
      id: row * 8 + col + 1,
      row: row + 1,
      col: col + 1,
    }))
  );

  // 좌석 선택
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
      id: index,
      seatClass: seatClass,
      seatNumber: index,
      price: price,
    });
  };

  //이미 예약된 좌석 클릭 시
  const handleClickReservedSeat = () => {
    alert("이미 예약된 좌석입니다.");
    return;
  };

  useEffect(() => {
    //requestDTO (예약좌석확인)
    const select = {
      gno: goods.gno,
      time: goods.times[selectedTime - 1],
      date: selectedDate,
    };

    PostReserved(select).then((result) => {
      setReservedSeat(result.reservedSeats); //이미 예약된 좌석
    });
  }, [selectedDate]);

  return (
    <div
      className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center items-center bg-black bg-opacity-20`}
    >
      <div className="absolute flex flex-col justify-center md:justify-normal bg-white shadow opacity-100 md:w-1/4 rounded mt-10 pb-6 mb-10 px-6 w-full md:min-w-[1000px] h-screen md:h-auto md:min-h-[700px]">
        <div className="flex   md:flex-row justify-between text-xl font-semibold text-stone-700 my-5">
          <div>예매 - 좌석선택</div>
          <div className="cursor-pointer">
            <GoX
              onClick={() => {
                if (onCancel) {
                  onCancel();
                }
              }}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col space-y-5 md:space-y-0">
          <div className="bg-zinc-700 md:w-2/3 p-3 md:p-10 space-y-6">
            {/*Screen*/}
            <div className="flex justify-center text-2xl pt-4 pb-4 text-stone-700 text-center">
              <div className="flex justify-center items-center mb-4 w-full md:min-w-[560px] h-24 bg-white shadow-md shadow-white"></div>
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

                const isReserved = reservedSeat.includes(`${index + 1}`);
                const isSelected = selectedSeat.id === index + 1;

                const buttonClass = ` w-7 h-8 md:w-12 md:h-12 rounded-t-2xl ${colSpan} ${
                  isReserved
                    ? "bg-zinc-600  cursor-not-allowed"
                    : isSelected
                    ? "bg-orange-400 text-white"
                    : "bg-zinc-400"
                }`;
                return (
                  <button
                    key={seat.id}
                    className={buttonClass}
                    onClick={() => {
                      !isReserved
                        ? handleSeatClick(seat, index + 1, seatClass)
                        : handleClickReservedSeat();
                    }}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <div className="md:text-base text-xs">{index + 1}</div>
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
          <div className="flex flex-col w-full md:w-1/3  md:pl-8 justify-between ">
            <div>
              <div className="flex items-center font-semibold space-x-3 text-stone-700 pb-3 border-b border-stone-400">
                <div>{goods.title}</div>
                <AgeComponent age={goods.age} />
              </div>

              <div className="hidden md:block w-44 h-64 overflow-hidden mt-3">
                <img
                  src={`${host}/api/goods/view/${goods.uploadFileNames[0]}`}
                  className="w-full h-full object-cover"
                  alt="image"
                />
              </div>

              <div className="space-y-3 mt-4">
                <div className=" ">{goods.place} </div>
                <div className="">
                  공연일자{" "}
                  {selectedDate
                    ? selectedDate
                    : startDate.toISOString().split("T")[0]}
                </div>
                <div className=" ">
                  공연시작시간 {goods.times[selectedTime - 1]} ({selectedTime}
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
                  className="w-1/2 rounded bg-amber-500 px-6 pt-4 pb-4 text-lg hover:bg-amber-400 text-white"
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
