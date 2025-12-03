import React, { useState } from "react";
import { addInvestment, getInvestments } from "../service/investmentService";

const AddInvestment: React.FC = () => {
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        type: "",
        amount: 0,
        purchaseDate: "",
        currentValue: 0,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.amount || !formData.purchaseDate) {
            alert("Please fill all required fields");
            return;
        }

        try {
            const investments = await getInvestments();
            const maxId = investments.length > 0 ? investments.length + 1 : 0;
            const newUser = { ...investments, id: maxId };
            await addInvestment({ ...formData });

            alert("Investment added successfully");
            setFormData({
                id: 0,
                name: "",
                type: "",
                amount: 0,
                purchaseDate: "",
                currentValue: 0,
            });
        } catch (err) {
            alert("Failed to add investment");
            console.error(err);
        }
    };

    return (
        <div style={{ width: "400px", marginLeft: "20px" }}>
            <h2>Add New Investment</h2>

            <input
                className="input"
                type="text"
                name="name"
                placeholder="Investment Name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                className="input"
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
            />

            {/* Calendar */}
            <input
                className="input"
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
            />

            <select
                className="input"
                name="type"
                value={formData.type}
                onChange={handleChange}
            >
                <option value="">Select Type</option>
                <option value="stock">Stock</option>
                <option value="crypto">Crypto</option>
                <option value="mutual fund">Mutual Fund</option>
            </select>

            <input
                className="input"
                name="currentValue"
                placeholder="Current Value"
                value={formData.currentValue}
                onChange={handleChange}
            />

            <button className="button" onClick={handleSubmit}>
                Add Investment
            </button>
        </div>
    );
};

export default AddInvestment;
