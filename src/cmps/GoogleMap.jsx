import React from "react"
import GoogleMapReact from "google-map-react"
const Marker = () => <div className="marker"></div>

export default function GoogleMap({ lat, lng }) {
  const defaultProps = {
    center: {
      lat: 29.561147,
      lng: 29.561147,
    },
    zoom: 11,
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "200px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDiH7H-QcLxWqRGFi6mVSGtp4rPRF2EASM" }}
        defaultCenter={{ lat, lng }}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={lat} lng={lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  )
}
