// App.jsx
import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import "./App.css";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */
Amplify.configure(outputs);
const client = generateClient({ authMode: "userPool" });

// TMDB API configuration
const TMDB_API_KEY = "your_tmdb_api_key_here"; // Get free API key from https://www.themoviedb.org/settings/api
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function App() {
  const [userprofiles, setUserProfiles] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchUserProfile();
    fetchMovieData();
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  async function fetchUserProfile() {
    try {
      const { data: profiles } = await client.models.UserProfile.list();
      setUserProfiles(profiles);
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    }
  }

  async function fetchMovieData() {
    try {
      setLoading(true);
      
      // Fetch trending movies
      const trendingResponse = await fetch(
        `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
      );
      const trendingData = await trendingResponse.json();
      setTrendingMovies(trendingData.results.slice(0, 6));

      // Fetch popular movies
      const popularResponse = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
      );
      const popularData = await popularResponse.json();
      setPopularMovies(popularData.results.slice(0, 6));

      // Set featured movie (first popular movie)
      if (popularData.results.length > 0) {
        setFeaturedMovie(popularData.results[0]);
      }

    } catch (error) {
      console.error("Error fetching movie data:", error);
      // Fallback mock data
      setTrendingMovies(getFallbackMovies().slice(0, 3));
      setPopularMovies(getFallbackMovies().slice(3, 6));
      setFeaturedMovie(getFallbackMovies()[0]);
    } finally {
      setLoading(false);
    }
  }

  const getFallbackMovies = () => [
    {
      id: 1,
      title: "Inception",
      overview: "A thief who steals corporate secrets through dream-sharing technology.",
      poster_path: "/inception.jpg",
      vote_average: 8.4,
      release_date: "2010-07-16",
      genre_ids: [28, 878]
    },
    {
      id: 2,
      title: "The Dark Knight",
      overview: "Batman faces the Joker, a criminal mastermind seeking to create chaos.",
      poster_path: "/dark_knight.jpg",
      vote_average: 9.0,
      release_date: "2008-07-18",
      genre_ids: [28, 80]
    },
    {
      id: 3,
      title: "Interstellar",
      overview: "A team of explorers travel through a wormhole in search of a new habitable planet.",
      poster_path: "/interstellar.jpg",
      vote_average: 8.6,
      release_date: "2014-11-07",
      genre_ids: [12, 18, 878]
    }
  ];

  const playMovie = async (movie) => {
    // For demo purposes, we'll use YouTube trailers
    // In a real app, you'd have actual movie streams
    const trailerSearch = `${movie.title} official trailer`;
    setCurrentVideo({
      title: movie.title,
      videoUrl: `https://www.youtube.com/embed/kaBffJ1HxTQ?si=2SPaGZOlNfQEgNfw?autoplay=1`,
      // videoUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`,
      description: movie.overview
    });
    setIsPlaying(true);
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.find(m => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter(movie => movie.id !== movieId));
  };

  const closeVideoPlayer = () => {
    setIsPlaying(false);
    setCurrentVideo(null);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const getGenreNames = (genreIds) => {
    const genres = {
      28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
      80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
      14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
      9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
      53: "Thriller", 10752: "War", 37: "Western"
    };
    return genreIds.map(id => genres[id]).filter(Boolean).slice(0, 2).join(" • ");
  };

  if (loading) {
    return (
      <div className="app-container" data-theme={isDarkTheme ? 'dark' : 'light'}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading awesome movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" data-theme={isDarkTheme ? 'dark' : 'light'}>
      {/* Video Player Modal */}
      {isPlaying && currentVideo && (
        <div className="video-modal">
          <div className="video-modal-content">
            <button className="close-btn" onClick={closeVideoPlayer}>✕</button>
            <h3>{currentVideo.title}</h3>
            <div className="video-container">
              <iframe
                width="100%"
                height="400"
                src={currentVideo.videoUrl}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p>{currentVideo.description}</p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🎬 CineStream</h2>
        <nav>
          <ul>
            <li>🏠 Home</li>
            <li>🎭 Movies</li>
            <li>📺 TV Shows</li>
            <li>⭐ New & Popular</li>
            <li>❤️ My Watchlist ({watchlist.length})</li>
            <li>🔍 Search</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h1>
            Welcome to CineStream, {user.name || "Movie Lover"}! 🍿
          </h1>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkTheme ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <span className="watchlist-count">
              My Watchlist ({watchlist.length})
            </span>
            <button className="logout-btn" onClick={signOut}>
              Logout
            </button>
          </div>
        </header>

        {/* Hero Banner */}
        {featuredMovie && (
          <section className="hero-banner">
            <div className="hero-content">
              <h2>Featured Today</h2>
              <h3>{featuredMovie.title}</h3>
              <p>{featuredMovie.overview}</p>
              <div className="movie-meta">
                <span>⭐ {featuredMovie.vote_average}/10</span>
                <span>📅 {new Date(featuredMovie.release_date).getFullYear()}</span>
              </div>
              <div className="hero-actions">
                <button className="play-btn" onClick={() => playMovie(featuredMovie)}>
                  ▶️ Play Now
                </button>
                <button className="watchlist-btn" onClick={() => addToWatchlist(featuredMovie)}>
                  ❤️ Add to Watchlist
                </button>
              </div>
            </div>
            <div className="hero-poster">
              <img 
                src={`${TMDB_IMAGE_BASE}${featuredMovie.poster_path}`} 
                alt={featuredMovie.title}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="fallback-poster">🎬</div>
            </div>
          </section>
        )}

        {/* Trending Now */}
        <section className="trending-section">
          <h2>🔥 Trending Now</h2>
          <div className="dashboard-grid">
            {trendingMovies.map(movie => (
              <div className="card movie-card" key={movie.id}>
                <div className="movie-poster">
                  <img 
                    src={`${TMDB_IMAGE_BASE}${movie.poster_path}`} 
                    alt={movie.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="fallback-poster">🎬</div>
                </div>
                <h4>{movie.title}</h4>
                <p className="movie-meta">
                  {new Date(movie.release_date).getFullYear()} • {getGenreNames(movie.genre_ids)}
                </p>
                <div className="rating">⭐ {movie.vote_average.toFixed(1)}/10</div>
                <div className="movie-actions">
                  <button className="play-btn" onClick={() => playMovie(movie)}>
                    Play
                  </button>
                  <button className="view-btn" onClick={() => addToWatchlist(movie)}>
                    + Watchlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Movies */}
        <section className="featured-section">
          <h2>🎭 Popular Movies</h2>
          <div className="dashboard-grid">
            {popularMovies.map(movie => (
              <div className="card movie-card" key={movie.id}>
                <div className="movie-poster">
                  <img 
                    src={`${TMDB_IMAGE_BASE}${movie.poster_path}`} 
                    alt={movie.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="fallback-poster">🎬</div>
                </div>
                <h4>{movie.title}</h4>
                <p className="movie-meta">
                  {new Date(movie.release_date).getFullYear()} • {getGenreNames(movie.genre_ids)}
                </p>
                <p className="movie-description">{movie.overview.slice(0, 100)}...</p>
                <div className="rating">⭐ {movie.vote_average.toFixed(1)}/10</div>
                <div className="movie-actions">
                  <button className="play-btn" onClick={() => playMovie(movie)}>
                    Play
                  </button>
                  <button className="view-btn" onClick={() => addToWatchlist(movie)}>
                    + Watchlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My Watchlist */}
        {watchlist.length > 0 && (
          <section className="watchlist-section">
            <h2>❤️ My Watchlist</h2>
            <div className="dashboard-grid">
              {watchlist.map(movie => (
                <div className="card movie-card" key={movie.id}>
                  <div className="movie-poster">
                    <img 
                      src={`${TMDB_IMAGE_BASE}${movie.poster_path}`} 
                      alt={movie.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="fallback-poster">🎬</div>
                  </div>
                  <h4>{movie.title}</h4>
                  <div className="movie-actions">
                    <button className="play-btn" onClick={() => playMovie(movie)}>
                      Watch Now
                    </button>
                    <button 
                      className="remove-btn" 
                      onClick={() => removeFromWatchlist(movie.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* User Profiles */}
        {userprofiles.length > 0 && (
          <section className="profiles-section">
            <h2>User Profile</h2>
            <div className="profiles-grid">
              {userprofiles.map((profile) => (
                <div className="profile-card" key={profile.id}>
                  <h4>👤 {profile.email}</h4>
                  <p>Member since 2024</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}