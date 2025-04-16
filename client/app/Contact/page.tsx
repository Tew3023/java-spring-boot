"use client";

import axios from "axios";
import { useState } from "react";

export default function Contact() {
  const [mess, setMess] = useState({
    customerName: "",  // ✅ เปลี่ยนจาก name เป็น customerName
    customerEmail: "", // ✅ เปลี่ยนจาก email เป็น customerEmail
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMess({
      ...mess,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit Form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ถ้า input ว่าง ไม่ให้ submit
    if (!mess.customerName || !mess.customerEmail || !mess.message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/message", mess);
      alert("Message sent successfully!");
      console.log(res.data);
      setMess({ customerName: "", customerEmail: "", message: "" }); // รีเซ็ตฟอร์ม
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto py-20 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <p className="text-lg text-gray-700 text-center mb-12">
        Have questions, feedback, or just want to say hi? We're here to help!
        Feel free to get in touch with us through the form below or using the contact details provided.
      </p>

      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="customerName" // ✅ ต้องตรงกับ useState และ Entity
              value={mess.customerName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Email</label>
            <input
              type="email"
              name="customerEmail" // ✅ ต้องตรงกับ useState และ Entity
              value={mess.customerEmail}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Message</label>
            <textarea
              name="message"
              value={mess.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
              rows={5}
              placeholder="Write your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
