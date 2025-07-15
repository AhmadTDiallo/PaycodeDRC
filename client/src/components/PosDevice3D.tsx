interface PosDevice3DProps {
  className?: string;
}

export default function PosDevice3D({ className = '' }: PosDevice3DProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative transform perspective-1000 rotate-x-5">
        {/* POS Device Main Body */}
        <div className="w-80 h-[500px] bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-3xl shadow-2xl border-2 border-gray-400 relative overflow-hidden">
          
          {/* Top Brand Section */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 h-12 flex items-center justify-center">
            <h3 className="text-white font-bold text-lg tracking-wide">PAYCODE DRC</h3>
          </div>

          {/* Main Screen */}
          <div className="mx-4 mt-4 mb-4">
            <div className="w-full h-32 bg-black rounded-lg border-4 border-gray-600 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent"></div>
              <div className="absolute inset-1 bg-gradient-to-b from-gray-900 to-black rounded-md"></div>
              
              {/* Screen Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="text-green-400 text-xs mb-1">● SYSTÈME PRÊT</div>
                <div className="text-white text-sm font-bold mb-1">Terminal de Paiement</div>
                <div className="text-blue-400 text-xs">Insérez carte ou empreinte</div>
                
                {/* Status indicators */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Keypad Section */}
          <div className="mx-4 mb-4">
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-600">
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((key, index) => (
                  <button 
                    key={index}
                    className="w-14 h-12 bg-gradient-to-b from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 rounded-lg text-gray-800 text-sm font-bold border border-gray-500 shadow-md transition-all duration-200 active:scale-95"
                    style={{
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {key}
                  </button>
                ))}
              </div>
              
              {/* Function Buttons */}
              <div className="grid grid-cols-4 gap-2">
                <button className="col-span-2 bg-gradient-to-b from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95">
                  ✓ VALIDER
                </button>
                <button className="bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95">
                  ✗ ANNULER
                </button>
                <button className="bg-gradient-to-b from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95">
                  ← RETOUR
                </button>
              </div>
            </div>
          </div>

          {/* Card Reader and Biometric Section */}
          <div className="mx-4 mb-4">
            <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
              
              {/* Card Slot */}
              <div className="mb-4">
                <div className="text-gray-300 text-xs mb-2 font-semibold">LECTEUR DE CARTE</div>
                <div className="w-full h-4 bg-black rounded-md border-2 border-gray-800 relative shadow-inner">
                  <div className="absolute left-2 top-0.5 text-[8px] text-gray-500">INSÉRER ICI</div>
                  <div className="absolute right-2 top-0.5 w-1 h-2 bg-red-500 rounded-full opacity-50"></div>
                </div>
              </div>

              {/* Biometric Fingerprint Scanner */}
              <div className="flex flex-col items-center">
                <div className="text-gray-300 text-xs mb-2 font-semibold">LECTEUR BIOMÉTRIQUE</div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-full border-4 border-blue-600 flex items-center justify-center relative overflow-hidden shadow-2xl">
                    
                    {/* Fingerprint Scanner Glass Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/20 to-transparent rounded-full"></div>
                    
                    {/* Fingerprint Ridges */}
                    <div className="absolute inset-3 rounded-full border border-blue-400 opacity-60"></div>
                    <div className="absolute inset-4 rounded-full border border-blue-400 opacity-45"></div>
                    <div className="absolute inset-5 rounded-full border border-blue-400 opacity-30"></div>
                    <div className="absolute inset-6 rounded-full border border-blue-400 opacity-15"></div>
                    
                    {/* Scanner Lines */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-0.5 bg-blue-400 opacity-60 animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rotate-90">
                      <div className="w-12 h-0.5 bg-blue-400 opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                    
                    {/* Center Active Area */}
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg"></div>
                    
                    {/* Scanning Animation */}
                    <div className="absolute inset-0 border-2 border-blue-300 rounded-full animate-ping opacity-75"></div>
                  </div>
                  
                  {/* Fingerprint Icon */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 text-center">
                    <div className="mb-1">👆</div>
                    <div className="text-[10px] font-semibold">SCANNER</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-gray-800 to-gray-700 h-8 flex items-center justify-between px-4 rounded-b-3xl">
            <div className="text-xs text-gray-300">v2.1.0</div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <div className="text-xs text-gray-300">CONNECTÉ</div>
            </div>
          </div>
        </div>

        {/* Side Ports and Buttons */}
        <div className="absolute -right-3 top-20 w-2 h-12 bg-gray-600 rounded-r-lg border border-gray-500"></div>
        <div className="absolute -right-3 top-36 w-2 h-8 bg-gray-600 rounded-r-lg border border-gray-500"></div>
        <div className="absolute -left-3 top-24 w-2 h-6 bg-gray-600 rounded-l-lg border border-gray-500"></div>
        
        {/* Charging Port */}
        <div className="absolute bottom-10 -right-1 w-1 h-3 bg-black rounded-sm border border-gray-600"></div>
        
        {/* Base Stand */}
        <div className="absolute -bottom-4 left-6 right-6 h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-2xl border-t-2 border-gray-300 shadow-lg"></div>
        
        {/* Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}