interface SectionHeadingInterface {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingInterface) {
  return <h5 className="uppercase font-bold">{title}</h5>;
}
