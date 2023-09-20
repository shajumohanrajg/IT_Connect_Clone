import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import './swal.css';

const SwalAlert = ({ title, text, icon }) => {
    useEffect(() => {
        Swal.fire({
            title,
            text,
            icon,
            customClass: {
                container: 'my-swal-container',
                title: 'my-swal-title',
                content: 'my-swal-content'
            }
        });
    }, [title, text, icon]);

    return null; // Render nothing in the component itself
};

export default SwalAlert;
