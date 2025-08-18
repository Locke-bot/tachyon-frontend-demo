import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';

import axios from 'utils/axios';

const Confirmation = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { uuid, token } = useParams();
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        axios.get(`/api/account/activate/${uuid}/${token}/`)
        .then(() => {
            navigate('/activate/success', { replace: true });
            setSuccess(null)
        }).catch((err) => {
            navigate('/activate/error', { replace: true });
            setSuccess(false)
        })        
    }, [])

    return (
        success===null ? <></> : success===false ? <>Error</> : <></>
    );
};

export default Confirmation;