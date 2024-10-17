const useConvertToTime = (date: number) => {
  const convertedDate = new Date(date)
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
  return convertedDate;
};

export default useConvertToTime;
