import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url, dep = []) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    `https://api.thecatapi.com/v1/${url}`,
                    {
                        headers: {
                            "x-api-key":
                                "live_JrcEZoNLwhxRfnZdDN1EuvLi6yGbnmhIFZifDGBgmi8d5MLJsJUCz1pimrONos4n",
                        },
                    }
                );
                setData(response.data);
            } catch (e) {
                console.log(e.message);
                setError('Something went wrong, please try again later');
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, dep);
    return { loading, error, data }
}
