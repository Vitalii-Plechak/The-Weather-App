import { ReactNode } from "react";
import SectionHeading from "./SectionHeading";

interface ContainerInterface {
  title: string;
  sectionSubHeader?: string;
  children?: ReactNode;
}

const Container = ({
  title,
  sectionSubHeader,
  children,
}: ContainerInterface) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col text-center gap-1">
        <SectionHeading title={title} />
        {sectionSubHeader && <p>{sectionSubHeader}</p>}
      </div>
      {children}
    </div>
  );
};

export default Container;
