import React from "react"
import GoogleMapReact from "google-map-react"

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default function GoogleMap() {
  const defaultProps = {
    center: {
      lat: 29.561147,
      lng: 34.952439,
    },
    zoom: 11,
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDiH7H-QcLxWqRGFi6mVSGtp4rPRF2EASM" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <div lat={29.561147} lng={34.952439} text="My Marker">
          my marker
        </div>
      </GoogleMapReact>
    </div>
  )
}
