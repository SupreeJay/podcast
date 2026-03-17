import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/favoriteContext'; // 1. Import the context hook

const formatDuration = (ms) => {
    if (!ms) return "0:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const minsStr = mins < 10 && hrs > 0 ? `0${mins}` : mins;
    const secsStr = secs < 10 ? `0${secs}` : secs;
    return hrs > 0 ? `${hrs}:${minsStr}:${secsStr}` : `${mins}:${secsStr}`;
};

const GovernmentDisplay = () => {
    // 2. Consume global favorites state and toggle function
    const { favorites, toggleFavorite } = useFavorites();

    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeRowId, setActiveRowId] = useState(null);
    const [playingId, setPlayingId] = useState(null);
    const [audio] = useState(() => new Audio());

    const showRowModal = (id) => {
        setActiveRowId(id);
        setTimeout(() => setActiveRowId(null), 3000);
    };

    useEffect(() => {
        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [audio]);

    // 3. Updated Favorite Handler: Uses global context instead of local state
    const handleFavoriteClick = (podcast) => {
        const isCurrentlyFav = favorites.some(fav => fav.id === podcast.id);
        toggleFavorite(podcast);
        
        if (!isCurrentlyFav) {
            showRowModal(podcast.id);
        }
    };

    const handlePlay = (podcast) => {
        if (playingId === podcast.id) {
            audio.pause();
            setPlayingId(null);
        } else {
            audio.src = podcast.previewUrl;
            audio.play().catch(err => console.error("Playback failed:", err));
            setPlayingId(podcast.id);
            audio.onended = () => setPlayingId(null);
        }
    };

    useEffect(() => {
        const getPodcasts = async () => {
            const itunesUrl = 'https://itunes.apple.com/search?term=government&entity=podcastEpisode&limit=100genreId=1511';
            try {
                const response = await fetch(itunesUrl);
                const data = await response.json();
                if (data.results) {
                    const formattedData = data.results.map((item) => {
                        const id = item.trackId || item.collectionId || Math.random();
                        return {
                            id: id,
                            coverImage: item.artworkUrl600 || item.artworkUrl100,
                            title: item.trackName || item.collectionName,
                            tag: item.primaryGenreName || "Government",
                            speaker: item.artistName || item.collectionName || "Various Hosts",
                            previewUrl: item.previewUrl,
                            duration: formatDuration(item.trackTimeMillis),
                        };
                    });
                    setPodcasts(formattedData);
                }
            } catch (error) {
                console.error("Fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };
        getPodcasts();
    }, []);

    if (loading) return <div style={{ color: "white", padding: "20px" }}>Loading Podcasts...</div>;
    if (podcasts.length === 0) return <div style={{ color: "white", padding: "20px" }}>No podcasts found.</div>;

    return (
        <div id='displaySection' style={containerStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "white" }}>
                <thead>
                    <tr style={{ backgroundColor: "#333", textAlign: "left" }}>
                        <th style={cellStyle}>S/N</th>
                        <th style={cellStyle}>Cover</th>
                        <th style={cellStyle}>Title</th>
                        <th style={cellStyle}>Tag</th>
                        <th style={cellStyle}>Collection</th>
                        <th style={cellStyle}>Duration</th>
                        <th style={cellStyle}>Fav</th>
                    </tr>
                </thead>
                <tbody>
                    {podcasts.map((podcast, index) => {
                        // 4. Reactive check: Is this podcast in global favorites?
                        const isFav = favorites.some(fav => fav.id === podcast.id);

                        return (
                            <tr key={podcast.id} style={{ borderBottom: "1px solid #444" }}>
                                <td style={cellStyle}>{index + 1}</td>
                                <td style={cellStyle}>
                                    <img src={podcast.coverImage} alt="Cover" style={imgStyle} />
                                </td>
                                <td style={{ ...cellStyle, fontWeight: "bold" }}>{podcast.title}</td>
                                <td style={cellStyle}>{podcast.tag}</td>
                                <td style={cellStyle}>{podcast.speaker}</td>
                                <td
                                    style={{ ...cellStyle, cursor: "pointer", color: playingId === podcast.id ? "#ff4b4b" : "white" }}
                                    onClick={() => handlePlay(podcast)}
                                >
                                    {playingId === podcast.id ? "⏸ Playing" : podcast.duration}
                                </td>

                                <td 
                                    style={{ ...cellStyle, cursor: "pointer", position: "relative", overflow: "visible" }} 
                                    onClick={() => handleFavoriteClick(podcast)}
                                >
                                    {activeRowId === podcast.id && <span style={rowModalStyle}>Added to Favorite</span>}
                                    <Heart 
                                        size={20} 
                                        color={isFav ? "#ff4b4b" : "white"} 
                                        fill={isFav ? "#ff4b4b" : "none"} 
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

// Styles remain unchanged
const cellStyle = { padding: "12px", borderBottom: "1px solid #444", fontSize: "14px", textAlign: "center" };
const imgStyle = { width: "50px", height: "50px", borderRadius: "4px", objectFit: "cover" };
const containerStyle = { width: "100%", height: "58vh", overflowY: "auto", overflowX: "hidden", backgroundColor: "#121212" };
const rowModalStyle = {
    position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-90%) translateY(100%)',
    backgroundColor: '#ff4b4b', color: 'white', fontSize: '10px', padding: '4px 8px',
    borderRadius: '12px', whiteSpace: 'nowrap', zIndex: 100, fontWeight: 'bold',
    pointerEvents: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', animation: 'popAndFade 3s ease-out forwards'
};

export default GovernmentDisplay;
