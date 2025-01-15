import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch } from "react-icons/fi";
import { MainLogo } from "@/assets/export";

interface INavbar {
  isNeedSearch?: boolean;
  onSearch?: (val: string) => void;
}

const Navbar: React.FC<INavbar> = ({ isNeedSearch, onSearch }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [search, setSearch] = useState<string>("");

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full max-w-[412px] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center justify-center h-10">
        <img src={MainLogo} alt="navigation-bar-images" className="w-10 h-12" />
      </div>
      <div className="relative">
        {isNeedSearch && (
          <div
            className={`flex items-center justify-center transition-all duration-300 ${
              searchActive ? "w-64" : "w-10"
            }`}
          >
            {!searchActive ? (
              <Button
                variant="ghost"
                onClick={toggleSearch}
                className="flex items-center justify-center"
              >
                <FiSearch className="h-6 w-6 text-gray-500" />
              </Button>
            ) : (
              <Input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                onBlur={toggleSearch}
                autoFocus
                value={search}
                onChange={(e) => {
                  setSearch(e?.target?.value);
                  if (onSearch) onSearch(e?.target?.value);
                }}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
