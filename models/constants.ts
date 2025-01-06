export const steps = [
  {
    id: "Step 1",
    stepName: "Personal Info.",
    name: "Register Individual Account!",
    description:
      "For the purpose of industry regulation, your details are required.",
    fields: ["fullName", "email", "password"],
  },
  {
    id: "Step 2",
    name: "Complete Your Profile!",
    stepName: "Residency Info.",
    description:
      "For the purpose of industry regulation, your details are required.",
    fields: ["phone", "address", "country"],
  },
  {
    id: "Step 3",
    name: "Complete Your Profile!",
    stepName: "Bank Verification",
    description:
      "For the purpose of industry regulation, your details are required.",
    fields: ["verificationNumber"],
  },
];

export const InitialFormValues = { fullName: "", email: "" };

export const InitialSecurityFormValues = { currentPassword: "", newPassword: "" };

export const InitialGeneralFormValues = {
  firstName: "", lastName: "", location: "", profession: "", bio: "", onlinePresence: [{ id: "123", url: "" }, { id: "345", url: "" }], generalProfile: {

    name: "",
    data: "",
    contentType: "",

  }
};


export const InitialNotificationFormValues = { weeklyNewsletter: false, accountSummary: false, websiteNotifications: [] };

export const Routes = {
  userForm: "/user",
  users: "/user/users",
  dashboard: "/dashboard",
  login: "/user/signin",
  settings: "/settings",
  signupForm: '/user/form'
}

export const websiteNotificationOptions = [
  { label: "New follower", value: "newfollower" },
  { label: "Post like", value: "postLike" },
  { label: "Someone you followed posted", value: "followedPosted" },
  { label: "Post added to collection", value: "postAddedToCollection" },
  { label: "Post downloaded", value: "postDownloaded" },
];