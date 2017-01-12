const regExp = /(\d{1,3})(?=(?:\d{3})+(?!\d))/g;
const numberToMoney = number => ''.replace.call(number, regExp, '$1,');

export default numberToMoney;