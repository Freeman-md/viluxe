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
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  return formattedDate

}
