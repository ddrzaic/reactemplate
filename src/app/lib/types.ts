export type ParkingLot = {
  id: string;
  name: string;
  address: string;
  availableSpots: number;
  hourlyPrice: number;
  spots: {
    id: string;
    name: string;
    occupied: boolean;
  }[];
  lat: number;
  lng: number;
  zone: string;
};

export type ParkingLotMinData = {
  id: string;
  name: string;
  address: string;
  availableSpots: number;
  hourlyPrice: number;
  zone?: string;
};
