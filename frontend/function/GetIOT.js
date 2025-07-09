import { useState } from "react";
import json from "../env.json"

const GetIOT = () => {
    const [responseInfo, setResponseInfo] = useState([]);
    const [isLoadingIot, setisLoading] = useState(false);
    const baseURI = `http://${json.IOTipAddress}`

    const IotRequest = (IotRequestParam) => {
        const fetchURL = `${baseURI}`;
        setisLoading(false);
        fetch(fetchURL, IotRequestParam)
            .then((response) => {
                return response.json();
            })
            .then((respInfo) => {
                console.log(respInfo);
                setResponseInfo(respInfo);
                setisLoading(true);
            })
            .catch((err) => {
                setisLoading(false);
            });
    };

    return { responseInfo, isLoadingIot, IotRequest };
};




export default GetIOT;
