import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SuccessAlert = ({ message }) => {
    useEffect(() => {
        if (message) {
            Swal.fire({
                title: 'Success',
                text: message,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    }, [message]);

    return null; // Since this is an effect-based component, it doesn't render anything to the DOM
};

export default SuccessAlert;
