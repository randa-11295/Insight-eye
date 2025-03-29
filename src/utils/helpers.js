export  function convertToObjArray(inputObj) {
     return Object.keys(inputObj)
       .filter((key) => key !== "user_id" && (typeof inputObj[key] === "string" || inputObj[key] instanceof String)) // Ensure value is a string
       .map((key) => {
         let value = inputObj[key];
   
         // Strictly check if it's an ISO date format (YYYY-MM-DDTHH:mm:ss.sssZ)
         const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+/;
         
         if (isoDateRegex.test(value) && !isNaN(Date.parse(value))) {
           const date = new Date(value);
           value = date.toLocaleString(); // Convert to readable date-time format
         }
   
         return {
           title: key.replace(/_/g, " "),
           val: value,
         };
       });
   }