import { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./Map.module.scss";
import List from "./List";
import { Button } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

declare global {
  interface Window {
    kakao: any;
  }
}

function Map() {
  const [destination, setDestination] = useState("");
  const mapRef = useRef<HTMLElement | null>(null);
  const geocoder = new window.kakao.maps.services.Geocoder();

  const initMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(34.7603737, 127.6622221),
      level: 13,
    };

    const map = new window.kakao.maps.Map(container as HTMLElement, options);
    (mapRef as MutableRefObject<any>).current = map;
  };

  useEffect(() => {
    window.kakao.maps.load(() => initMap());
  }, [mapRef]);

  // 대한민국 내 랜덤 좌표 생성 함수
  const getRandomKoreaLatLng = () => {
    const lat = 33 + Math.random() * (38 - 33); // 대한민국 위도 범위 (33 ~ 38)
    const lng = 126 + Math.random() * (130 - 126); // 대한민국 경도 범위 (126 ~ 130)
    return new window.kakao.maps.LatLng(lat, lng);
  };

  // 좌표를 주소로 변환하는 함수
  const getAddressFromCoords = (coords: kakao.maps.LatLng, marker: any) => {
    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      (result: any, status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name; // 변환된 한국 주소
          setDestination(address);
        } else {
          // 변환 실패 시 마커를 지도에서 제거하고 다시 시도
          marker.setMap(null); // 마커를 지도에서 제거
          handleAddRandomMarker(); // 다시 랜덤 좌표에 마커 추가
        }
      },
    );
  };

  // 버튼 클릭 시 랜덤 좌표에 마커 추가 및 주소 출력
  const handleAddRandomMarker = async () => {
    if (!mapRef.current) return;

    let lastRandomLatLng = null;
    let lastMarker = null;

    for (let i = 0; i < 20; i++) {
      const randomLatLng = getRandomKoreaLatLng();
      const marker = new window.kakao.maps.Marker({
        position: randomLatLng,
      });

      if (marker) {
        marker.setMap(null);
      }

      marker.setMap(mapRef.current); // 마커를 지도에 추가

      // Save the last randomLatLng and marker
      lastRandomLatLng = randomLatLng;
      lastMarker = marker;

      // 0.1초마다 실행
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 마지막 마커만 남겨둠
      if (i < 19) {
        marker.setMap(null);
      }
    }
    if (lastRandomLatLng && lastMarker) {
      getAddressFromCoords(lastRandomLatLng, lastMarker);
    }
  };

  return (
    <div id="map" className={styles.mapWrapper}>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
      <List destination={destination} />
      <Button
        variant="contained"
        className={styles.floatButton}
        onClick={handleAddRandomMarker}
      >
        <RocketLaunchIcon />
        &nbsp;push
      </Button>
    </div>
  );
}

export default Map;
