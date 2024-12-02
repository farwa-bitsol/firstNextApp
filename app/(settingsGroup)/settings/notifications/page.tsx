import NotificationForm from "./NotificationForm";

const page = () => {
  return (
    <div className="flex flex-col justify-start pt-8 md:pt-10 pl-10">
      <p className="text-2xl font-bold">Notifications</p>

      <NotificationForm />
    </div>
  );
};

export default page;
