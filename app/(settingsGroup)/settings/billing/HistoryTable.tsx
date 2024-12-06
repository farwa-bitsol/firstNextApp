import CustomButton from "./CustomButton";

const history = [
  {
    date: "2024-11-20",
    type: "Purchase",
  },
  {
    date: "2024-11-21",
    type: "Pro Portfolio",
  },
  {
    date: "2024-11-20",
    type: "Purchase",
  },
  {
    date: "2024-11-21",
    type: "Pro Portfolio",
  },
];

const HistoryTable = () => {
  return (
    <div className="flex flex-col space-y-2 py-8 ml-8">
      <div className="flex justify-between font-semibold py-2 pl-2">
        <div className="w-1/3 text-left text-[#62618F]">Date</div>
        <div className="w-1/3 text-left text-[#62618F]">Type</div>
        <div className="w-1/3 text-left text-[#62618F]">Receipt</div>
      </div>

      {history.map((item, index) => (
        <div
          className="flex justify-between items-center p-2  hover:shadow-[0px_8px_19px_0px_#DFDFFD99]"
          key={`${item.date}-${index}`}
        >
          <div className="w-1/3 text-left">2024-11-20</div>
          <div className="w-1/3 text-left">Purchase</div>
          <div className="w-1/3 text-left">
            <CustomButton />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryTable;
