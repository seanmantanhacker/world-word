function check(input){

   if (input == null) {
      console.error("null or undefined")
      return 1
   } else {
      if (typeof (input) == "object") {
         if (input.length == 0 || Object.keys(input).length === 0) {
            console.error("Empty Object")
            return 1
         }
      } else if (typeof (input) == "string") { //object
         if (!input.trim()) {
            console.error("Empty String")
            return 1
         }
      }
   }
   return 0;
};