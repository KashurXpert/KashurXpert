import React, { useEffect, useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from '../movies';
import { useState } from 'react';
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";

const Player = () => {
    const { setHeader } = useContext(Contextpage);
    const [moviedet, setMoviedet] = useState([]);
    const { id } = useParams();
    const iframeRef = useRef(null); // Reference to the iframe element

    const APIKEY = import.meta.env.VITE_API_KEY;

    const fetchMovie = async () => {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
        );
        const moviedetail = await data.json();
        setMoviedet(moviedetail);
    };

    useEffect(() => {
        fetchMovie();
        setHeader("Player");
    }, []);

    // When the iframe loads, hide the ad container
    const handleIframeLoad = () => {
        if (iframeRef.current) {
            const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
            const adContainer = iframeDocument.getElementById('ad-container');
            if (adContainer) {
                adContainer.style.display = 'none';
            }
        }
    };

    document.title = `Kashur Xpert | ${moviedet.title}`;

    return (
        <>
            <button onClick={() => history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>
            <iframe
                allowFullScreen
                style={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "85vh"
                }}
                src={getSmashystreamUrl(id)}
                ref={iframeRef}
                onLoad={handleIframeLoad} // Call the function when the iframe loads
            ></iframe>
        </>
    );
}

export default Player;
