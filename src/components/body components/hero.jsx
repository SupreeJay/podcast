import React from 'react';
{/*import SlidingList from './slidingText'*/}

const Hero = () => {
   const [search, setSearch ] = React.useState("");
   const handleChange = (e) =>{
    setSearch(e.target.value);
   };

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
          
                        
                    <input 
                    id="search"
                    type='text' 
                    onChange={handleChange}
                    defaultValue="Search by creators name only"
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
            </div>

            {/*  <SlidingList/> */} 
        </section>
    )
}
export default Hero