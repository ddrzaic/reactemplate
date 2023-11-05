"use client";

import {
  Container,
  Dropdown,
  Input,
  LocationPicker,
  Logo,
  PricingSection,
} from "@/ui/components";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import { PriceSectionDTO } from "@/ui/components/PricingSection/PricingSection";
import { ParkingLot } from "@/app/lib/types";
import { mapToParkingLot } from "@/app/lib/helpers";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";

const StyledInput = styled(Input)`
  width: 40%;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`;

export default function EditParking() {
  const { push } = useRouter();
  const { values, errors, submitForm, setFieldValue } = useFormik({
    initialValues: {
      location: { lng: 0, lat: 0 },
      selectedZone: {
        label: "Zone 1",
        value: "Zone1",
      },
      name: "",
      address: "",
      numberOfParkingSpots: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      address: yup.string().required(),
      numberOfParkingSpots: yup.number().required(),
      selectedZone: yup.object().required(),
      location: yup.object().required(),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const payload = {
        address: values.address,
        name: values.name,
        latitude: values.location.lat.toFixed(4),
        longitude: values.location.lng.toFixed(4),
        parkingClusterZone: values.selectedZone.value,
        numberOfParkingSpots: Number(values.numberOfParkingSpots),
      };

      try {
        const { data } = await axios.post(
          `${process.env.BACKEND_URL}/parking-clusters`,
          payload,
          {
            headers: {
              "ngrok-skip-browser-warning": "any",
            },
          }
        );

        push("/dashboard");
      } catch (e) {
        console.log(e);
      }
    },
  });

  // read parking from the URL
  const { id: parkingId } = useParams();

  useEffect(() => {
    const fetchParking = async () => {
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/parking-clusters/${parkingId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      const parkingLot = data.map(mapToParkingLot)[0];

      setFieldValue("name", parkingLot.name);
      setFieldValue("address", parkingLot.address);
      setFieldValue("numberOfParkingSpots", parkingLot.spots.length);
      setFieldValue("selectedZone", {
        label: parkingLot.zone,
        value: parkingLot.zone,
      });

      setFieldValue("location", {
        lng: parkingLot.lng,
        lat: parkingLot.lat,
      });
    };
    fetchParking();
  }, [parkingId]);

  console.log(values);

  const handleSubmit = (priceSectionDTO: PriceSectionDTO) => {
    console.log(priceSectionDTO);
    push("/dashboard");
  };

  return (
    <main>
      <Container>
        <h1>General</h1>
        <StyledInput
          label="Name"
          value={values.name}
          onChange={(value) => setFieldValue("name", value)}
          error={errors.name}
        />

        <StyledInput
          label="Address"
          value={values.address}
          onChange={(value) => setFieldValue("address", value)}
          error={errors.address}
        />

        <StyledInput
          label="Number of parking spots"
          value={values.numberOfParkingSpots}
          onChange={(value) => setFieldValue("numberOfParkingSpots", value)}
          error={errors.numberOfParkingSpots}
        />
        <Dropdown
          label="Zone"
          options={[
            { label: "Zone 1", value: "Zone1" },
            { label: "Zone 2", value: "Zone2" },
            { label: "Zone 3", value: "Zone3" },
            { label: "Zone 4", value: "Zone4" },
          ]}
          selectedOption={values.selectedZone}
          onChange={(value) => setFieldValue("selectedZone", value)}
        />

        <LocationPicker
          onPinChange={(lng, lat) => setFieldValue("location", { lng, lat })}
          isEditable
          lngLat={{
            lng: values.location.lng ?? 17.785,
            lat: values.location.lat ?? 43.343,
          }}
        />

        <PricingSection onSubmit={handleSubmit} />
        <Logo />
      </Container>
    </main>
  );
}
