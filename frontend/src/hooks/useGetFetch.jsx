import React, { useState } from 'react'
import { useEffect } from 'react';
import { config } from '../env/config';

const useGetFetch = (url) => {
    const [res, setRes] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        fetch(`${config.webAPI}/${url}`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 403) {
              throw new Error('auth'); // No está autorizado
            } else { return res.json() }
        })
        .then(res => {
            setRes(res);
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => setLoading(false))
    }, [url]);
    return { res, loading, error }
}

export default useGetFetch;