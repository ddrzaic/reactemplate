"use client";

import {
  Button,
  Container,
  Input,
  Logo,
  ParkingListItem,
} from "@/ui/components";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ParkingLotMinData as ParkingLot } from "@/app/lib/types";
import { mapToParkingLotMinData as mapToParkingLot } from "../lib/helpers";
const AddNewButton = styled(Button)`
  position: absolute;
  top: 13%;
  right: 20%;
  height: 50px;
  border-radius: 17px;
`;

const SearchInput = styled(Input)`
  width: 100%;
  align-self: center;
`;

export default function Dashboard() {
  const [search, setSearch] = React.useState("");
  const [clusters, setClusters] = React.useState<ParkingLot[]>(
    [] as ParkingLot[]
  );

  const [filteredClusters, setFilteredClusters] = React.useState<ParkingLot[]>(
    [] as ParkingLot[]
  );

  const timeoutRef = React.useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setFilteredClusters(
        clusters.filter(
          (cluster) =>
            cluster.name.toLowerCase().includes(search.toLowerCase()) ||
            cluster.address.toLowerCase().includes(search.toLowerCase()) ||
            cluster.zone?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, clusters]);

  const { push } = useRouter();

  useEffect(() => {
    const fetchClusters = async () => {
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/parking-clusters`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );
      setClusters(data.map(mapToParkingLot));
    };
    fetchClusters();
  }, []);

  console.log(process.env.BACKEND_URL);

  return (
    <main>
      <Container>
        <Logo />
        <AddNewButton onClick={() => push("/dashboard/add-new")}>
          Add New
        </AddNewButton>
        <SearchInput
          placeholder="Search..."
          value={search}
          onChange={(value) => setSearch(value)}
        />
        {filteredClusters?.map((cluster: ParkingLot) => (
          <ParkingListItem
            key={cluster.name}
            name={cluster.name}
            address={cluster.address}
            availableSpots={cluster.availableSpots}
            hourlyPrice={cluster.hourlyPrice}
            onClick={() => push(`/dashboard/${cluster.id}`)}
          />
        ))}
      </Container>
    </main>
  );
}
