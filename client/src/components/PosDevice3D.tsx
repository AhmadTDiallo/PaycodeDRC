interface PosDevice3DProps {
  className?: string;
}

export default function PosDevice3D({ className = '' }: PosDevice3DProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative">
        {/* POS Device Body */}
        <div className="w-72 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 p-6 flex flex-col">
          
          {/* Screen */}
          <div className="w-full h-40 bg-black rounded-lg mb-4 border-2 border-gray-600 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
            <h2 className="text-white text-xl font-bold mb-2 z-10">PAYCODE DRC</h2>
            <p className="text-green-400 text-sm z-10">Prêt pour paiement</p>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse z-10"></div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((key, index) => (
              <button 
                key={index}
                className="w-12 h-10 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm font-semibold border border-gray-600 transition-colors"
              >
                {key}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md text-sm font-semibold transition-colors">
              ✓ OK
            </button>
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm font-semibold transition-colors">
              ✗ Cancel
            </button>
          </div>

          {/* Card Slot */}
          <div className="w-full h-3 bg-black rounded-sm mb-4 border border-gray-600 relative">
            <div className="absolute left-2 top-0.5 text-[8px] text-gray-400">CARTE</div>
          </div>

          {/* Biometric Fingerprint Reader */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full border-2 border-blue-600 flex items-center justify-center relative overflow-hidden shadow-inner">
              {/* Fingerprint pattern */}
              <div className="absolute inset-2 rounded-full border border-blue-400 opacity-60"></div>
              <div className="absolute inset-3 rounded-full border border-blue-400 opacity-40"></div>
              <div className="absolute inset-4 rounded-full border border-blue-400 opacity-20"></div>
              
              {/* Center dot */}
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              
              {/* Label */}
              <div className="absolute -bottom-6 text-[10px] text-gray-400 text-center w-full">
                BIOMETRIQUE
              </div>
            </div>
          </div>
        </div>

        {/* Side Elements */}
        <div className="absolute -right-2 top-20 w-1 h-8 bg-gray-700 rounded-r-md"></div>
        <div className="absolute -right-2 top-32 w-1 h-6 bg-gray-700 rounded-r-md"></div>
        
        {/* Base Stand */}
        <div className="absolute -bottom-2 left-4 right-4 h-4 bg-gray-800 rounded-b-xl border-t border-gray-700"></div>
      </div>
    </div>
  );
}