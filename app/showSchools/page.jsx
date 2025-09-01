"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/schools")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data); 
        setSchools(data);
      })
      .catch((err) => console.error("Error fetching schools:", err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {schools.map((school, index) => (
        <motion.div
          key={school.id}
          className="bg-white border rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
        >
          {school.image && (
            <img
              src={school.image} // Use Base64 directly
              alt={school.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-lg font-bold text-blue-700">{school.name}</h2>
            <p className="text-gray-600 mt-1">{school.address}</p>
            <p className="text-gray-500 text-sm">{school.city}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
