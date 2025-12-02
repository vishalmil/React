import { Investment } from "../type/investment";

const API_URL = "http://localhost:3000/investments";

export async function getInvestments(): Promise<Investment[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch investments");
    }

    const data: Investment[] = await response.json();
    return data;
    console.log(data);

  } catch (error) {
    console.error("Investment API error:", error);
    throw error;
  }
}
