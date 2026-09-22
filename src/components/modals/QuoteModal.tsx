import React, { useState } from 'react';
import { X, CheckCircle, FileText, Building2, Phone, Mail, MapPin, Send } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, defaultProject = '' }) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lahore');
  const [projectType, setProjectType] = useState('Luxury Residential Villa');
  const [areaSqFt, setAreaSqFt] = useState('3500');
  const [materials, setMaterials] = useState<string[]>(['Italian Marble Slabs']);
  const [notes, setNotes] = useState(defaultProject ? `Inquiry regarding: ${defaultProject}` : '');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleMaterial = (mat: string) => {
    setMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 bg-[#7E6348]/10 text-[#7E6348] border border-[#7E6348]/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-stone-900 tracking-tight">
              Quotation Request Received
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed font-normal">
              Thank you, {clientName || 'valued client'}. A senior specification director from Saleem Traders has been assigned to your BOQ and will follow up at {phone || 'your number'} within 2 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-[1.5px] w-4 bg-[#7E6348]" />
                <span className="tracking-[0.25em] text-xs font-semibold text-[#7E6348] uppercase font-sans">
                  Specification & BOQ Desk
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-[26px] font-normal text-stone-900 tracking-tight">
                Request an Architectural Project Quotation
              </h2>
              <p className="text-xs text-stone-600 font-normal mt-1">
                Direct trade pricing, customized slab layouts, and material logistics for architects and developers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Full Name / Practice Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ar. Tariq Mehmood"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#7E6348] focus:ring-1 focus:ring-[#7E6348] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Direct Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#7E6348] focus:ring-1 focus:ring-[#7E6348] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Corporate Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="tariq@designstudio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#7E6348] focus:ring-1 focus:ring-[#7E6348] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Project Destination</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#7E6348] focus:outline-none bg-white"
                >
                  <option>Lahore</option>
                  <option>Islamabad / Rawalpindi</option>
                  <option>Karachi</option>
                  <option>Faisalabad</option>
                  <option>Multan</option>
                  <option>Peshawar</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Architectural Typology</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#7E6348] focus:outline-none bg-white"
                >
                  <option>Luxury Residential Villa</option>
                  <option>Commercial Tower / Corporate HQ</option>
                  <option>Boutique Hotel / Hospitality</option>
                  <option>Multi-Unit Apartments</option>
                  <option>Renovation / Extension</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Estimated Surface Area (Sq. Ft.)</label>
                <input
                  type="number"
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:border-[#7E6348] focus:ring-1 focus:ring-[#7E6348] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5 font-sans">Materials for Specification</label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Italian Marble Slabs',
                  'Porcelain Large Format',
                  'European Sanitaryware',
                  'Grohe / Kohler Fittings',
                  'Custom Vanities',
                  'Natural Travertine',
                ].map((mat) => (
                  <button
                    type="button"
                    key={mat}
                    onClick={() => toggleMaterial(mat)}
                    className={`text-xs px-3 py-1 rounded border transition-all font-normal ${
                      materials.includes(mat)
                        ? 'bg-[#7E6348] text-white border-[#7E6348]'
                        : 'bg-stone-50 border-stone-300 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1 font-sans">Project Specifics or BOQ Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Include specifications, target delivery timeline, or questions..."
                className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-[#7E6348] focus:ring-1 focus:ring-[#7E6348] focus:outline-none font-normal"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#7E6348] hover:bg-[#A38A6B] text-white text-xs font-semibold tracking-[0.16em] uppercase rounded shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Executive BOQ Estimate</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
