import React from "react";

const contributors = [
  { id: 1, name: "Alice", avatar: "/images/profile.png" },
  { id: 2, name: "Bob", avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "Charlie", avatar: "/images/profile.png" },
  { id: 4, name: "Dave", avatar: "https://via.placeholder.com/40" },
  { id: 5, name: "Eve", avatar: "https://via.placeholder.com/40" },
];

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    top: 20,
  },
  circle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "2px solid #5F9CF3",
    position: "absolute",
  },
  remainingCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    fontWeight: "bold",
  },
};

const ContributorSection = ({
  contributors,
  maxVisible = 3,
}: {
  contributors: { id: number; name: string; avatar: string }[];
  maxVisible?: number;
}) => {
  const visibleContributors = contributors.slice(0, maxVisible);
  const remainingCount = contributors.length - maxVisible;

  return (
    <div style={styles.container}>
      {visibleContributors.map((contributor, index) => (
        <div
          key={contributor.id}
          style={{
            ...styles.circle,
            backgroundImage: `url(${contributor.avatar})`,
            left: `${index * 28}px`,
            zIndex: 10,
          }}
        ></div>
      ))}
      {remainingCount > 0 && (
        <div
          style={{
            ...styles.circle,
            ...styles.remainingCircle,
            left: `${visibleContributors.length * 28}px`,
            zIndex: 10,
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

const Contributors = () => {
  return (
    <div className="flex flex-col px-5">
      <p className="font-bold text-lg pb-2">Contributers</p>
      <ContributorSection contributors={contributors} />
    </div>
  );
};

export default Contributors;
