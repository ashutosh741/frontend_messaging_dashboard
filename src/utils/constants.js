export const dashboardLink = `https://spicejet.com`;
export const companyName = `SPICE JET`;
export const lgHyphenName = `Spice-Jet`;
export const smHyphenName = `spice-jet`;
// joining letter

export const pdfCompanyName = `Spice Jet`;

 export const API = "https://spicejet.com";

const IST_OFFSET = 5.5 * 60 * 60 * 1000;
const istDate = new Date(Date.now() + IST_OFFSET);
export const todayUTC = istDate.toISOString().split("T")[0];
