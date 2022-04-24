import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

interface GoogleMapProps {
  location: (data: LocationProps) => void;
}

interface coordinates {
  lat: number;
  lng: number;
}

interface LocationProps {
  address: string;
  coordinates: coordinates;
}

const GoogleMapsComponent: React.FC<GoogleMapProps> = ({ location }) => {
  const locationRef = useRef<HTMLInputElement>(null);
  const [placeSelcted, setPlaceSelected] = useState<string>("");
  const [center, setCenter] = useState<coordinates>({
    lat: 25.65096525299222,
    lng: -100.28974385015961,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_NOT_GOOGLE_API_TOKEN}`,
    libraries: ["places"],
  });

  const changeCoordinates = () => {
    var geocoder = new google.maps.Geocoder();

    if (locationRef.current) setPlaceSelected(locationRef.current?.value);

    geocoder.geocode(
      { address: locationRef.current?.value },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            setCenter({ lat: latitude, lng: longitude });
          }
        }
      }
    );
  };

  useEffect(() => {
    location({
      address: placeSelcted,
      coordinates: center,
    });
  }, [center]);

  return isLoaded ? (
    <GoogleMap mapContainerClassName="google-map" center={center} zoom={15}>
      <StandaloneSearchBox onPlacesChanged={changeCoordinates}>
        <input
          ref={locationRef}
          style={{
            position: "absolute",
            width: "300px",
            height: "50px",
            bottom: 5,
            left: 5,
            paddingLeft: 10,
          }}
          placeholder="search place"
        />
      </StandaloneSearchBox>
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <h4>Loading Map...</h4>
  );
};

export default GoogleMapsComponent;
