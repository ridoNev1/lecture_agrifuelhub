import BottomNav from "@/components/layout/BottomNav";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AgriculturalWaste,
  BiomassFuelProductOptions,
  Item,
  Status,
  UkuranKarung,
} from "@/enum";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompleteProduction = () => {
  const navigate = useNavigate();
  const [resProduction, setResProduction] = useState<string>("");
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

  return (
    <Layout>
      <>
        <Navbar />
        <div className="py-24 px-6">
          <h2 className="font-bold text-lg">Production Summary</h2>
          <div className="w-full mt-3">
            <div className="mb-2">
              <Label htmlFor="production-results">Hasil Produksi</Label>
            </div>
            <div className="mt-4">
              <Select
                onValueChange={(value) => setResProduction(value as string)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  {BiomassFuelProductOptions.map((el, indx) => (
                    <SelectItem key={indx} value={el.value}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full mt-6 bg-green-500 hover:bg-green-400"
              onClick={() => {
                const dataMist = {
                  ...dataSet.find((el) => el.order_id === detailData.order_id),
                  status: Status.READY_FOR_SELLING,
                  resultProduction: resProduction,
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
            >
              Complete Production
            </Button>
          </div>
        </div>
        <BottomNav />
      </>
    </Layout>
  );
};

export default CompleteProduction;
