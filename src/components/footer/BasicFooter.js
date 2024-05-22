import React from "react";

function BasicFooter() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-56  border-t border-stone-200 ">
      {/* 상단 */}
      <div className="flex border-b border-stone-200 py-5 md:w-3/5  text-stone-700  ">
        <div className="border-r px-4 text-sm md:text-base">회사소개</div>
        <div className="border-r px-4 text-sm md:text-base">이용약관</div>
        <div className="border-r px-4  text-sm md:text-base">
          개인정보처리방침
        </div>
        <div className="border-r px-4 text-sm md:text-base ">
          청소년보호정책
        </div>
        <div className="border-r px-4 text-sm md:text-base">이용안내</div>
        <div className="px-4 text-sm md:text-base">티켓판매안내</div>
      </div>
      {/* 하단 */}
      <div className="flex md:w-3/5 p-5 space-x-10 text-sm md:text-base">
        <div className="flex text-xl md:text-2xl font-bold text-stone-600 ">
          <div>TICKET PARK</div>
          <img src="/logo.png" alt="" className="w-8 h-8" />
        </div>
        <div>
          <div>티켓파크(주)</div>
          <div>대표: 조은이</div>
          <div>이메일: ticketparkhelp@gmail.com</div>
          <div>사업자등록번호: 111-11-11111</div>
        </div>
      </div>
    </div>
  );
}

export default BasicFooter;
