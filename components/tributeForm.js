"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { toast } from "react-toastify";

export default function TributeForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    message: "",
    date: new Date().toISOString().split("T")[0],
    relationship: "",
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // ✅ Track success


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      if (errors.image) setErrors({ ...errors, image: "" });
    } else {
      setErrors({ ...errors, image: "Please select a valid image file." });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.relationship.trim()) newErrors.relationship = "Relationship is required.";
    if (!form.date) newErrors.date = "Date is required.";
    if (!form.message.trim() || form.message.trim().length < 10) 
      newErrors.message = "Message must be at least 10 characters.";
    if (!file) newErrors.image = "Please upload an image.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      let fileId = null;

      // ✅ Upload file via server API route
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        fileId = data.fileId; // store returned fileId
      }

      // Send tribute data to backend
      const tributeRes = await fetch("/api/tributes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageId: fileId,
        }),
      });

      const tributeData = await tributeRes.json();
      if (tributeData.error) throw new Error(tributeData.error);

      // Reset form
      setForm({
        name: "",
        message: "",
        date: new Date().toISOString().split("T")[0],
        relationship: "",
      });
      setFile(null);
      setPreview(null);
      
      // ✅ Show success message + toast
      setSuccessMessage(`Thank you ${form.name}, your tribute has been submitted successfully! `);
      toast.success("Your tribute has been submitted. Thank you! ");
      onSubmit();
      onClose();
    } catch (err) {
      console.error("Error submitting tribute:", err);
      setErrors({ submit: "Something went wrong. Please try again." });
      toast.error("Failed to submit tribute. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Write a Tribute</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
              &times;
            </button>
          </div>

           {successMessage && (
            <div className="p-4 bg-green-100 text-green-700 text-center font-medium">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition ${errors.name ? 'input-error' : ''}`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Relationship to the Fon *
                </label>
                <select
                  name="relationship"
                  value={form.relationship}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition ${errors.relationship ? 'select-error' : ''}`}
                >
                  <option value="">Select relationship</option>
                  <option value="Family Member">Family Member</option>
                  <option value="Community Member">Community Member</option>
                  <option value="Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Admirer">Admirer</option>
                  <option value="Other">Other</option>
                </select>
                {errors.relationship && <p className="mt-1 text-sm text-error">{errors.relationship}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition ${errors.date ? 'input-error' : ''}`}
                />
                {errors.date && <p className="mt-1 text-sm text-error">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Your Photo *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition"
                />
                {errors.image && <p className="mt-1 text-sm text-error">{errors.image}</p>}
              </div>
            </div>

            {/* Right Column - Message and Preview */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Tribute Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className={`textarea border border-gray-300 textarea-bordered bg-white w-full ${errors.message ? 'textarea-error' : ''}`}
                  placeholder="Share your heartfelt message and memories of our Fon..."
                />
                {errors.message && <p className="mt-1 text-sm text-error">{errors.message}</p>}
                <p className="mt-1 text-xs text-gray-500">Minimum 10 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                {preview ? (
                  <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                    <Image src={preview} alt="Preview" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400">
                    No image selected
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="md:col-span-2 flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button type="button" onClick={onClose} className="btn btn-ghost" disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="p-3 bg-primary text-white" disabled={loading}>
                {loading ? <>Submitting...</> : "Submit Tribute"}
              </button>
            </div>

            {errors.submit && (
              <div className="md:col-span-2 alert alert-error mt-4">
                {errors.submit}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
