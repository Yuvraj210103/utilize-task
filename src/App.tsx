import { useState } from "react";
import "./App.css";
import IconPicker from "./component/IconPicker";

function App() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-12 px-4 md:px-36 gap-6">
      {!showPicker && (
        <div
          onClick={() => {
            setShowPicker(true);
            setSelectedIcon("");
          }}
          className="flex flex-col bg-gray-200 rounded cursor-pointer p-4"
        >
          Click here to open icon picker
        </div>
      )}

      {selectedIcon && (
        <img
          src={`/icons/${selectedIcon}.svg`}
          alt={selectedIcon}
          className="w-[100px] h-[100px]"
        />
      )}

      {showPicker && (
        <IconPicker
          rowsInOnePage={5}
          columnsInOnePage={8}
          iconHeight="50px"
          iconWidth="50px"
          onIconSelect={(icon) => {
            setSelectedIcon(icon);
            setShowPicker(false);
          }}
          setShowPicker={setShowPicker}
        />
      )}
    </div>
  );
}

export default App;
