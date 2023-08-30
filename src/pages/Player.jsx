import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from '../movies';
import { useState } from 'react';
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";

const Player = () => {
    const { setHeader } = useContext(Contextpage);
    const [moviedet, setMoviedet] = useState([]);
    const { id } = useParams();

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

    document.title = `Kashur Xpert | ${moviedet.title}`;

    return (
        <>
            <button onClick={()=>history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>
            <iframe allowFullScreen style={{ display: 'flex', alignItems: "center", justifyContent: "center", width: "100%", height: "80vh" }} src={getSmashystreamUrl(id)}></iframe>
            
            {/* Adsterra Ad */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '90px' }}>
                <script type="text/javascript">
                    {`
                    atOptions = {
                        'key' : 'bc4ac3ec961601badff2c9afa5b469fd',
                        'format' : 'iframe',
                        'height' : 90,
                        'width' : 728,
                        'params' : {}
                    };
                    `}
                </script>
                <script type="text/javascript" src={`http${window.location.protocol === 'https:' ? 's' : ''}://www.profitablecreativeformat.com/bc4ac3ec961601badff2c9afa5b469fd/invoke.js`}></script>
            </div>
        </>
    );
}

export default Player;
