import React from "react";
import * as S from "./PricingSection.styled";
import { Button, Checkbox } from "..";
import { useFormik } from "formik";
import { CancelButton } from "./PricingSection.styled";
import { pricingSectionValidationSchema } from "./PricingSection.validation";
import { useRouter } from "next/navigation";
import { calcBasePrice } from "@/app/lib/helpers";

export type PriceSectionDTO = {
  isDynamicPricing: boolean;
  basePrice: number;
  treshold: number;
  priceStep: number;
  percentageStep: number;
};

const mapToDTO = (values: any): PriceSectionDTO => {
  return {
    isDynamicPricing: values.isDynamicPricing,
    basePrice: Number(values.basePrice),
    treshold: Number(values.treshold),
    priceStep: Number(values.priceStep),
    percentageStep: Number(values.percentageStep),
  };
};

type PricingSectionProps = {
  initialValues?: PriceSectionDTO;
  onSubmit: (values: PriceSectionDTO) => void;
  zone: "Zone1" | "Zone2" | "Zone3" | "Zone4";
};

export const PricingSection = ({
  initialValues,
  onSubmit,
  zone,
}: PricingSectionProps) => {
  const { replace } = useRouter();

  const [isDynamicPricing, setIsDynamicPricing] = React.useState(false);
  const { values, setFieldValue, errors, submitForm } = useFormik({
    initialValues: {
      basePrice: calcBasePrice(zone),
      treshold: undefined,
      priceStep: undefined,
      percentageStep: undefined,
    },
    onSubmit: (values) => {
      onSubmit(mapToDTO({ ...values, isDynamicPricing }));
    },
    validationSchema: isDynamicPricing
      ? pricingSectionValidationSchema
      : undefined,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const handleCancel = () => {
    replace("/dashboard");
  };

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <S.Container>
      <S.Title>Pricing</S.Title>
      <Checkbox
        isChecked={isDynamicPricing}
        onChange={() => setIsDynamicPricing(!isDynamicPricing)}
        label={"Use occupancy based pricing"}
      />
      {isDynamicPricing && (
        <>
          <S.StyledInput
            label="Base Price"
            suffix={<S.InputSuffix>€</S.InputSuffix>}
            value={values.basePrice}
            onChange={(value) => setFieldValue("basePrice", value)}
            error={errors.basePrice}
            isReadOnly
          />
          <S.StyledInput
            label="Price increase threshold"
            suffix={<S.InputSuffix>%</S.InputSuffix>}
            value={values.treshold}
            onChange={(value) => setFieldValue("treshold", value)}
            error={errors.treshold}
          />
          <S.StyledInput
            label="Increase price by"
            suffix={<S.InputSuffix>€</S.InputSuffix>}
            value={values.priceStep}
            onChange={(value) => setFieldValue("priceStep", value)}
            error={errors.priceStep}
          />
          <S.StyledInput
            label="After each occupancy percentage"
            suffix={<S.InputSuffix>%</S.InputSuffix>}
            value={values.percentageStep}
            onChange={(value) => setFieldValue("percentageStep", value)}
            error={errors.percentageStep}
          />
        </>
      )}

      <S.ButtonsWrapper>
        <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
        <S.SubmitButton onClick={handleSubmit}>Save</S.SubmitButton>
      </S.ButtonsWrapper>
    </S.Container>
  );
};
