import { useState } from "react"
import { NavLink } from "react-router-dom"
import { HiStar, HiOutlineMenu } from "react-icons/hi"
import { BiSolidCameraMovie, BiSolidHome, BiSearch } from "react-icons/bi"
import { TiGroup } from "react-icons/ti"
import { SiThemoviedatabase } from "react-icons/si"
import { RiCloseLine } from "react-icons/ri"
import { AiFillGithub } from "react-icons/ai"
import { FaHeart, FaBookmark } from "react-icons/fa"

const links = [
  { name: "Home", to: "/", icon: BiSolidHome },
  { name: "Search Movie", to: "/movieSearch", icon: BiSearch },
  { name: "Popular movies", to: "/popularMovies", icon: HiStar },
  { name: "Upcoming movies", to: "/allUpComMovies", icon: BiSolidCameraMovie },
  { name: "Actors", to: "/actors", icon: TiGroup },
  { name: "Favorites", to:"/favorites", icon: FaHeart },
  { name: "Watchlist", to:"/watchlist", icon: FaBookmark },
  { name: "Github", to: "https://github.com/MoHamed-Eid-bawloo/MO_FLEX", icon: AiFillGithub },
]

const NavLinks = ({ handleClick }) => {
  return (
    <div>
      {
        links.map((link) => {
          return (
            <NavLink
              key={link.name}
              to={link.to}
              className={({isActive}) => `flex items-center justify-start text-sm font-medium my-5 text-gray-400 hover:text-mainorange ${ isActive ? "text-mainorange" : ""}`}
            >
              <link.icon className="h-5 w-5 mr-2"  />
              {link.name}
            </NavLink>
          )
        })
      }
    </div>
  )
}

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="hidden flex-col items-start justify-between h-[100vh] w-[180px] px-4 py-5 bg-secondaryGray border-r border-lightGray1 sm:flex">
        <NavLinks />
        <div className="w-full flex flex-col justify-center items-center text-gray-400 font-bold">
          <span>Powered by</span>
          <SiThemoviedatabase className="ml-2 text-mainorange text-5xl"/>
        </div>
      </div>

      {/* mobile sidebar */}
      <div className="absolute sm:hidden block right-2 top-2 md:right-3 md:top-4">
        {
          mobileMenuOpen ? <RiCloseLine className="w-6 h-6 text-white" onClick={() => setMobileMenuOpen(false)}/> : <HiOutlineMenu className="w-6 h-6 text-white" onClick={() => setMobileMenuOpen(true)}/>
        }
      </div>

      <div className={`absolute h-screen top-0 w-2/3 flex flex-col items-start justify-between px-4 py-5 bg-primaryGray/90 z-10 backdrop-blur-xl smooth-transition sm:hidden ${mobileMenuOpen ? "left-0" : "-left-full"}`}>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
        <div className="w-full flex flex-col justify-center items-center text-gray-400 font-bold">
          <span>Powered by</span>
          <SiThemoviedatabase className="ml-2 text-mainorange text-5xl"/>
        </div>
      </div>

    </>
  )
}

export default Sidebar;