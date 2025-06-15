"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [tables, setTables] = useState<any>([]);
  const baseURL = "http://54.66.195.178:3000";

  const handleCreateTable = async () => {
    try {
      const response = await axios.post(`${baseURL}/table`, {
        tableName: `Table ${tables.length + 1}`,
      });

      console.log("Created:", response.data);
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };
  const fetchAllTables = async () => {
    try {
      const response = await axios.get(`${baseURL}/table`);
      console.log("Data:", response.data.data);
      setTables(response.data.data);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchAllTables();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button
        onClick={handleCreateTable}
        className="bg-amber-200 rounded-md px-3 py-2 cursor-pointer text-amber-800"
      >
        Create table
      </button>
      {tables.map((el: any) => (
        <p key={el.id}>{el.tableName}</p>
      ))}
    </div>
  );
}
