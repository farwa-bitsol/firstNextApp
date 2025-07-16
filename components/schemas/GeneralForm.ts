import * as yup from "yup";

export const generalFormSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string(),
  location: yup.string(),
  profession: yup.string(),
  bio: yup.string(),
  onlinePresence: yup
    .array()
    .of(
      yup.object({
        id: yup.string(),
        url: yup.string().url("Invalid URL format"),
      })
    )
    .default([]),
});
