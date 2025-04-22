export function convertToObjArray(inputObj) {
  return Object.keys(inputObj)
    .filter((key) => {
      const value = inputObj[key];
      return (
        key !== "user_id" &&
        (typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean")
      );
    })
    .map((key) => {
      let value = inputObj[key];

      // Convert boolean to string
      if (typeof value === "boolean") {
        value = value.toString();
      }

      // Strictly check if it's an ISO date format (YYYY-MM-DDTHH:mm:ss.sssZ)
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+/;

      if (typeof value === "string" && isoDateRegex.test(value) && !isNaN(Date.parse(value))) {
        const date = new Date(value);
        value = date.toLocaleString(); // Convert to readable date-time format
      }

      return {
        title: key.replace(/_/g, " "),
        val: value,
      };
    });
}


 export function convertKeysToKebabCase(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
      value
    ])
  );
}