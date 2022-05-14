import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

interface GoogleMapProps {
  initialLocation?: coordinates;
  searchBarHidden?: boolean;
  location?: (data: LocationProps) => void;
}

interface coordinates {
  lat: number;
  lng: number;
}

interface LocationProps {
  address: string;
  coordinates: coordinates;
}

const GoogleMapsComponent: React.FC<GoogleMapProps> = ({
  location,
  initialLocation,
  searchBarHidden,
}) => {
  const locationRef = useRef<HTMLInputElement>(null);
  const [placeSelcted, setPlaceSelected] = useState<string>("");
  const [center, setCenter] = useState<coordinates>(
    initialLocation
      ? initialLocation
      : {
          lat: 25.65096525299222,
          lng: -100.28974385015961,
        }
  );

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

  const handleMapClick = (events: any) => {
    if (!searchBarHidden) {
      const lat = events.latLng.lat();
      const lng = events.latLng.lng();
      var geocoder = new google.maps.Geocoder();

      geocoder
        .geocode({ location: { lat, lng } })
        .then((response) => {
          if (response.results[0]) {
            setCenter({ lat, lng });
            setPlaceSelected(response.results[0].formatted_address);
          } else {
            console.log("No results found");
          }
        })
        .catch((e) => console.error("Geocoder failed due to: " + e));
    }
  };

  useEffect(() => {
    if (location)
      location({
        address: placeSelcted,
        coordinates: center,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);

  useEffect(() => {
    initialLocation && setCenter(initialLocation);
  }, [initialLocation]);

  return isLoaded ? (
    <GoogleMap
      onClick={(e) => handleMapClick(e)}
      mapContainerClassName="google-map"
      center={center}
      zoom={15}
    >
      {!searchBarHidden && (
        <StandaloneSearchBox onPlacesChanged={changeCoordinates}>
          <input
            value={placeSelcted}
            onChange={(e) => {
              setPlaceSelected(e.target.value);
            }}
            ref={locationRef}
            style={{
              position: "absolute",
              width: "300px",
              height: "50px",
              bottom: 5,
              left: 5,
              paddingLeft: 10,
              background: "#ffa336",
              border: "2px solid #5eb2b6",
            }}
            placeholder="search place"
          />
        </StandaloneSearchBox>
      )}
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <h4>Loading Map...</h4>
  );
};

export default GoogleMapsComponent;
