import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        debugger;

        let error_result = false;

        const fetchResource = async () => {
            try {
                let res = await fetch(url)
                let data = await res.json()

                debugger;
                if (!error_result) {
                    setData(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);

                if (!error_result) {
                    setLoading(false)
                    setError(error)
                }
            }
        }
        fetchResource()
        return () => {
            error_result = true;
        }
    }, [url])


    return { data, loading, error }
}


export default useFetch
