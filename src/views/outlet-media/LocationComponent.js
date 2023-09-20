import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import StaticMap from './StaticMap';
import Typography from '@mui/material/Typography';

class LocationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchLocation();
    }

    fetchLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    this.setState({ error: 'Error fetching location.' });
                    console.error('Error fetching location:', error);
                }
            );
        } else {
            this.setState({ error: 'Geolocation is not supported by your browser.' });
            console.error('Geolocation is not supported by your browser.');
        }
    }

    render() {
        const { latitude, longitude, error } = this.state;

        const position = [latitude, longitude];

        return (
            <div>
                <Typography variant="h6">Your Current Location</Typography>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        <p>Latitude: {latitude}</p>
                        <p>Longitude: {longitude}</p>
                        {/* <StaticMap latitude={latitude} longitude={longitude} error={error} /> */}

                        {/* {latitude && longitude && (
                            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        )} */}
                    </div>
                )}
            </div>
        );
    }
}

export default LocationComponent;
