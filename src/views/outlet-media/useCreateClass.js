import { useState } from 'react';
import Axios from 'axios';

const useCreateClass = (apiUrl) => {
    const [responseMessage, setResponseMessage] = useState('');
    const [statusCode, setStatusCode] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = (name, status) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');

        Axios.post(
            apiUrl,
            {
                name: name,
                status: status,
                created_by: userID,
                modified_by: userID
            },
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        ).then(
            (response) => {
                setResponseMessage('SuccesssFully Class Created');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                console.log(response);
            },
            (error) => {
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                        setStatusCode(statusCode);
                        setShowDialog(true);
                        setOpen(false);
                    } else {
                        alert('An unexpected error occurred. Please try again later.');
                    }
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
                console.log(error);
            }
        );
    };

    return { responseMessage, statusCode, showDialog, handleSubmit };
};

export default useCreateClass;
