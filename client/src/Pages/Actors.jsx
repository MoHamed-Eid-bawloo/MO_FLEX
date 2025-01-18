import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Actors() {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate()
  
    function handleSubmit() {
      navigate(`/actors/${inputValue}`);
  
      setInputValue(" ");
    }
  return (
    <div className="w-full absolute top-0 left-0">
      <div className="w-full flex items-center justify-center py-5 border-b border-lightGray1">
        <div className="w-5/6 xs:w-2/3 flex items-center">
          <input 
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            value={inputValue}
            className="flex-1 h-10 rounded-l-full bg-black/40 pl-3 text-mainorange outline-none border border-lightGray1"
            type="text"
            placeholder="search for actor"
          />
          <button 
            className="w-[70px] h-10 bg-secondaryGray flex items-center justify-center rounded-r-full border border-lightGray1 xs:w-[100px]"
            onClick={() => {
              handleSubmit();
            }}            
          >
            <BiSearch className="font-bold text-white text-2xl" />
          </button>
        </div>
      </div>
      <Outlet />
    </div>  )
}
