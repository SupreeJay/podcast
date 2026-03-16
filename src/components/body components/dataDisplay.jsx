import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

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

const DataDisplay = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeRowId, setActiveRowId] = useState(null);
    const [playingId, setPlayingId] = useState(null);
    const [audio] = useState(() => new Audio()); // Initialise safely

    // 1. Define this FIRST so toggleFavorite can see it
    const showRowModal = (id) => {
        setActiveRowId(id);
        setTimeout(() => setActiveRowId(null), 3000);
    };

    // 2. Audio Cleanup - Stops music when you leave the page
    useEffect(() => {
        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [audio]);

    const toggleFavorite = (id) => {
        setPodcasts(prev => {
            const updated = prev.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p);
            const favoriteIds = updated.filter(p => p.favorite).map(p => p.id);
            localStorage.setItem('my_podcast_favorites', JSON.stringify(favoriteIds));

            const item = updated.find(p => p.id === id);
            if (item?.favorite) showRowModal(id);
            return updated;
        });
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
            const itunesUrl = 'https://itunes.apple.com/search?term=general&entity=podcastEpisode&limit=100';
            try {
                const response = await fetch(itunesUrl);
                const data = await response.json();
                if (data.results) {
                    const savedFavorites = JSON.parse(localStorage.getItem('my_podcast_favorites')) || [];
                    const formattedData = data.results.map((item) => {
                        const id = item.trackId || item.collectionId || Math.random();
                        return {
                            id: id,
                            coverImage: item.artworkUrl600 || item.artworkUrl100,
                            title: item.trackName || item.collectionName,
                            tag: item.primaryGenreName || "Podcast",
                            speaker: item.artistName || item.collectionName || "Various Hosts",
                            previewUrl: item.previewUrl,
                            duration: formatDuration(item.trackTimeMillis),
                            favorite: savedFavorites.includes(id)
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
                    {podcasts.map((podcast, index) => (
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

                            <td style={{ ...cellStyle, cursor: "pointer", position: "relative", overflow: "visible" }} onClick={() => toggleFavorite(podcast.id)}>
                                {activeRowId === podcast.id && <span style={rowModalStyle}>Added to Favorite</span>}
                                <Heart size={20} color={podcast.favorite ? "#ff4b4b" : "white"} fill={podcast.favorite ? "#ff4b4b" : "none"} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Styles
const cellStyle = { padding: "12px", borderBottom: "1px solid #444", fontSize: "14px", textAlign: "center" };
const imgStyle = { width: "50px", height: "50px", borderRadius: "4px", objectFit: "cover" };
const containerStyle = { width: "100%", height: "58vh", overflowY: "auto", overflowX: "hidden", backgroundColor: "#121212" };
const rowModalStyle = {
    position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-90%) translateY(100%)',
    backgroundColor: '#ff4b4b', color: 'white', fontSize: '10px', padding: '4px 8px',
    borderRadius: '12px', whiteSpace: 'nowrap', zIndex: 100, fontWeight: 'bold',
    pointerEvents: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', animation: 'popAndFade 3s ease-out forwards'
};

export default DataDisplay;
