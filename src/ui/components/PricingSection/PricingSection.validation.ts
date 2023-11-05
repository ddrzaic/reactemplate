// validation for price section component

import * as yup from "yup";

// initialValues: {
//   basePrice: undefined,
//   treshold: undefined,
//   priceStep: undefined,
//   percentageStep: undefined,
// },
export const pricingSectionValidationSchema = yup.object().shape({
  basePrice: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Number required"),
  treshold: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Number required"),
  priceStep: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Number required"),
  percentageStep: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Number required"),
});
