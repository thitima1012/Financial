import React, { useState } from "react";
import Swal from "sweetalert2";
import { useFinancialRecord } from "../../contexts/financial.context"; 
import { useUser } from "@clerk/clerk-react";

const Add = () => {
  const { addFinancial } = useFinancialRecord();
  const { user } = useUser(); 

  // State variables
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const categories = ["Food", "Fruit", "Snack", "Drink","Supplies"];
  const paymentMethods = ["Cash", "Credit Card", "Bank Transfer", "PayPal"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Error!", "User not logged in.", "error");
      return;
    }

    const financial = {
      userId: user.id, 
      description,
      date,
      amount,
      category,
      paymentMethod,
    };

    try {
      await addFinancial(financial);
      Swal.fire("Success!", "Financial record added successfully!", "success");
      setDescription("");
      setDate("");
      setAmount("");
      setCategory("");
      setPaymentMethod("");
    } catch (error) {
      console.error("Error adding financial record:", error);
      Swal.fire(
        "Error!",
        "There was an error adding the financial record.",
        "error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-96 bg-base-100 text-center shadow-xl m-2 p-4 rounded-lg border-2 border-[#D6A4E7]">
      <span className="text-[#D6A4E7] font-bold text-3xl"> Add New Financial </span> 
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold"> Description : </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered w-full border-[#D6A4E7] focus:ring-2 focus:ring-[#D6A4E7]"
              required
            />
          </div>
          <div>
            <label className="block font-bold"> Date : </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full border-[#D6A4E7] focus:ring-2 focus:ring-[#D6A4E7]"
              required
            />
          </div>
          <div>
            <label className="block font-bold"> Amount : </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full border-[#D6A4E7] focus:ring-2 focus:ring-[#D6A4E7]"
              required
            />
          </div>
          <div>
            <label className="block font-bold"> Category : </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full border-[#D6A4E7] focus:ring-2 focus:ring-[#D6A4E7]"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-bold"> Payment Method : </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="select select-bordered w-full border-[#D6A4E7] focus:ring-2 focus:ring-[#D6A4E7]"
              required
            >
              <option value="" disabled>
                Select a payment method
              </option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-[#D6A4E7] text-black border-none hover:bg-[#D6A4E7]"
            >
              Add Financial Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
