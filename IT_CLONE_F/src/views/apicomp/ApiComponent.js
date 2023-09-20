import Axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ApiComponent = ({ apiUrl, onDataFetched }) => {
    //const authToken = useSelector((state) => state.authToken);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                // const token = useSelector((state) => state.authToken); // Retrieve authToken from Redux stor

                const response = await Axios.get(apiUrl, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });

                onDataFetched(response.data);
                console.log('TableData:', response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [apiUrl, onDataFetched]);

    // Render component content
    // ...
};

export default ApiComponent;
