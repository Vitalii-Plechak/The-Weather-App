import { ReactNode } from "react";
import LoaderIcon from "../../assets/icons/loader.svg";

interface LoaderInterface {
  children?: ReactNode;
}

export default function Loader({ children }: LoaderInterface) {
  return (
    <div className="flex flex-row justify-center items-center w-full h-full min-h-28 gap-8 z-10 p-6">
      <div>
        <img
          className="animate-spin w-14 h-14"
          src={LoaderIcon}
          alt="Loader icon"
        />
      </div>
      {children}
    </div>
  );
}
