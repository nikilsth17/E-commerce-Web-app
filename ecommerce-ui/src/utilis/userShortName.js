export const getUserShortName = () => {
    let firstName = localStorage.getItem("firstName");
    let lastName = localStorage.getItem("lastName");
  
    firstName = firstName?.trim() || "Nikil ";
    lastName = lastName?.trim() || "Shrestha";
  
    const shortName = `${firstName[0] || ""}${lastName[0] || ""}`;
  
    return shortName.toUpperCase();
  };