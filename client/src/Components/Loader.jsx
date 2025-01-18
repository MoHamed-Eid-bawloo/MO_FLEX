import { loader } from "../assets/index"

const Loader = ({ title }) => {
  return (
    <div className="flex-1 flex flex-col justify-start items-center">
        <img src={loader} alt="" className="h-16 w-16" />
        <h1 className="text-xl text-lightGray2 mt-2">{title ? title : "loading..."}</h1>
    </div>
  )
}

export default Loader