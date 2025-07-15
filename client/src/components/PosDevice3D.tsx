interface PosDevice3DProps {
  className?: string;
}

export default function PosDevice3D({ className = '' }: PosDevice3DProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative transform rotate-12">
        {/* Handheld POS Device Body */}
        <div className="w-48 h-80 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 rounded-3xl rounded-t-[4rem] shadow-2xl border-2 border-blue-800 relative overflow-hidden">
          
          {/* Top Handle/Grip Area */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-black via-gray-900 to-black rounded-t-[4rem] border-2 border-gray-700">
            {/* NFC/Contactless Symbol */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-xs">
              <div className="w-4 h-4 border-2 border-white rounded-full opacity-60"></div>
              <div className="absolute top-0 left-0 w-2 h-2 border-2 border-white rounded-full opacity-80"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Fingerprint Scanner (Top Left) */}
          <div className="absolute top-4 left-4 w-12 h-8 bg-gradient-to-b from-black to-gray-800 rounded-lg border border-gray-600 flex items-center justify-center">
            <div className="w-8 h-6 bg-gradient-to-br from-blue-900 to-blue-800 rounded-md border border-blue-600 relative overflow-hidden">
              {/* Fingerprint ridges */}
              <div className="absolute inset-0.5 border border-blue-400 opacity-40 rounded-md"></div>
              <div className="absolute inset-1 border border-blue-400 opacity-30 rounded-md"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
          </div>

          {/* Main Touch Screen */}
          <div className="absolute top-20 left-4 right-4 h-48 bg-black rounded-xl border-2 border-gray-800 shadow-inner">
            <div className="absolute inset-1 bg-gradient-to-b from-gray-900 to-black rounded-lg"></div>
            
            {/* Screen Content - Colorful Tiles */}
            <div className="relative z-10 h-full p-3 grid grid-cols-2 gap-2">
              {/* PAYCODE DRC Header */}
              <div className="col-span-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-2 mb-1 text-center">
                <div className="text-white text-xs font-bold">PAYCODE DRC</div>
              </div>
              
              {/* Function Tiles */}
              <div className="bg-gradient-to-b from-red-500 to-red-600 rounded-lg p-2 text-center">
                <div className="text-white text-xs font-bold">🛒</div>
                <div className="text-white text-[8px]">VENTE</div>
              </div>
              
              <div className="bg-gradient-to-b from-purple-500 to-purple-600 rounded-lg p-2 text-center">
                <div className="text-white text-xs font-bold">💳</div>
                <div className="text-white text-[8px]">CARTE</div>
              </div>
              
              <div className="bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-lg p-2 text-center">
                <div className="text-white text-xs font-bold">📱</div>
                <div className="text-white text-[8px]">MOBILE</div>
              </div>
              
              <div className="bg-gradient-to-b from-green-500 to-green-600 rounded-lg p-2 text-center">
                <div className="text-white text-xs font-bold">⚙️</div>
                <div className="text-white text-[8px]">CONFIG</div>
              </div>
              
              <div className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg p-2 text-center">
                <div className="text-white text-xs font-bold">📊</div>
                <div className="text-white text-[8px]">RAPPORT</div>
              </div>
              
              <div className="bg-gradient-to-b from-orange-500 to-orange-600 rounded-lg p-2 text-center">
                <div className="text-white text-xs font-bold">🔒</div>
                <div className="text-white text-[8px]">SÉCURE</div>
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="absolute bottom-1 left-1 right-1 h-2 bg-gray-800 rounded-full flex items-center justify-between px-2">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <div className="text-[6px] text-gray-400">CONNECTÉ</div>
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Card Slot */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-black rounded-sm border border-gray-700">
            <div className="absolute left-1 top-0 text-[6px] text-gray-500">CARTE</div>
            <div className="absolute right-1 top-0 w-0.5 h-1 bg-red-500 rounded-full opacity-60"></div>
          </div>

          {/* Bottom Grip */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-blue-700 to-blue-800 rounded-b-3xl border-t border-blue-600">
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[8px] text-blue-200">
              PAYCODE v2.1
            </div>
          </div>

          {/* Side Charging Port */}
          <div className="absolute bottom-16 -left-0.5 w-1 h-3 bg-black rounded-l-sm border-l border-gray-600"></div>
          
          {/* Side Buttons */}
          <div className="absolute right-0 top-24 w-1 h-6 bg-gray-700 rounded-r-sm border-r border-gray-600"></div>
          <div className="absolute right-0 top-32 w-1 h-4 bg-gray-700 rounded-r-sm border-r border-gray-600"></div>
          
          {/* LED Status Light */}
          <div className="absolute top-16 right-4 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
          
          {/* Brand Logo Area */}
          <div className="absolute top-6 right-6 w-6 h-6 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
          </div>
        </div>
        
        {/* Device Shadow */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 rounded-3xl rounded-t-[4rem] pointer-events-none"></div>
      </div>
    </div>
  );
}