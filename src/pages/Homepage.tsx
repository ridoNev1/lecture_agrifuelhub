import BottomNav from "@/components/layout/BottomNav";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  AgriculturalWaste,
  agriculturalWastes,
  getUserDetails,
  StatusBadge,
} from "@/enum";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const userDetails = getUserDetails();
  const [search, setSearch] = useState<string>("");
  const [dataSet, setDataSet] = useState<AgriculturalWaste[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("mainData");
    if (!savedData)
      localStorage.setItem("mainData", JSON.stringify(agriculturalWastes));
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("mainData");

    if (savedData) {
      const data: AgriculturalWaste[] = JSON.parse(savedData);
      if (userDetails?.user_level === 1) {
        setDataSet(
          data?.filter(
            (el) => el?.billingStatus === 1 || el?.billingStatus === 6
          )
        );
      } else {
        setDataSet(data);
      }
    }
  }, [userDetails?.user_level]);

  return (
    <Layout>
      <>
        <Navbar isNeedSearch onSearch={setSearch} />
        <div className="py-24 px-6">
          <div className=" flex justify-between items-center">
            <h2 className="font-bold text-lg">
              {userDetails?.user_level === 1
                ? "Daftar Permintaan Jual"
                : "List Pickup"}
            </h2>
            {userDetails?.user_level === 1 && (
              <Link to="/add-order">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-400 text-sm py-1"
                >
                  <FaPen /> Buat Baru
                </Button>
              </Link>
            )}
            {userDetails?.user_level === 2 && (
              <Link to="/confirm-pickup">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-400 text-sm py-1"
                >
                  <FaPen /> Konfirmasi Pickup
                </Button>
              </Link>
            )}
          </div>
          <div className="mt-6">
            {dataSet?.length > 0 &&
              dataSet
                ?.filter((el) =>
                  userDetails?.user_level === 2 ? el?.status === 1 : el
                )
                ?.filter((el) =>
                  el?.order_id?.toLowerCase()?.includes(search.toLowerCase())
                )
                .map((el, indx) => (
                  <div
                    key={indx}
                    onClick={() => {
                      localStorage.setItem("order-detail", JSON.stringify(el));
                      navigate("/detail-order");
                    }}
                    className="shadow-md cursor-pointer mb-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 max-w-sm"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center space-x-1">
                        <MdConfirmationNumber />
                        <span className="font-bold">{el.order_id}</span>
                      </span>
                      <span
                        className={`${
                          StatusBadge[
                            userDetails?.user_level === 1
                              ? el?.billingStatus
                              : el.status
                          ].color
                        } text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center space-x-1`}
                      >
                        <span className="font-bold">
                          {
                            StatusBadge[
                              userDetails?.user_level === 1
                                ? el?.billingStatus
                                : el.status
                            ].label
                          }
                        </span>
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{el.item}</p>
                    <p className="font-medium text-gray-700">
                      {(el?.berat_per_karung_kg ?? 0) *
                        (el?.jumlah_karung ?? 0)}{" "}
                      Kg
                    </p>
                    <p className="font-medium mt-2 text-xs text-gray-500 line-clamp-2 text-ellipsis">
                      {el.alamat}
                    </p>
                  </div>
                ))}
          </div>
        </div>
        <BottomNav />
      </>
    </Layout>
  );
};

export default Homepage;
