function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function dateToString(string) {
  let date = new Date(string);
  let year = date.getFullYear().toString();
  let month = date.getMonth();
  let day = date.getDate();
  
  if (month < 10) {
    month = '0' + month.toString();
  }
  if (day < 10) {
    day = '0' + day.toString();
  }
  return day + '-' + month + '-' + year; 
}

export {
  addDays,
  dateToString,
};

