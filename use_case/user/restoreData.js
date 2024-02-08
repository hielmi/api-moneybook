const restoreData = async (idUser, jsonFile, TransactionModel) => {
  try {
    let jsonData = JSON.parse(jsonFile);

    jsonData = jsonData.map((data) => {
      delete data.idTransaction;
      data.idUser = idUser;
      return data;
    });

    const result = await TransactionModel.bulkCreate(jsonData);

    return result;
  } catch (error) {
    return false;
  }
};

module.exports = restoreData;
