export const ShowDirection = ({ direction }) => {
  const emoji = () => {
    switch (direction) {
      case "R":
        return "➡️";
      case "L":
        return "⬅️";
      case "U":
        return "⬆️";
      case "D":
        return "⬇️";
      default:
        break;
    }
  };

  return <>{emoji()}</>;
};
