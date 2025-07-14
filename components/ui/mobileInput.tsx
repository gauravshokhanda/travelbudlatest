'use client';

import React from 'react';

interface MobileInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    placeholder?: string;
    error?: string;
    maxLength?: number;
}

export default function MobileInput({
    value,
    onChange,
    onBlur,
    placeholder = 'Enter mobile number',
    error,
    maxLength = 10,
}: MobileInputProps) {
    return (
        <div className="mb-6 px-1 w-full">
            <label className="block text-sm font-medium text-black mb-2">
                Mobile Number
            </label>

            <div
                className={`flex items-center rounded-xl px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'
                    } focus-within:ring-2 focus-within:ring-primary transition`}
            >
                <span className="text-sm font-medium text-black pr-3">+91</span>
                <div className="h-5 w-px bg-gray-300" />
                <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={maxLength}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className="ml-3 w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-500"
                />
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
