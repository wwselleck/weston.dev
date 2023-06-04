import React from "react";

const SectionHeaderColors = {
  blue: "bg-blue-3",
  purple: "bg-purple-2",
  pink: "bg-pink-1",
  yellow: "bg-yellow-1",
};

interface SectionHeaderProps {
  color: keyof typeof SectionHeaderColors;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ children, color }) => {
  return (
    <div className={"flex items-center text-2xl font-light mb-8"}>
      <div
        className={`inline-block w-8 h-8 mr-4 ${SectionHeaderColors[color]}`}
      />
      {children}
    </div>
  );
};

interface SectionItemProps {
  name: string;
  href: string;
  desc?: string;
}
export const SectionItem: React.FC<SectionItemProps> = ({
  name,
  href,
  desc,
}) => {
  return (
    <div className="mt-3">
      <a href={href} className="text-xl font-medium">
        {name}
      </a>
      {desc && <div className="mt-3">{desc}</div>}
    </div>
  );
};

interface SectionProps {
  name: string;
  color: keyof typeof SectionHeaderColors;
}
export const Section: React.FC<SectionProps> = ({ name, color, children }) => {
  return (
    <div className="mb-12">
      <SectionHeader color={color}>{name}</SectionHeader>
      {children}
    </div>
  );
};
