import { number } from "yup";
import { object, array, string } from "yup";

export const createMarkerSchema = () => {
  return object().shape({
    title: string().required("Must have title"),
    subtitle: string().required("Must have subtitle"),
    description: string().required("Must have description"),
    category: string()
      .oneOf(["Food", "History", "Culture", "Parks"])
      .required("Must be valid category"),
    // coordinate: object().shape({
    //   latitude: number().required(),
    //   longitude: number().required(),
    // }),
  });
};
