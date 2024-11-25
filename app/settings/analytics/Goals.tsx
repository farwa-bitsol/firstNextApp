import React from "react";

const colorMap: Record<string, string> = {
  Direct: "#1565D8",
  Organic: "#5F9CF3",
  Social: "#F572B9",
  Referral: "#96B3FF",
};

const data = [
  { label: "Direct", value: 3186 },
  { label: "Organic", value: 3846 },
  { label: "Social", value: 1058 },
  { label: "Referral", value: 17 },
];

const totalValue = data.reduce((sum, item) => sum + item.value, 0);

const Goals = () => {
  return (
    <div className="w-full md:w-72 h-fit m-4 p-6 rounded-2xl">
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-sm">{item.label}</p>
              <p className="text-sm">{item.value}</p>
            </div>
            <div className="w-full h-2 bg-white rounded-full mt-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${(item.value / totalValue) * 100}%`,
                  backgroundColor: colorMap[item.label],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
