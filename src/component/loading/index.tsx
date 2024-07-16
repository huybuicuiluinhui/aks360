import React from 'react';

const Loading: React.FC = () => {
  return (
   <div className="flex">
     <p className='text-sm  text-[#A4A4A4] animate-bounce-slow animation-delay-200  mr-1'>AI</p>
     <p className='text-sm  text-[#A4A4A4] animate-bounce-slow animation-delay-400 mr-1'>đang</p>
     <p className='text-sm  text-[#A4A4A4] animate-bounce-slow animation-delay-600  mr-1'>soạn</p>
     
     <div className="animate-bounce-slow animation-delay-800 mr-1 text-[#A4A4A4]">●</div>
     <div className="animate-bounce-slow animation-delay-1000 mr-1 text-[#A4A4A4]">●</div>
     <div className="animate-bounce-slow animation-delay-1200 mr-1 text-[#A4A4A4]">●</div>
   </div>
  );
};

export default Loading;