import * as React from "react";
import { renderSecondaryPage } from "../../templates/secondary-template";
import { Markdown } from "../../components/Markdown";

interface BestToWorstProps {
  items: {
    primaryText: string;
    secondaryText?: string;
    desc?: string;
    image?: string;
  }[];
  useImageAsBackground?: boolean;
}

export const BestToWorst: React.FC<BestToWorstProps> = ({
  items,
  useImageAsBackground = false,
}) => {
  return (
    <div>
      <div className="relative grid gap-2 max-w-[900px] mx-auto">
        {items.map((item, i) => {
          return (
            <div>
              <div className="flex items-center w-full h-16 relative overflow-hidden rounded-xl bg-[#68647d] z-[0]">
                <span className="text-4xl text-white w-20 flex items-center justify-center shrink-0 mx-2">
                  #{i + 1}
                </span>
                {useImageAsBackground && (
                  <div
                    className="w-full h-full absolute z-[-10] bg-center"
                    style={{
                      backgroundImage: `url('${item.image}')`,
                      backgroundSize: "150%",
                      filter: "blur(70px) saturate(3)",
                    }}
                  />
                )}
                <div
                  className="w-24 h-full bg-cover bg-center shrink-0"
                  style={{
                    backgroundImage: `url("${item.image}")`,
                  }}
                />
                <div className="ml-4 flex flex-col text-white py-2">
                  <div className="text-2xl">{item.primaryText}</div>
                  <div>{item.secondaryText}</div>
                </div>
              </div>
              {item.desc && (
                <div className="mt-[-1rem]">
                  <Markdown content={item.desc} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const renderBestToWorstPage = (
  title: string,
  items: BestToWorstProps["items"]
) => {
  return renderSecondaryPage(<BestToWorst items={items} />, title);
};
