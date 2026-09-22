import React, { useState } from 'react';
import { X, Send, CheckCircle, Package, Truck, Layers } from 'lucide-react';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  sampleName?: string;
}

export const SampleModal: React.FC<SampleModalProps> = ({
  isOpen,
  onClose,
  sampleName = 'Verona Calacotta Gold & Natural Stone Set',
}) => {
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [selectedBox, setSelectedBox] = useState('Architect Presentation Swatch Box (4 Finish Tiles)');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-[#886d4b]/10 text-[#886d4b] border border-[#886d4b]/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-xl font-normal text-stone-900 tracking-[-0.01em]">
              Sample Box Queued for Dispatch
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Tracking code generated: <strong className="font-mono text-stone-900">PK-SLM-9482</strong>. Your architectural swatch package will be dispatched via insured express freight to {city}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 text-[#886d4b] text-[10px] font-medium tracking-[0.26em] uppercase font-sans">
                <Package className="w-3.5 h-3.5" />
                <span>Express Material Sample Desk</span>
              </div>
              <h2 className="font-editorial text-2xl font-normal text-stone-900 tracking-[-0.015em] mt-1">
                Order Architectural Swatches
              </h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Experience tactile stone grain, honed textures, and marble veining in studio.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Target Surface / Product</label>
              <input
                type="text"
                readOnly
                value={sampleName}
                className="w-full text-xs px-3 py-2 bg-stone-100 border border-stone-200 rounded text-stone-800 font-medium font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Sample Kit Format</label>
              <select
                value={selectedBox}
                onChange={(e) => setSelectedBox(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#886d4b] focus:outline-none bg-white"
              >
                <option>Architect Presentation Swatch Box (4 Finish Tiles)</option>
                <option>Full Hand Cut Stone Swatch (150 x 150 mm)</option>
                <option>Complete Commercial Binder Set</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Attention To (Name/Firm)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ar. Zara Ali"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#886d4b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="0321-7654321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#886d4b] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Courier Delivery Address</label>
                <input
                  type="text"
                  required
                  placeholder="Studio or Site address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#886d4b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#886d4b] focus:outline-none bg-white"
                >
                  <option>Lahore</option>
                  <option>Islamabad</option>
                  <option>Karachi</option>
                  <option>Faisalabad</option>
                  <option>Multan</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#886d4b] hover:bg-[#73593b] text-white text-xs font-medium tracking-wider uppercase rounded shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-[#d5c1a4]" />
              <span>Confirm & Dispatch Sample Box</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
