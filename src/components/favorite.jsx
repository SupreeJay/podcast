import React from 'react';
import { useFavorites } from '../context/favoriteContext.jsx';
import { Heart, Play } from 'lucide-react';

const Favorite = () => {
    // 1. Access the global favorites list and the toggle function
    const { favorites, toggleFavorite } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div style={{ color: 'white', padding: '40px', textAlign: 'center' }}>
                <h2>Your Favorites is empty</h2>
                <p>Heart some podcasts to see them here!</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#121212', height: '58vh', overflow:"scroll" }}>
            <h1 style={{ color: 'white', marginBottom: '20px' }}>Your Favorite Podcasts</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {favorites.map((podcast) => (
                    <div key={podcast.id} style={cardStyle}>
                        <img src={podcast.coverImage} alt={podcast.title} style={imgStyle} />
                        
                        <div style={{ padding: '10px' }}>
                            <h3 style={titleStyle}>{podcast.title}</h3>
                            <p style={artistStyle}>{podcast.speaker}</p>
                            
                            <div style={actionAreaStyle}>
                                {/* Play button could trigger your PlaySection logic */}
                                <Play size={20} color="white" style={{ cursor: 'pointer' }} />
                                
                                {/* Clicking this heart will REMOVE it from the list instantly */}
                                <Heart 
                                    size={20} 
                                    fill="#ff4b4b" 
                                    color="#ff4b4b" 
                                    onClick={() => toggleFavorite(podcast)} 
                                    style={{ cursor: 'pointer' }} 
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Quick Styles
const cardStyle = { backgroundColor: '#1e1e1e', borderRadius: '8px', overflow: 'hidden', color: 'white' };
const imgStyle = { width: '100%', aspectRatio: '1/1', objectFit: 'cover' };
const titleStyle = { fontSize: '16px', margin: '5px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const artistStyle = { fontSize: '14px', color: '#aaa', margin: '0 0 10px 0' };
const actionAreaStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

export default Favorite;
