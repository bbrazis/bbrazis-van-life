import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos() {
    const { currentVan } = useOutletContext()
    console.log(currentVan)
    return (
        <img src={currentVan.imageUrl} className="host-van-detail-image" alt={`a picutre of ${currentVan.name}`} />
    )
}