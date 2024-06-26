import React from "react";
import { MdInfoOutline } from "react-icons/md";

type InfoBoxProps = {
  children: React.ReactNode;
};

function InfoBox({ children }: InfoBoxProps) {
  return (
    <div className="bg-white border shadow-lg p-4 w-full rounded-xl mt-6 relative">
      {children}
    </div>
  );
}

export default InfoBox;
