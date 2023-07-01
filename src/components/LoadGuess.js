import { useState, useEffect } from "react";

export const LoadGuess = ({locationLoad, setPostalLoad, addressFromLatLong, postalLoad}) => {

    useEffect(() => {
        addressFromLatLong(locationLoad.lat, locationLoad.lng).then(results => setPostalLoad(results))
    }, [])
    return (
        <div>
            <p>Looks like you are near: {postalLoad}</p>
        </div>
    )
}