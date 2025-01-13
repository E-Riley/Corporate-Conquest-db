exports.formatData = (dataArr) => {
  const formattedData = dataArr.map((data) => {
    return Object.values(data);
  });
  return formattedData;
};
