interface PosDevice3DProps {
  className?: string;
}

export default function PosDevice3D({ className = '' }: PosDevice3DProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className="w-96 h-64 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg shadow-lg flex flex-col justify-center items-center text-white"
      >
        <h3 className="text-2xl font-bold mb-2">PAYCODE DRC</h3>
        <p className="text-lg tracking-wider font-mono">4532 1234 5678 9012</p>
      </div>
    </div>
  );
}