import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
              ${index < currentStep 
                ? 'bg-green-500 text-white' 
                : index === currentStep 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-600 text-gray-400'
              }
            `}>
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <span className={`
              text-xs mt-2 text-center px-1
              ${index <= currentStep ? 'text-white' : 'text-gray-400'}
            `}>
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className={`
                h-0.5 w-full mt-4 transition-all duration-300
                ${index < currentStep ? 'bg-green-500' : 'bg-gray-600'}
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
