import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useFinancialRecord } from "../../contexts/financial.context"; 
import { useUser } from "@clerk/clerk-react";
import { useParams, useNavigate } from "react-router-dom";

const categories = ["Food", "Fruit", "Snack", "Drink", "Supplies"];
const paymentMethods = ["Cash", "Credit Card", "Bank Transfer", "PayPal"];

function EditDashboard() {
  const { getRecordById, editFinancial } = useFinancialRecord();
  const { user } = useUser(); 
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [financial, setFinancials] = useState({
    description: "",
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const formatDateForSubmission = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace("T", " "); 
  };

  useEffect(() => {
    getRecordById(id).then((response) => {
      const fetchedData = response;
        console.log(response);
        
        setFinancials({
          ...fetchedData,
          date: formatDateForInput(fetchedData.date),
        });
    });
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancials({ ...financial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Error!", "User not logged in.", "error");
      return;
    }

    try {
      const formattedDate = formatDateForSubmission(financial.date);
      const response = await editFinancial(id, {
        ...financial,
        date: formattedDate,
      });

        Swal.fire({
          icon: "success",
          title: "Financial record updated",
          text: "Updated successfully",
          timer: 1500,
        });
        navigate("/");
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update financial record",
        text: error?.response?.data?.message || error.message,
        timer: 1500,
      });
    }
  };
  return (
    <div className="flex  items-center justify-center h-full mb-5">
      <div className="w-96 bg-base-100 text-center shadow-xl m-2 p-4 rounded-lg border-2 border-[#D6A4E7]">
        <span className="text-[#D6A4E7] font-bold text-3xl"> Edit Record </span>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold items-start"> Description : </label>
            <input
              type="text"
              name="description" 
              value={financial.description}
              onChange={handleChange}
              className="input input-bordered w-full border-[#D6A4E7] focus:ring-2 focus:ring-[#D6A4E7]"
              required
            />
          </div>
          <div>
            <label className="block font-bold"> Date : </label>
            <input
              type="datetime-local"
              name="date" 
              value={financial.date}
              onChange={handleChange}
              className="input input-bordered w-full border-[#D6A4E7] focus:ring-2 focus:ring-[#D6A4E7]"
              required
            />
          </div>
          <div>
            <label className="block font-bold"> Amount : </label>
            <input
              type="number"
              name="amount" 
              onChange={handleChange}
              value={financial.amount}
              className="input input-bordered w-full border-[#D6A4E7] focus:ring-2 focus:ring-[#D6A4E7]"
              required
            />
          </div>
          <div>
            <label className="block font-bold"> Category : </label>
            <select
              name="category" 
              onChange={handleChange}
              value={financial.category}
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
              name="paymentMethod"
              onChange={handleChange}
              value={financial.paymentMethod}
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
              Update Financial Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDashboard;
