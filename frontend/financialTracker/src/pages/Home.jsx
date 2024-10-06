import React, { useState, useEffect } from "react";
import Search from "./../component/Search";
import FinancialService from "../service/financial.service";
import Table from "../component/Table";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";



function Home() {
  const [financials, setFinancials] = useState([]);
  useEffect(() => {
    const getFinancial = async () =>{
      try {
        const response = await FinancialService.getAllFinancial();
        if(response.status === 200){
          setFinancials(response.data);
        
        }
      } catch (error) {
        Swal.file({
          title:"Get All Restaurant",
          text:error?.response?.data?.message || error.message,
          icon:"error"
        })
      }
    }
    getFinancial()
  }, []);

  return (
    <>
      <div className="container flex flex-row flex-wrap mx-auto items-center justify-center">
        <SignedOut>
          <h1 className="text-6xl font-bold mb-5 mt-5"> Welcome </h1>
        </SignedOut>
        <SignedIn>
          <Navigate to="/dashboard"/>
        </SignedIn>
      </div>
    </>
  );
}
 export default Home;
