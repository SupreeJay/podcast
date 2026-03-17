import React, { useEffect } from 'react'
import Hero from './body components/hero'
import PlaySection from './body components/playSection'
import Data from './body components/dataDisplay'
import { Routes, Route } from 'react-router-dom'
import Career from './sideBarComponents/career'
import Education from './sideBarComponents/education'
import Entrepreneur from './sideBarComponents/entrepreneurship'
import Finance from './sideBarComponents/finance'
import Government from './sideBarComponents/government'
import History from './sideBarComponents/history'
import Leader from './sideBarComponents/leadership'
import News from './sideBarComponents/news'
import Science from './sideBarComponents/science'
import Tech from './sideBarComponents/tech'
import Favorite from './favorite'
import Search from './body components/search'
import { useContext} from 'react'
import { SearchContext } from './searchContext'
import { useLocation } from 'react-router-dom'

const Body = () => {
  const location = useLocation();
  const {submittedQuery,setSubmittedQuery } = useContext(SearchContext)
   useEffect(() => {
      if (submittedQuery){
        setSubmittedQuery("");
      }
    }, [location.pathname])
  return (

   


    <main style={{ margin: "0px", flexGrow: "1", overscrollBehavior: "none", height: "100%" }}>
      <Hero />
      { submittedQuery ? (<Search/>) : (  
      <Routes>
        <Route path="/" element={<Data />} />
        <Route path="/career" element={<Career/>} />
        <Route path="/education" element={<Education/>} />
        <Route path="/entrepreneur" element={<Entrepreneur/>} />
        <Route path="/finance" element={<Finance/>} />
        <Route path="/government" element={<Government/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/leader" element={<Leader/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/science" element={<Science/>} />
        <Route path="/tech" element={<Tech/>} />
        <Route path='/favorite' element={<Favorite/>}/>
      </Routes>) }
      <PlaySection />

    </main>
  )
}

export default Body