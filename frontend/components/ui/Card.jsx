import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  title, 
  actions,
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden ${className}`}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {actions && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;