import React from 'react'
import { Play, Pause, Heart, CircleArrowLeftIcon, CircleArrowRightIcon, Shuffle, Repeat } from 'lucide-react'
{/*import Lottie from 'lottie-react';*/}
{/*import voiceAnimation from './voice-icon.json';*/}


const PlaySection = () => {
  return (
    <div style={{width:"100%",
        height:"12%", 
        display:"flex", 
        flexDirection:"row", 
        justifyContent:"normal"
        }}>


        <div id='currentlyPlaying'
         style={{width:"10%", display:'grid', placeItems:'center', padding: '8px'}}
        >
       <h4> Animated Voice State </h4>
        {/*<Lottie animationData={voiceAnimation} loop={isPlaying} autoplay={isPlaying} />*/}
        </div>

        <div id='playState'
         style={{ width:"20%",display:"flex" , justifyContent:"space-around", alignItems:"center"}}
        >
                <CircleArrowLeftIcon/>
                <div id='togglePlay'> <Play/> </div>
                <CircleArrowRightIcon/>
        </div>

         <div id='songTitle'  style={{ width:"50%", display:"flex" , justifyContent:"space-around", alignItems:"center"}}>
            <p> Title</p>
            {/*Title of the Song*/}
            <audio></audio>

        </div>

        <div id='songCharacter'
        style={{ width:"20%",display:"flex" , justifyContent:"space-around", alignItems:"center"}}
        
        >
            <Repeat/>
            <Shuffle/>
            <Heart/>
        </div>


    </div>
  )
}

export default PlaySection