import React, { useState } from 'react';
import { IoCopy } from "react-icons/io5";

const PhoneModal = ({ isOpen, onClose }) => {
  const phoneNumber = "7503398182";
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div className="fixed inset-0 backdrop-blur-sm" />
      
      <div 
        className="w-full max-w-sm mx-4 relative z-10 animate-modalSlideIn"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-[#111] rounded-xl overflow-hidden shadow-2xl">
          <div className="px-5 py-4">
            <h2 className="text-white text-lg font-medium mb-3">Contact Us</h2>
            
            <div className="bg-[#1a1a1a] rounded-lg p-3 flex items-center justify-between relative">
              <span className="text-white text-base font-medium select-all">{phoneNumber}</span>
              <div className="flex items-center gap-2">
                {copied && (
                  <span className="text-white/70 text-sm animate-fadeIn">
                    Copied
                  </span>
                )}
                <button 
                  onClick={copyToClipboard}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <IoCopy size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
