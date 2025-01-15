import BottomNav from "@/components/layout/BottomNav";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AgriculturalWaste,
  formatDate,
  getItemOptions,
  getUkuranKarungOptions,
  Item,
  Status,
  UkuranKarung,
} from "@/enum";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPickup = () => {
  const navigate = useNavigate();

  const [dataSet, setDataSet] = useState<AgriculturalWaste[]>([]);
  useEffect(() => {
    const savedData = localStorage.getItem("mainData");
    if (savedData) setDataSet(JSON.parse(savedData));
  }, []);

  const [data, setData] = useState<AgriculturalWaste>({
    order_id: "",
    item: Item.TONGKOL_JAGUNG,
    ukuran_karung: UkuranKarung.KECIL,
    status: Status.WAITING_FOR_PICKUP,
    alamat: "",
    tanggal_pengangkutan: "",
    user_name: "Petani Jamal",
    userId: 1,
  });

  const onChange =
    (key: keyof AgriculturalWaste) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const filterEmptyValues = (obj: typeof data) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([, value]) => value !== "" && value !== null && value !== undefined
      )
    );
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <Navbar />
        <div className="py-24 px-6">
          <h2 className="font-bold text-lg">Konfirmasi Kedatangan Barang</h2>
          <div className="mt-4">
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="order-id">Order ID</Label>
              </div>
              <Select
                onValueChange={(value) =>
                  setData({ ...data, order_id: value as Item })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  {dataSet.map((el, indx) => (
                    <SelectItem key={indx} value={el.order_id}>
                      {el.order_id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full mt-3">
              <div className="mb-2">
                <Label htmlFor="detail-service">Jenis Paket</Label>
              </div>
              <Select
                onValueChange={(value) =>
                  setData({ ...data, item: value as Item })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  {getItemOptions().map((el, indx) => (
                    <SelectItem key={indx} value={el.value}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full mt-3">
              <div className="mb-2">
                <Label htmlFor="detail-service">Ukuran Paket</Label>
              </div>
              <Select
                onValueChange={(value) =>
                  setData({ ...data, ukuran_karung: value as UkuranKarung })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  {getUkuranKarungOptions().map((el, indx) => (
                    <SelectItem key={indx} value={el.value}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full mt-3">
              <div className="mb-2">
                <Label htmlFor="jumlah_paket">Jumlah Paket</Label>
              </div>
              <Input
                type="number"
                id="jumlah_paket"
                placeholder="masukan jumlah paket"
                value={data.jumlah_karung}
                onChange={onChange("jumlah_karung")}
              />
            </div>
            <div className="w-full mt-3">
              <div className="mb-2">
                <Label htmlFor="berat_paket">Berat per Paket (KG)</Label>
              </div>
              <Input
                type="number"
                id="berat_paket"
                placeholder="berat dalam kg"
                value={data.berat_per_karung_kg}
                onChange={onChange("berat_per_karung_kg")}
              />
            </div>
            <div className="w-full mt-3">
              <div className="mb-2">
                <Label htmlFor="tanggal_produksi">Tanggal Mulai Produksi</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !data.tanggal_manufacturing && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.tanggal_manufacturing ? (
                      format(data.tanggal_manufacturing, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      data.tanggal_manufacturing
                        ? new Date(data.tanggal_manufacturing)
                        : undefined
                    }
                    onSelect={(date) =>
                      setData({
                        ...data,
                        tanggal_manufacturing: formatDate(date),
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button
            onClick={() => {
              const dataMist = {
                ...dataSet.find((el) => el.order_id === data.order_id),
                ...filterEmptyValues(data),
                status: Status.READY_FOR_PRODUCTION,
              };
              const mergedData = dataSet.filter(
                (el) => el.order_id !== dataMist.order_id
              );
              localStorage.setItem(
                "mainData",
                JSON.stringify([dataMist, ...mergedData])
              );
              navigate("/homepage");
            }}
            className="mt-10 w-full bg-green-500 hover:bg-green-400"
          >
            Confirm Pickup
          </Button>
        </div>
        <BottomNav />
      </div>
    </Layout>
  );
};

export default ConfirmPickup;
