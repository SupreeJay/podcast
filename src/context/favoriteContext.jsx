import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    // Load initial favorites from localStorage on startup
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('my_podcast_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage every time the favorites list changes
    useEffect(() => {
        localStorage.setItem('my_podcast_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (podcast) => {
        setFavorites(prev => {
            const isAlreadyFav = prev.some(item => item.id === podcast.id);
            if (isAlreadyFav) {
                return prev.filter(item => item.id !== podcast.id);
            } else {
                return [...prev, podcast]; // Store the whole object so you can display it in the Fav component
            }
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Custom hook to use favorites in any component
export const useFavorites = () => useContext(FavoritesContext);
