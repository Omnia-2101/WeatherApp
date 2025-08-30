import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md text-center shadow">
      ⚠️ {message}
    </div>
  );
}

export default ErrorMessage;
