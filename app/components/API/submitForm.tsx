import { FormValues } from "@/app/utils/schema";
import { SubmitHandler } from "react-hook-form";

export const submitFormData: SubmitHandler<FormValues> = async (data) => {
  // API Adress
  const apiUrl = "/api/submitForm";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Request successful!");
      return response.json(); // Return the parsed JSON response
    } else {
      console.error("Request failed:", response.statusText);
      throw new Error("Request failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred");
  }
};
