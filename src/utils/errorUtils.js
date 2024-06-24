// errorUtils.js
export function handleError(error) {
    if (error.response && error.response.status === 409) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      // Optionally, handle other types of errors here
      console.error(error);  // Log the error for debugging
    }
  }
  