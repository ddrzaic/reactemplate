import { ParkingLot, ParkingLotMinData } from "./types";
export const mapToParkingLot = (data: any): ParkingLot => {
  return {
    id: data._id,
    name: data.name,
    address: data.address,
    availableSpots: data.numOfAvailableSpots,
    hourlyPrice: data.pricePerHour,
    spots: data.parkingSpots.map((spot, index) => ({
      id: spot._id,
      name: `Space ${index + 1}`,
      occupied: spot.occupied,
    })),
    lat: data.latitude,
    lng: data.longitude,
    zone: data.parkingClusterZone,
  };
};

export const mapToParkingLotMinData = (data: any): ParkingLotMinData => {
  return {
    id: data._id,
    name: data.name,
    address: data.address,
    availableSpots: data.numOfAvailableSpots,
    hourlyPrice: data.pricePerHour,
    zone: data.parkingSpotZone,
  };
};

export const calcBasePrice = (zone: string) => {
  switch (zone) {
    case "Zone1":
      return 2;
    case "Zone2":
      return 1.5;
    case "Zone3":
      return 1;
    case "Zone4":
      return 0.5;
    default:
      return 0;
  }
};
