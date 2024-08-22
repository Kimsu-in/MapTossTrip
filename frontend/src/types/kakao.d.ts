// src/types/kakao.d.ts
declare namespace kakao {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Map {
      constructor(container: HTMLElement, options: object);
    }

    class Marker {
      constructor(options: object);
      setMap(map: kakao.maps.Map | null): void;
    }

    namespace services {
      class Geocoder {
        coord2Address(
          lng: number,
          lat: number,
          callback: (result: any, status: string) => void,
        ): void;
      }

      const Status: {
        OK: string;
      };
    }
  }
}
