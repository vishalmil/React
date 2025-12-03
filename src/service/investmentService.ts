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

export const updateInvestment = async (id: number, updatedInvestment: Investment): Promise<Investment> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedInvestment),
    });

    if (!response.ok) {
      throw new Error(`Failed to update investment: ${response.status}`);
    }
    return await response.json();

  } catch (error) {
    console.error("Update Investment API error: ", error);
    throw error;
  }
};
