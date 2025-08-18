"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function TributeForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    message: "",
    imageUrl: "",
    date: "",
    relationship: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit tribute");

      toast.success("Tribute submitted successfully ");

      setForm({ name: "", message: "", imageUrl: "", date: "", relationship: "" });
      onSubmit(); // refresh list
    } catch (err) {
      toast.error("Error submitting tribute ");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg mx-auto space-y-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        type="text"
        name="relationship"
        placeholder="Relationship to the Fon"
        value={form.relationship}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <textarea
        name="message"
        placeholder="Write your tribute..."
        value={form.message}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-xl w-full hover:bg-blue-700 transition"
      >
        Submit Tribute
      </button>
    </motion.form>
  );
}
