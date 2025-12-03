import React, { useEffect, useState } from "react";
import { updateInvestment } from "../service/investmentService";
import { Investment } from "../type/investment";

interface Props {
    selectedInvestment: Investment | null;
    onUpdateSuccess: () => void;
}

const EditInvestment: React.FC<Props> = ({ selectedInvestment, onUpdateSuccess }) => {
    const [formData, setFormData] = useState<Investment>({
        id: "",
        name: "",
        type: "",
        amount: 0,
        purchaseDate: "",
        currentValue: 0,
    });

    // Load selected Investment into form
    useEffect(() => {
        if (selectedInvestment) {
            setFormData(selectedInvestment);
        }
    }, [selectedInvestment]);

    // Handle input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update Investment
    const handleUpdate = async () => {
        try {
            await updateInvestment(formData.id!, formData);
            alert("Investment Updated Successfully ✔");
            onUpdateSuccess();
        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };

    if (!selectedInvestment)
        return <p style={{ marginTop: 20 }}>Select a Investment to edit...</p>;

    return (
        <div
            style={{
                marginTop: 20,
                padding: 20,
                border: "1px solid #aaa",
                borderRadius: 8,
            }}
        >
            <h3>Edit Investment</h3>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            /><br />

            <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Type"
            /><br />

            <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
            /><br />
            <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                placeholder="purchase Date"
            /><br />

            <input
                name="currentValue"
                value={formData.currentValue}
                onChange={handleChange}
                placeholder="Current Value"
            /><br />

            <button
                onClick={handleUpdate}
                style={{ marginTop: 10, padding: "6px 12px" }}
            >
                Save Changes
            </button>
        </div>
    );
};

export default EditInvestment;