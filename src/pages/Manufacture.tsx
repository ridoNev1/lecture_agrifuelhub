import BottomNav from "@/components/layout/BottomNav";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import { AgriculturalWaste, agriculturalWastes, StatusBadge } from "@/enum";
import { useEffect, useState } from "react";
import { MdConfirmationNumber } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Manufacture = () => {
  const navigate = useNavigate();

  const [dataSet, setDataSet] = useState<AgriculturalWaste[]>([]);
  useEffect(() => {
    const savedData = localStorage.getItem("mainData");
    if (!savedData)
      localStorage.setItem("mainData", JSON.stringify(agriculturalWastes));
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("mainData");
    if (savedData) setDataSet(JSON.parse(savedData));
  }, []);

  return (
    <Layout>
      <div className="min-h-screen">
        <Navbar />
        <div className="py-24 px-6">
          <div className=" flex justify-between items-center">
            <h2 className="font-bold text-lg">List Items</h2>
          </div>
          <div className="mt-6">
            {dataSet?.length > 0 &&
              dataSet
                ?.filter(
                  (el) =>
                    el?.status === 2 || el?.status === 7 || el?.status === 3
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
                          StatusBadge[el.status].color
                        } text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center space-x-1`}
                      >
                        <span className="font-bold">
                          {StatusBadge[el.status].label}
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
      </div>
    </Layout>
  );
};

export default Manufacture;
