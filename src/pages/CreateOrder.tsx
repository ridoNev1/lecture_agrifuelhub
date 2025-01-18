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
import { Textarea } from "@/components/ui/textarea";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<AgriculturalWaste>({
    order_id: "",
    item: Item.TONGKOL_JAGUNG,
    ukuran_karung: UkuranKarung.KECIL,
    status: Status.WAITING_FOR_PICKUP,
    alamat: "",
    tanggal_pengangkutan: "",
    user_name: "Petani Jamal",
    userId: 1,
    billingStatus: 1,
  });

  const onChange =
    (key: keyof AgriculturalWaste) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const onTextAreaChange =
    (key: keyof AgriculturalWaste) =>
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((prev) => ({ ...prev, [key]: event.target.value }));
    };

  return (
    <Layout>
      <>
        <Navbar />
        <div className="p-6 pt-24">
          <h2 className="font-bold text-lg">Buat Permintaan Jual</h2>
          <div className="mt-4">
            <div className="w-full">
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
                <Label htmlFor="tanggal_produksi">Tanggal Pengangkutan</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !data.tanggal_pengangkutan && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.tanggal_pengangkutan ? (
                      format(data.tanggal_pengangkutan, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      data.tanggal_pengangkutan
                        ? new Date(data.tanggal_pengangkutan)
                        : undefined
                    }
                    onSelect={(date) =>
                      setData({
                        ...data,
                        tanggal_pengangkutan: formatDate(date),
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full mt-3">
              <div className="mb-2">
                <Label htmlFor="address">Alamat</Label>
              </div>
              <Textarea
                id="address"
                name="alamat"
                placeholder="Type the address here."
                value={data.alamat}
                onChange={onTextAreaChange("alamat")}
              />
            </div>
            <Button
              onClick={() => {
                const orderId = `FS${Math.random()
                  .toString(36)
                  .substring(2, 8)
                  .toUpperCase()}`;

                const newOrder = { ...data, order_id: orderId };
                localStorage.setItem("order-detail", JSON.stringify(newOrder));
                const storedData = localStorage.getItem("mainData") || "[]";
                const savedData = JSON.parse(storedData);
                localStorage.setItem(
                  "mainData",
                  JSON.stringify([newOrder, ...savedData])
                );
                navigate("/detail-order");
              }}
              className="mt-10 w-full bg-green-500 hover:bg-green-400"
            >
              Create Order
            </Button>
          </div>
        </div>
        <BottomNav />
      </>
    </Layout>
  );
};

export default CreateOrder;
