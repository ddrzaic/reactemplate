"use client";

import {
  Container,
  Dropdown,
  Input,
  LocationPicker,
  Logo,
  PricingSection,
} from "@/ui/components";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { PriceSectionDTO } from "@/ui/components/PricingSection/PricingSection";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useLogin } from "@/ui/hooks/useLogin";

const StyledInput = styled(Input)`
  width: 40%;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`;

export default function AddParking() {
  const { push } = useRouter();
  const { token } = useLogin();

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
    onSubmit: () => {},
  });

  const handleSubmit = async (priceSectionDTO: PriceSectionDTO) => {
    submitForm();

    if (
      errors.address ||
      errors.name ||
      errors.numberOfParkingSpots ||
      errors.selectedZone ||
      errors.location ||
      !values.location.lat ||
      !values.location.lng
    ) {
      alert("Please fill all the fields");
      return;
    }

    const payload = {
      address: values.address,
      name: values.name,
      latitude: values.location.lat.toFixed(4),
      longitude: values.location.lng.toFixed(4),
      parkingClusterZone: values.selectedZone.value,
      numberOfParkingSpots: Number(values.numberOfParkingSpots),
      dynamicPricing: priceSectionDTO.isDynamicPricing,
      priceIncreaseThreshold: priceSectionDTO.treshold,
      priceIncreaseAmount: priceSectionDTO.priceStep,
      priceIncreaseInterval: priceSectionDTO.percentageStep,
      pricePerHour: priceSectionDTO.basePrice,
    };

    try {
      const { data } = await axios.post(
        `${process.env.BACKEND_URL}/parking-clusters`,
        payload,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      push("/dashboard");
    } catch (e) {
      console.log(e);
    }
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
        />

        <PricingSection
          onSubmit={handleSubmit}
          zone={values.selectedZone.value as any}
        />
        <Logo />
      </Container>
    </main>
  );
}
