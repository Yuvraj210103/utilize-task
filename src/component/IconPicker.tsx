import { useState } from "react";
import { iconList } from "../constants/icons";

interface IconPickerProps {
  rowsInOnePage: number;
  columnsInOnePage: number;
  iconHeight: string;
  iconWidth: string;
  pickerHeight?: string;
  pickerWidth?: string;
  onIconSelect: (icon: string) => void;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const IconPicker = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = "500px",
  pickerWidth = "500px",
  onIconSelect,
  setShowPicker,
}: IconPickerProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const paginatedIcons = iconList.slice(
    (currentPage - 1) * iconsPerPage,
    currentPage * iconsPerPage
  );

  return (
    <div
      className="overflow-hidden w-full h-full flex flex-col justify-center items-center gap-4"
      style={{ height: pickerHeight, width: pickerWidth }}
    >
      <div className="flex justify-between mt-2 w-full">
        <span className="font-semibold text-xl">Select Icon</span>
        <img
          src="/icons/x.svg"
          alt=""
          className="cursor-pointer"
          onClick={() => setShowPicker(false)}
        />
      </div>
      <div
        className="grid gap-2 justify-between w-full"
        style={{
          gridTemplateColumns: `repeat(${columnsInOnePage}, ${iconWidth})`,
          gridTemplateRows: `repeat(${rowsInOnePage}, ${iconHeight})`,
        }}
      >
        {paginatedIcons.map((icon: string) => (
          <div
            key={icon}
            className="flex items-center justify-center cursor-pointer bg-blue-400 text-white p-2 rounded w-full"
            style={{ height: iconHeight, width: iconWidth }}
            onClick={() => onIconSelect(icon)}
          >
            <img
              src={`/icons/${icon}.svg`}
              alt={icon}
              className="h-full w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 w-full">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev * iconsPerPage < iconList.length ? prev + 1 : prev
            )
          }
          disabled={currentPage * iconsPerPage >= iconList.length}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IconPicker;
