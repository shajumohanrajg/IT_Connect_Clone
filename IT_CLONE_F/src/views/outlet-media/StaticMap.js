import React, { Component } from 'react';

class StaticMap extends Component {
    render() {
        const { latitude, longitude, error } = this.props;

        if (error) {
            return <p>{error}</p>;
        }

        const mapUrl = `https://www.openstreetmap.org/export/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&markers=${latitude},${longitude}`;

        return (
            <div>
                <h1>Your Current Location</h1>
                <img src={mapUrl} alt="Static Map" />
            </div>
        );
    }
}

export default StaticMap;
