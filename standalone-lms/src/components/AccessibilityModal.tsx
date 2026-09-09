import React from 'react';
import { Accessibility, X, Type, Eye, Volume2, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fontSize: "normal" | "large" | "xlarge";
  onChangeFontSize: (size: "normal" | "large" | "xlarge") => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const AccessibilityModal: React.FC<Props> = ({
  isOpen,
  onClose,
  fontSize,
  onChangeFontSize,
  highContrast,
  onToggleHighContrast
}) => {
  if (!isOpen) return null;

  return (
    <div className="nptel-modal-backdrop" onClick={onClose}>
      <div 
        className="nptel-accessibility-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-between p-4 border-b border-slate-200">
          <div className="flex-align-center gap-2">
            <Accessibility className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Accessibility & Visual Comfort</h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5 text-xs">
          {/* Font Size Adjuster */}
          <div>
            <label className="font-bold text-slate-800 block mb-2 flex-align-center gap-1.5">
              <Type className="w-4 h-4 text-slate-500" />
              <span>Text Size (Font Scaling)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onChangeFontSize("normal")}
                className={`p-2.5 rounded-lg border text-center font-bold transition-all ${
                  fontSize === "normal"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                A (100%)
                <span className="block text-xxs font-normal text-slate-500 mt-0.5">Standard</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeFontSize("large")}
                className={`p-2.5 rounded-lg border text-center font-bold transition-all ${
                  fontSize === "large"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                A+ (115%)
                <span className="block text-xxs font-normal text-slate-500 mt-0.5">Medium</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeFontSize("xlarge")}
                className={`p-2.5 rounded-lg border text-center font-bold transition-all ${
                  fontSize === "xlarge"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                A++ (130%)
                <span className="block text-xxs font-normal text-slate-500 mt-0.5">Extra Large</span>
              </button>
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex-between p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-600" />
              <div>
                <div className="font-bold text-slate-800">High Contrast Mode</div>
                <div className="text-xxs text-slate-500">Enhanced text sharpness for visual clarity</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleHighContrast}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                highContrast ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  highContrast ? 'translate-x-5' : 'translate-x-0.5'
                }`} 
              />
            </button>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
          <button type="button" onClick={onClose} className="btn btn-primary btn-sm">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
