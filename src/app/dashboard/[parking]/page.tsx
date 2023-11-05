"use client";

import {
  Button,
  Container,
  GearIcon,
  LocationPicker,
  Logo,
  ParkingSpace,
} from "@/ui/components";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import axios from "axios";
import { ParkingLot } from "@/app/lib/types";
import { mapToParkingLot } from "@/app/lib/helpers";
import { useLogin } from "@/ui/hooks/useLogin";

const SpacesLeft = styled.p<{ hasAvailableSpots }>`
  color: ${({ hasAvailableSpots }) => (hasAvailableSpots ? "#53d160" : "red")};
  font-weight: 500;
  font-size: 1rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  h1 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

const Subtitle = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 1rem;
`;

const AddButton = styled(Button)`
  width: 10rem;
  height: 3rem;
  margin-top: 2rem;
  border-radius: 1rem;
`;

const EditButton = styled.div`
  position: absolute;
  top: 13%;
  right: 20%;
  display: flex;
  padding: 0.5rem;
  background-color: rgb(56, 113, 224);
  border-radius: 0.5rem;
  user-select: none;
  cursor: pointer;
`;

export default function Dashboard() {
  const { push, refresh } = useRouter();
  const { token } = useLogin();
  const [parking, setParking] = React.useState<ParkingLot>({} as ParkingLot);

  // read parking from the URL
  const { parking: parkingId } = useParams();

  useEffect(() => {
    const fetchParking = async () => {
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/parking-clusters/${parkingId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setParking(data.map(mapToParkingLot)[0]);
    };
    fetchParking();
  }, [parkingId]);

  return (
    <main>
      <Container>
        <Logo />
        <EditButton onClick={() => push(`/dashboard/edit/${parkingId}`)}>
          <GearIcon />
        </EditButton>
        <Info>
          <h1>{parking?.name}</h1>
          <p>{parking?.address}</p>
          <SpacesLeft hasAvailableSpots={parking?.availableSpots > 0}>
            {parking?.availableSpots} spaces left
          </SpacesLeft>
        </Info>
        <LocationPicker
          lngLat={{
            lng: parking?.lng ?? 17.785,
            lat: parking?.lat ?? 43.343,
          }}
          price={parking?.hourlyPrice}
        />

        <Subtitle>Parking spaces</Subtitle>
        <Grid>
          {parking?.spots?.map((space) => (
            <ParkingSpace
              key={space.id}
              occupied={space.occupied}
              onDelete={() => {
                try {
                  axios.delete(
                    `${process.env.BACKEND_URL}/parking-spots/${space.id}`,
                    {
                      headers: {
                        "ngrok-skip-browser-warning": "any",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  refresh();
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              {space.name}
            </ParkingSpace>
          ))}
        </Grid>

        <AddButton onClick={() => {}}>Add</AddButton>
      </Container>
    </main>
  );
}
