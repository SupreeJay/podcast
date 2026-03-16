import React, {useState, useEffect} from "react";
import DataDisplay from "./dataDisplay";
import PlaySection from "./playSection";

const ParentComponent = () => {
    const [podcasts, setPodcasts] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    if (!window.podcastAudio) window.podcastAudio = new Audio();

    const handlePlay = (index) => {
        const podcast = podcasts[index];
        if (!podcast) return;

        if (currentIndex === index) {
            if (isPlaying) {
                window.podcastAudio.pause();
            } else {
                window.podcastAudio.play();
            }
            setIsPlaying(!isPlaying);
        } else {
            window.podcastAudio.src = podcast.previewUrl;
            window.podcastAudio.play();
            setCurrentIndex(index);
            setIsPlaying(true);
        }
    };

    const activePodcast = podcasts[currentIndex] || null;

    // Logic for Next and Previous
    const handleNext = (shuffle) => {
        let nextIndex = shuffle 
            ? Math.floor(Math.random() * podcasts.length) 
            : currentIndex + 1;
        
        if (nextIndex < podcasts.length) handlePlay(nextIndex);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) handlePlay(currentIndex - 1);
    };

    return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
            <DataDisplay 
                podcasts={podcasts} 
                setPodcasts={setPodcasts} 
                onPlay={handlePlay} 
                playingId={activePodcast?.id} 
            />

            {/* CONNECTING PROPS HERE */}
            <PlaySection 
                activePodcast={activePodcast}
                isPlaying={isPlaying}
                onTogglePlay={() => handlePlay(currentIndex)}
                onNext={handleNext}
                onPrevious={handlePrevious}
                podcasts={podcasts}
                setPodcasts={setPodcasts}
            />
        </div>
    );
};
