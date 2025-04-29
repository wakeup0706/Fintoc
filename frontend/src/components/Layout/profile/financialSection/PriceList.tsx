import React from "react";

export default function SubscriptionList( { lists } : { lists : any[] } ) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 w-full max-w-xs md:max-w-md mx-auto">
      <ul className="space-y-4">
        {lists.map((item, index) => (
          <li key={index} className="flex justify-between items-center px-6 gap-5 md:gap-52 border-b-[1px] border-gray-500">
            <div className="flex items-center gap-2">
                <img src={item.icon} alt={item.name} className="w-8 h-8 md:w-12 md:h-12 m-2" />
                <div className="flex flex-col items-start">
                    <span className="text-ct-grey">{item.name}</span>
                    <span className="text-xs text-ct-grey">{item.prop}</span>
                </div>
            </div>
            <span className="font-semibold text-ct-grey">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}