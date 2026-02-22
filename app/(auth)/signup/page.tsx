"use client";

import React from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import Link from 'next/link';

const SignupPage = () => {
  return (
    <div className="w-full max-w-[400px] flex flex-col items-center py-12">
      <div className="w-full flex items-center justify-between mb-8 px-2 md:px-0">
        <Link href="/login" className="hover:opacity-70">
          <FaChevronLeft className="size-5" />
        </Link>
        <div className="flex items-center gap-1 opacity-80">
          <svg aria-label="Meta" color="white" fill="white" height="12" role="img" viewBox="0 0 448 512" width="14">
            <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM266.4 361.6c-11.8 0-21.6-4-29.3-11.8-7.7-7.8-11.6-17.6-11.6-29.4s3.9-21.6 11.6-29.4c7.7-7.8 17.5-11.8 29.3-11.8s21.6 4 29.3 11.8c7.7 7.8 11.6 17.6 11.6 29.4s-3.9 21.6-11.6 29.4c-7.7 7.8-17.5 11.8-29.3 11.8zm-119.2 0c-11.8 0-21.6-4-29.3-11.8-7.7-7.8-11.6-17.6-11.6-29.4s3.9-21.6 11.6-29.4c7.7-7.8 17.5-11.8 29.3-11.8 11.8 0 21.6 4 29.3 11.8 7.7 7.8 11.6 17.6 11.6 29.4s-3.9 21.6-11.6 29.4c-7.7 7.8-17.5 11.8-29.3 11.8zm219.6-140.4c-11.8 0-21.6-4-29.3-11.8-7.7-7.8-11.6-17.6-11.6-29.4s3.9-21.6 11.6-29.4c7.7-7.8 17.5-11.8 29.3-11.8s21.6 4 29.3 11.8c7.7 7.8 11.6 17.6 11.6 29.4s-3.9 21.6-11.6 29.4c-7.7 7.8-17.5 11.8-29.3 11.8zm-119.2 0c-11.8 0-21.6-4-29.3-11.8-7.7-7.8-11.6-17.6-11.6-29.4s3.9-21.6 11.6-29.4c7.7-7.8 17.5-11.8 29.3-11.8 11.8 0 21.6 4 29.3 11.8 7.7 7.8 11.6 17.6 11.6 29.4s-3.9 21.6-11.6 29.4c-7.7 7.8-17.5 11.8-29.3 11.8zm-119.2 0c-11.8 0-21.6-4-29.3-11.8-7.7-7.8-11.6-17.6-11.6-29.4s3.9-21.6 11.6-29.4c7.7-7.8 17.5-11.8 29.3-11.8 11.8 0 21.6 4 29.3 11.8 7.7 7.8 11.6 17.6 11.6 29.4s-3.9 21.6-11.6 29.4c-7.7 7.8-17.5 11.8-29.3 11.8z" />
          </svg>
          <span className="text-[10px] font-bold tracking-wider uppercase">Meta</span>
        </div>
        <div className="w-5" />
      </div>
      <div className="w-full flex flex-col items-start px-2 md:px-0">
        <h1 className="text-2xl font-bold mb-2">Get started on Instagram</h1>
        <p className="text-[#a8a8a8] text-sm mb-8">Sign up to see photos and videos from your friends.</p>
        <form className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold">Mobile number or email</label>
            <input
              type="text"
              className="w-full bg-[#1c1c1c] border border-[#363636] rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold">Password</label>
            <input
              type="password"
              className="w-full bg-[#1c1c1c] border border-[#363636] rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold">Date of birth</label>
            <div className="grid grid-cols-3 gap-2">
              <select className="bg-[#1c1c1c] border border-[#363636] rounded-lg px-4 py-3 text-sm outline-none">
                <option>Day</option>
                {Array.from({ length: 31 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}
              </select>
              <select className="bg-[#1c1c1c] border border-[#363636] rounded-lg px-4 py-3 text-sm outline-none">
                <option>Month</option>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <option key={m}>{m}</option>)}
              </select>
              <select className="bg-[#1c1c1c] border border-[#363636] rounded-lg px-4 py-3 text-sm outline-none">
                <option>Year</option>
                {Array.from({ length: 100 }, (_, i) => <option key={i}>{2026 - i}</option>)}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold">Name</label>
            <input
              type="text"
              className="w-full bg-[#1c1c1c] border border-[#363636] rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold">Username</label>
            <input
              type="text"
              className="w-full bg-[#1c1c1c] border border-[#363636] rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-500"
            />
          </div>
          <button className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-lg py-2.5 text-sm">
            Submit
          </button>
        </form>
        <Link href="/login" className="w-full border border-[#363636] hover:bg-white/5 rounded-lg py-2.5 mt-4 text-sm font-semibold text-center">
          I already have an account
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;