const data = ['1', '2', '3', '4', '5', '6', '7', '8'];

let arrDataList = [];

const generateSeed = () => {
  let result = [];

  for (let i = 0; i < 8; i++) {
    const generateRandomNumber = () => {
      let number = Math.floor(Math.random() * 8);
      if (result.includes(number)) {
        generateRandomNumber();
      } else {
        result.push(number);
      }
    };
    generateRandomNumber();
  };

  return result;
};

const shuffleArr = (arr) => {
  let result = [];

  arr.forEach((e) => {
    const generateRandomNumber = () => {
      let number = Math.floor(Math.random() * 8);
      if (!result.includes(number) && arr.includes(number)) {
        result.push(number);
      } else {
        generateRandomNumber();
      }
    };
    generateRandomNumber();
  });

  return result;
};

const generateRandomArr = (seed) => {
  let resultArr = [];

  resultArr.push([seed[0], seed[1], seed[2]]);
  resultArr.push([seed[3], seed[4], seed[5]]);
  resultArr.push([seed[6], seed[7]]);
  resultArr[0] = shuffleArr(resultArr[0]);
  resultArr[1] = shuffleArr(resultArr[1]);
  resultArr[2] = shuffleArr(resultArr[2]);
  resultArr = resultArr.flat(3);
  return resultArr;
};

const generatePetsData = () => {
  const seed = generateSeed();
  let petsData = [];
  let dataInterfacePaginationRandomArr = [];
  for (let i = 0; i < 6; i++) {
    dataInterfacePaginationRandomArr.push(generateRandomArr(seed))
    dataInterfacePaginationRandomArr = dataInterfacePaginationRandomArr.flat(3)
  };
  dataInterfacePaginationRandomArr.forEach(e => {
    petsData.push(data[e]);
  });
  arrDataList = petsData;
  return arrDataList;
};
console.log(generatePetsData())
