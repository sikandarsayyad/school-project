"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";


export default function AddSchoolPage() {
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  // 🔒 Check authentication
  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        setAuth(true);
      } else {
        router.push("/login");
      }
    }
    checkAuth();
  }, [router]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image") {
          formData.append("image", data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("School added successfully!");
        reset();
      } else {
        alert("Failed to add school");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  if (!auth) return <p className="text-center">Checking login...</p>;

  return (
    <motion.div
      className="p-3 w-full max-w-lg mx-auto bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-90 mx-auto">
        <input {...register("name", { required: true })} placeholder="School Name" className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300" />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input {...register("address", { required: true })} placeholder="Address" className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300" />
        <input {...register("city", { required: true })} placeholder="City" className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300" />
        <input {...register("state", { required: true })} placeholder="State" className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300" />
        <input type="number" {...register("contact", { required: true })} placeholder="Contact Number" className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300" />
        <input type="email" {...register("email_id", { required: true })} placeholder="Email" className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300" />
        <input type="file" {...register("image", { required: true })} className="border p-2 w-full rounded-md" />

        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md w-full font-bold hover:bg-blue-700 transition cursor-pointer"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Add School
        </motion.button>
      </form>
    </motion.div>
  );
}
