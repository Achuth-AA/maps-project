import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './Search.css'; 

mapboxgl.accessToken = 'pk.eyJ1IjoibmFhdXNlcm5hbWUiLCJhIjoiY2xucXcwY2k4MGw0eDJqbXdoOHI2NGVmdiJ9.IYNH8EDXyXv02EtbOhiOEA'; // Replace with your Mapbox access token

const Search = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [restrooms, setRestrooms] = useState([]);

    useEffect(() => {
        // Initialize the map
        const map = new mapboxgl.Map({
            container: 'map', // Container ID
            style: 'mapbox://styles/mapbox/streets-v11', // Map style
            center: [-98.5795, 39.8283], // Default center (US)
            zoom: 3 // Default zoom
        });

        // Add restrooms as markers to the map
        restrooms.forEach(restroom => {
            new mapboxgl.Marker()
                .setLngLat([restroom.longitude, restroom.latitude])
                .addTo(map);
        });
    }, [restrooms]);

    const findNearbyRestrooms = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation([position.coords.longitude, position.coords.latitude]);

                // Fetch nearby restrooms from your backend
                // Replace with your API endpoint
                fetch(`https://your-api-endpoint/nearby-restrooms?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
                    .then(response => response.json())
                    .then(data => setRestrooms(data));
            }, () => {
                alert('Unable to retrieve your location');
            });
        }
    };

    return (
        <div>
            <button className="find-button" onClick={findNearbyRestrooms}>Find Restrooms Near Me</button>
            <div id="map" style={{ height: '400px' }}></div>
        </div>
    );
};

export default Search;
