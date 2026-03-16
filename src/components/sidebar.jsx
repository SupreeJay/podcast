import React from 'react'
import { Landmark, Handshake, LandPlot, Rocket, Target, CircleUser, Podcast, 
         CircleChevronLeft, Heart, Newspaper, FlaskConical, HistoryIcon, GraduationCap, CircleDollarSign, House} from "lucide-react"
import { NavLink } from 'react-router-dom';

const categories = [
  { name: "Entrepreneurship",path:"/entrepreneur", id: 1493, icon: Handshake, color: "white" },
  { name: "Finance", path:"/finance",id: 1412, icon: CircleDollarSign, color: "white" },
  { name: "Leadership", path:"/leader",id: 1491, icon: LandPlot, color: "white" },
  { name: "Career", path:"/career",id: 1410, icon: Target, color: "white" },
  { name: "Tech", path:"/tech",  id: 1318, icon: Rocket , color: "white" },
  { name: "Government",path:"/government", id: 1312, icon: Landmark, color: "white" },
  { name: "Education",path:"/education", id: 1304, icon: GraduationCap, color: "white" },
  { name: "History",path:"/history", id: 1487, icon: HistoryIcon, color: "white" },
  { name: "Science",path:"/science", id: 1315, icon: FlaskConical, color: "white" },
  { name: "News", path:"/news",id: 1489, icon: Newspaper , color: "white" },
];

// 2. ACCEPT THE onCategorySelect PROP
const Sidebar = ({ onCategorySelect }) => {
    const [isHovered, setIsHovered] = React.useState(null)

    return (
        <aside style={{
            margin:"0px",  
            minWidth:"350px",
            maxWidth:"450px",
            height:"100vh", 
            backgroundColor:"black",
            color:'white',
            display:"flex",
            flexDirection:"column",
            justifyContent: "flex-start",
            paddingLeft:"10px",
            boxSizing:"border-box",
            flexShrink:"0"
        }}>
            {/* Logo Section */}
            <div id='logoBrand' style={{ display:"flex", padding:"10px", alignItems:"center", gap:"10px", height:"10%" }}> 
                 <Podcast color='gold' size="50"/> <h2 style={{margin:"0px"}}>Holad Podcast</h2>
            </div>

            {/* Category Section */}
            <div id='category' style={{ display:"flex", flexDirection:"column", padding:"10px", gap:"20px", height:"40%", overflowY:"scroll", scrollbarWidth:"thin" }}> 
                <h2 style={{margin:"0px 0px 10px 0px"}}> Category </h2>
                
                {categories.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.id} 
                        onMouseEnter={() => setIsHovered(item.name)} 
                        onMouseLeave={() => setIsHovered(null)}      
                        // 3. TRIGGER THE CALLBACK ON CLICK
                        onClick={() => { onCategorySelect && onCategorySelect(item.id) } }
                        style={{ 
                            display: 'flex',
                            gap: '10px',
                            cursor:"pointer",
                            backgroundColor: isHovered === item.name ? "white" : "black",
                            color: isHovered === item.name ? "black" : "white",
                            width:"100%",
                            padding:"10px", // Increased padding for better click target
                            border:"1px solid lightgray",
                            transition: "0.2s all ease",
                            textDecoration:"none"
                        }}
                    >
                        <item.icon color={isHovered === item.name ? "black" : item.color} size={25} />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>

            {/* Rest of your sidebar (Home and User Profile) remains the same */}
            <div id='homeSection' style={{ display:"flex", flexDirection:"column", padding:"10px", height:"40%" }}>
                <h2 style={{margin:"0px", width:"100%"}}> Home </h2>
                <ul style={{ width:"85%", listStyle:"none", padding:0 }}>
                     <NavLink to="/recentlyplayed" style={{textDecoration:"none" }}> 
                    <li style={{ display:"flex", padding:"10px", alignItems:"center", gap:"10px", color:"purple", cursor:"pointer" }}><CircleChevronLeft/> Recently Played</li>
                     </NavLink>
                    <NavLink to="/favorite" style={{textDecoration:"none" }}> 
                    <li style={{ display:"flex", padding:"10px", alignItems:"center", gap:"10px",color:"purple", cursor:"pointer" }}><Heart/> Favorites</li>
                     </NavLink>
                    <NavLink to="/" style={{textDecoration:"none" }}> 
                    <li style={{ display:"flex", padding:"10px", alignItems:"center", gap:"10px", cursor:"pointer", color:"purple" }}><House/> Home Page</li>
                     </NavLink>
                </ul>
            </div>

            <div id='userProfile' style={{ display:"flex", padding:"10px", alignItems:"center", gap:"10px", height:"10%" }}> 
                <CircleUser size="35"/>
                <h2> Holad </h2>
            </div>
        </aside>
    )
}
export default Sidebar
