import { pushSnackbarAction } from "../modules/layout/actions";

export const mouthArr = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export const mouthArr2 = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

export const getDateFormat = (Date) => {
  //DateInputFormat = Tue Nov 01 2022 00:00:00 GMT+0700 (Indochina Time)
  //format from DatePicker mui
  //format to yy-mm-dd

  try {
    if (Date) {
      Date = String(Date);
      let arrSplite = Date.split(" ");
      let year = arrSplite[3];
      let mouth = arrSplite[1];
      let date = arrSplite[2];

      Object.entries(mouthArr).forEach(([name, value]) => {
        if (mouth === name) mouth = value;
      });

      return year + "-" + mouth + "-" + date;
    } else {
      return "1111/1/1";
    }
  } catch (err) {
    return "1111/1/1";
  }
};

export const getDateFormat2 = (Date) => {
  //DateInputFormat = yy-mm-dd'
  //return 11 june 1999
  try {
    if (Date) {
      let arrSplite = Date.split("-");
      let year = arrSplite[0];
      let mouth = arrSplite[1];
      let date = arrSplite[2];

      // let mouthNumber = 0

      Object.entries(mouthArr2).forEach(([name, value]) => {
        if (mouth === value) mouth = name;
      });

      return date + " " + mouth + " " + year;
    } else {
      return "1111/1/1";
    }
  } catch (err) {
    return "1111/1/1";
  }
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();
      if (file && file.type.match("image.*")) {
        fileReader.readAsDataURL(file);
      }

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    } catch (err) {
      console.log(err);
    }
  });
};
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    } catch (err) {
      console.log(err);
    }
  });
};

export const convertBlobtoText = (blob) => {
  
  const bytesString = String.fromCharCode(...blob)
  return bytesString
};

export const getDayOffAmount = (hours) => {
  if (hours < 24) return hours + " Hr(s). ";
  else {
    let day = Math.floor(hours / 24);
    let hour = hours % 24;
    if (hour === 0) return day + " Day(s) ";
    else return day + " Day(s) " + hour + " Hr(s).";
  }
};
export const getLeaveAmount = (hours, min) => {
  if (hours < 24 && min === 0) return hours + " Hr(s). ";
  else if (hours < 24 && min > 0) return hours + "." + min + " Hr(s). ";
  else {
    let day = Math.floor(hours / 24);
    let hour = hours % 24;
    if (hour === 0) return day + " Day(s) ";
    else {
      if (min > 0) {
        return day + " Day(s) " + hour + "." + min + " Hr(s).";
      } else if (min === 0) {
        return day + " Day(s) " + hour + " Hr(s).";
      }
    }
  }
};

export const isPath = (path) => {
  if (window.location.pathname === path) return true;
  else return false;
};
