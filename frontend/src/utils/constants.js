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

// export const Users = [
//     {
//         UserId : "1",
//         UserName : "Aashu12",
//         Password : "1234",
//         FirstName : "Ashutosh",
//         LastName : "Mishra",
//         CreatedDate : "25-06-2024",
//         isActive : 1,
//         role : "superadmin"
//     },
//     {
//         UserId : "2",
//         UserName : "Aditya12",
//         Password : "1234",
//         FirstName : "Aditya",
//         LastName : "Maalik",
//         CreatedDate : "25-06-2024",
//         isActive : 1,
//         role : "admin"
//     },
//     {
//         UserId : "3",
//         UserName : "Amit12",
//         Password : "1234",
//         FirstName : "Amit",
//         LastName : "Kumar",
//         CreatedDate : "25-06-2024",
//         isActive : 1,
//         role : "superadmin"

//     },
//     {
//         UserId : "4",
//         UserName : "Ankit12",
//         Password : "1234",
//         FirstName : "Ankit",
//         LastName : "Rawat",
//         CreatedDate : "25-06-2024",
//         isActive : 1,
//         role : "admin"

//     },
//     {
//         UserId : "5",
//         UserName : "Akhand12",
//         Password : "1234",
//         FirstName : "Akhand",
//         LastName : "Singh",
//         CreatedDate : "25-06-2024",
//         isActive : 1,
//         role : "admin"

//     },
//     {
//         UserId : "6",
//         UserName : "Sahil12",
//         Password : "1234",
//         FirstName : "Sahil",
//         LastName : "Gupta",
//         CreatedDate : "25-06-2024",
//         isActive : 1,
//         role : "admin"

//     },
//     {
//         UserId : "7",
//         UserName : "Sundar12",
//         Password : "1234",
//         FirstName : "Sundar",
//         LastName : "Deshmukh",
//         CreatedDate : "25-06-2024",
//         isActive : 1,
//         role : "user"

//     },
//     {
//         UserId : "8",
//         UserName : "Paras12",
//         Password : "1234",
//         FirstName : "Paras",
//         LastName : "Rawat",
//         CreatedDate : "25-06-2024",
//         isActive : 1,
//         role : "user"

//     },

// ]

export const tempUser = {
  isActive: "true",
  role: "SUPERADMIN",
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

  if (userString !== null && userString !== undefined) {
    try {
      user = JSON.parse(userString);
      delete user?.password;
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

  return user;
};
