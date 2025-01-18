import BottomNav from "@/components/layout/BottomNav";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AgriculturalWaste,
  formatRupiah,
  hitungBiayaProduksi,
  Item,
  Status,
  UkuranKarung,
} from "@/enum";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IDataRange {
  jarakPengangkutan?: number;
  jarakPengiriman?: number;
}

const CostInputPage = () => {
  const navigate = useNavigate();

  const [dataRange, setDataRange] = useState<IDataRange>({});
  const [totalCost, setTotalCost] = useState<{
    hargaJual: number;
    margin: number;
    pembayaranPetani: number;
    hargaItem: number;
    biayaPemrosesan: number;
    biayaPengiriman: number;
    biayaPenyimpanan: number;
    totalCost: number;
  }>({
    hargaJual: 0,
    margin: 0,
    pembayaranPetani: 0,
    hargaItem: 0,
    biayaPemrosesan: 0,
    biayaPengiriman: 0,
    biayaPenyimpanan: 0,
    totalCost: 0,
  });
  const [isGenerateCost, setIsGenerateCost] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<AgriculturalWaste>({
    order_id: "",
    item: Item.BATANG_JAGUNG,
    berat_per_karung_kg: 1,
    ukuran_karung: UkuranKarung.KECIL,
    jumlah_karung: 1,
    status: 1,
    alamat: "",
    user_name: "Petani Jamal",
    userId: 1,
    billingStatus: 1,
  });
  const [dataSet, setDataSet] = useState<AgriculturalWaste[]>([]);
  useEffect(() => {
    const savedData = localStorage.getItem("mainData");
    if (savedData) setDataSet(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("order-detail");
    if (savedData) {
      setDetailData(JSON.parse(savedData));
    }
  }, []);

  const onChange =
    (key: keyof IDataRange) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setDataRange((prev) => ({ ...prev, [key]: event.target.value }));
    };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="py-24 px-6">
          <h2 className="font-bold text-lg">Cost Input</h2>
          {!isGenerateCost && (
            <>
              <div className="mt-4">
                <div className="w-full mt-3">
                  <div className="mb-2">
                    <Label htmlFor="jarak_angkut">
                      Jarak Pengangkutan (KM)
                    </Label>
                  </div>
                  <Input
                    type="number"
                    id="jarak_angkut"
                    placeholder="jarak dalam KM"
                    value={dataRange.jarakPengangkutan}
                    onChange={onChange("jarakPengangkutan")}
                  />
                </div>
                <div className="w-full mt-3">
                  <div className="mb-2">
                    <Label htmlFor="jarak_kirim">Jarak Pengiriman (KM)</Label>
                  </div>
                  <Input
                    type="number"
                    id="jarak_kirim"
                    placeholder="jarak dalam KM"
                    value={dataRange.jarakPengiriman}
                    onChange={onChange("jarakPengiriman")}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  const totalCost = hitungBiayaProduksi(
                    detailData,
                    dataRange.jarakPengangkutan ?? 0,
                    dataRange.jarakPengiriman ?? 0
                  );
                  setTotalCost(totalCost);
                  setIsGenerateCost(true);
                }}
                className="mt-10 w-full bg-green-500 hover:bg-green-400"
              >
                Calculate Cost
              </Button>
            </>
          )}
          {isGenerateCost && (
            <div className="mt-4">
              <div className="rounded-md overflow-hidden">
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    Jarak Pengangkutan
                  </Label>
                  <span className="text-[#242424] flex items-center space-x-1">
                    <p className="text-ellipsis line-clamp-3">
                      {dataRange.jarakPengangkutan} KM
                    </p>
                  </span>
                </div>
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    Jarak Pengiriman
                  </Label>
                  <p className="text-ellipsis line-clamp-3">
                    {dataRange.jarakPengiriman} KM
                  </p>
                </div>
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    Harga per Item
                  </Label>
                  <span className="text-[#242424] flex items-center space-x-1">
                    <p className="text-ellipsis line-clamp-3">
                      {formatRupiah(totalCost.hargaItem ?? 0)}
                    </p>
                  </span>
                </div>
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    Biaya Pengiriman
                  </Label>
                  <p className="text-ellipsis line-clamp-3">
                    {formatRupiah(totalCost.biayaPengiriman ?? 0)}
                  </p>
                </div>
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    Biaya Penyimpanan
                  </Label>
                  <span className="text-[#242424] flex items-center space-x-1">
                    <p className="text-ellipsis line-clamp-3">
                      {formatRupiah(totalCost.biayaPenyimpanan ?? 0)}
                    </p>
                  </span>
                </div>
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    Biaya Pemrosesan
                  </Label>
                  <p className="text-ellipsis line-clamp-3">
                    {formatRupiah(totalCost.biayaPemrosesan ?? 0)}
                  </p>
                </div>
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    TotalCost
                  </Label>
                  <span className="text-[#242424] flex items-center space-x-1">
                    <p className="text-ellipsis line-clamp-3">
                      {formatRupiah(totalCost.totalCost ?? 0)}
                    </p>
                  </span>
                </div>
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    Harga Jual
                  </Label>
                  <span className="text-[#242424] flex items-center space-x-1">
                    <p className="text-ellipsis line-clamp-3">
                      {formatRupiah(totalCost.hargaJual ?? 0)}
                    </p>
                  </span>
                </div>
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
                  <Label className="text-gray-700 leading-none">Margin</Label>
                  <p className="text-ellipsis line-clamp-3">
                    {formatRupiah(totalCost.margin ?? 0)}
                  </p>
                </div>
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    Pembayaran Petani
                  </Label>
                  <span className="text-[#242424] flex items-center space-x-1">
                    <p className="text-ellipsis line-clamp-3">
                      {formatRupiah(totalCost.pembayaranPetani ?? 0)}
                    </p>
                  </span>
                </div>
                <Button
                  onClick={() => {
                    const dataMist = {
                      ...detailData,
                      status: Status.MANUFACTURING_PROCESS,
                      ...totalCost,
                      ...dataRange,
                    };
                    const filteredData = dataSet.filter(
                      (el) => el.order_id !== dataMist.order_id
                    );
                    localStorage.setItem(
                      "mainData",
                      JSON.stringify([dataMist, ...filteredData])
                    );
                    navigate("/manufacture");
                  }}
                  className="mt-10 w-full bg-green-500 hover:bg-green-400"
                >
                  Submit Cost
                </Button>
              </div>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </Layout>
  );
};

export default CostInputPage;
