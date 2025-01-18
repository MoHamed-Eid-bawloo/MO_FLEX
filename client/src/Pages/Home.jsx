import React from 'react'
import UpcomingMovies from '../Components/UpCommingMovies'
import MoreContent from '../Components/MoreContent'
function Home() {
  return (
    <div className="flex py-5 flex-col-reverse md:flex-row">
      <UpcomingMovies/>
      <MoreContent/>
    </div>
  )
}

export default Home