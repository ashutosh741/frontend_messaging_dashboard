export const dashboardLink = `https://spicejet.com`;
export const companyName = `SPICE JET`;
export const lgHyphenName = `Spice-Jet`;
export const smHyphenName = `spice-jet`;
// joining letter

export const pdfCompanyName = `Spice Jet`;

export const API = "http://localhost:8080/api/v1";

const IST_OFFSET = 5.5 * 60 * 60 * 1000;
const istDate = new Date(Date.now() + IST_OFFSET);
export const todayUTC = istDate.toISOString().split("T")[0];


export const tempUser = {
  IsActive: "true",
  RoleName: "superadmin",
  LastName: "Mishra",
  FirstName: "Ashutosh",
  Email: "aashutoshmishra296@gmail.com",
  accessToken: "mfldknlkklkbgnklfnbnklfnlfnbgk",
  CreatedDate: "26-06-2024",
};

// Users.js
export const UserData = () => {
  const userString = localStorage.getItem("user");
  let user = null;

  if (userString) {
    try {
      user = JSON.parse(userString);
      if (user && typeof user === "object") {
        delete user.password;
        return user;
      } else {
        clearAndRedirect();
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      clearAndRedirect();
    }
  } else {
    clearAndRedirect();
  }

  function clearAndRedirect() {
    localStorage.clear();
    window.location.href = "/";
  }

  return null; // Return null if user data is not valid
};
