import * as yup from "yup";

export const notificationFormSchema = yup.object({
    weeklyNewsletter: yup.boolean(),
    accountSummary: yup.boolean(),
    websiteNotifications: yup.array(),
  });
