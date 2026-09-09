import React from 'react';

export const GovTopBar: React.FC = () => {
  return (
    <div className="gov-apex-strip">
      <div className="gov-tricolor-line" />
      <div className="gov-strip-container">
        <div className="flex-align-center gap-2">
          <img 
            src="/gov-emblem.png" 
            alt="National Emblem" 
            className="gov-strip-emblem" 
          />
          <span className="gov-title-text">
            Government of India &bull; Viksit Bharat @2047
          </span>
        </div>

        <div className="flex-align-center gap-3 text-xs text-muted">
          <span>National Innovation Council</span>
          <span className="gov-lang-tag">ENG / हिन्दी</span>
        </div>
      </div>
    </div>
  );
};
