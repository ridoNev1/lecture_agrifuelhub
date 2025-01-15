import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdConfirmationNumber, MdFactory } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { getUserDetails } from "@/enum";
const BottomNav = () => {
  const userDetails = getUserDetails();

  return (
    <nav className="fixed w-full max-w-[412px] bg-white shadow-lg bottom-0 border-t">
      <ul className="flex justify-around items-center py-4">
        <Link to="/homepage">
          <li className="flex flex-col items-center">
            <button className="text-green-500">
              <MdConfirmationNumber className="text-xl" />
            </button>
            <span className="text-xs text-gray-500">Order</span>
          </li>
        </Link>
        {userDetails && userDetails?.user_level === 1 && (
          <Link to="/billing">
            <li className="flex flex-col items-center">
              <button className="text-green-500">
                <FaMoneyBillWave className="text-xl" />
              </button>
              <span className="text-xs text-gray-500">Billing</span>
            </li>
          </Link>
        )}

        {userDetails && userDetails?.user_level === 2 && (
          <Link to="/manufacture">
            <li className="flex flex-col items-center">
              <button className="text-green-500">
                <MdFactory className="text-xl" />
              </button>
              <span className="text-xs text-gray-500">Manufacture</span>
            </li>
          </Link>
        )}

        <Link to="/profile">
          <li className="flex flex-col items-center">
            <button className="text-green-500">
              <CgProfile className="text-xl" />
            </button>
            <span className="text-xs text-gray-500">Profile</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default BottomNav;
