import React from 'react';
{/*import SlidingList from './slidingText'*/}

import { useContext } from 'react';
import { SearchContext } from '../searchContext';


const Hero = () => {
   const {query, setQuery, setSubmittedQuery}  = useContext(SearchContext)
   const handleSubmit = (e) =>{
    e.preventDefault();
    setSubmittedQuery(query)
   }
  
    return (
        <section id="heroSection"
            style={{ textAlign:"center", 
                     width: "100%",
                     height: "30%", 
                     flexGrow: 1, 
                     flexShrink:"shrink", 
                     flexWrap:"nowrap", 
                     display: "flex",
                     flexDirection: "column", 
                     gap: "0px", 
                     backgroundImage:"url('/Hero-Image/favImage-2.jpeg')", 
                     backgroundRepeat:"no-repeat", 
                     backgroundPosition:"100% 100%", 
                     backgroundSize:"100% 100%",
                     textWrap:"wrap ",
                    
                    }}>
            <div id='searchSection' 
                 style={{
                        display:"flex", 
                        flexDirection: "row", 
                        margin: "auto", 
                        border: "1px solid black",
                        height: "fit-content", 
                        padding: "5px", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        width: "60%",
                        borderRadius: "30px", 
                        backgroundColor:"white" , 
                        textAlign: "center",
                        marginTop:"60px",
                        
                    }}>
          
                        <form onSubmit={handleSubmit}
                            style={{
                                width:"100%",
                            }}
                        >  

                    <input 
                    id="search"
                    type='text' 
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    style={{
                            height:"40px",
                            width: "100%", 
                            border: "1px solid white", 
                            outline: "none",
                            color: "black ", 
                            backgroundColor: "white", 
                            fontSize:"20px", 
                            borderRadius: "30px", 
                            textAlign:"center"
                        }} />
                        </form>
            </div>

            {/*  <SlidingList/> */} 
        </section>
    )
}
export default Hero