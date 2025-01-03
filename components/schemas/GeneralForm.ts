import * as yup from "yup";

export const generalFormSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  location: yup.string().required("Location is required"),
  profession: yup.string().required("Profession is required"),
  bio: yup.string().required("Bio is required"),
  generalProfile: yup.object({
    name: yup.string(),
    data: yup.string(),
    contentType: yup.string(),
  }),
  onlinePresence: yup
    .array()
    .of(
      yup.object({
        id: yup.string(),
        url: yup.string().url("Invalid URL format").required("URL is required"),
      })
    )
    .default([]),
});
