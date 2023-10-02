export const formatFirebaseData = (firebaseData: Record<string, object>) => {
  const formattedData: object[] = [];

  // Iterate through the keys of the parent object
  for (const key in firebaseData) {
    if (firebaseData.hasOwnProperty(key)) {
      const childObject = firebaseData[key] as Record<string, any>;

      // Set the key as the 'id' property in the child object
      childObject.id = key;

      // Push the child object into the formatted array
      formattedData.push(childObject);
    }
  }

  return formattedData.reverse();
};

export const formatDateFromTimestamp = (timestamp: Date) => {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Format the date as a string in a desired format (e.g., YYYY-MM-DD)
  const formattedDateTime = `${date.getFullYear()}-${
    String(date.getMonth() + 1).padStart(2, '0')
  }-${
    String(date.getDate()).padStart(2, '0')
  } ${
    String(date.getHours()).padStart(2, '0')
  }:${
    String(date.getMinutes()).padStart(2, '0')
  }:${
    String(date.getSeconds()).padStart(2, '0')
  }`;

  return formattedDateTime

}

export const formatMoney = (amount: number, decimalPlaces = 2, currencySymbol = '$') => {
  if (isNaN(amount) || amount === null) {
    return 'Invalid amount';
  }

  // Round to the specified number of decimal places
  const roundedAmount = Math.round(amount * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

  // Format the amount with commas for thousands and the currency symbol
  const formattedAmount = roundedAmount.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });

  return `${currencySymbol}${formattedAmount}`;
}
