"use client";

import BottomNav from "@/components/layout/BottomNav";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  AgriculturalWaste,
  formatRupiah,
  getUserDetails,
  Item,
  StatusBadge,
  UkuranKarung,
} from "@/enum";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { MdConfirmationNumber } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const GOOGLE_MAPS_API_KEY = "";

const OrderSummary = () => {
  const userDetails = getUserDetails();
  const navigate = useNavigate();
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
  });

  useEffect(() => {
    const savedData = localStorage.getItem("order-detail");
    if (savedData) {
      setDetailData(JSON.parse(savedData));
    }
  }, []);

  const [markerLocation] = useState({
    lat: -6.221791,
    lng: 106.843239,
  });

  const sendToWhatsAppPegawai = () => {
    const phoneNumber = "6281217873551";

    const orderId = detailData?.order_id || "-";
    const item = detailData?.item || "-";
    const alamat = detailData?.alamat || "-";
    const tanggal = detailData?.tanggal_pengangkutan || "Belum Ditentukan";

    const templateMessage = `
  Halo, saya ingin membuat penugasan untuk order berikut:\n
  Order ID: ${orderId}\n
  Jenis Paket: ${item}\n
  Alamat: ${alamat}\n
  Tanggal: ${tanggal}\n
  Gmaps Lokasi: https://maps.app.goo.gl/g5KbqTMXhq7GAq2X6
    `;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      templateMessage
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-6 py-24">
          <div className=" mb-4 flex items-center justify-between">
            <h2 className="font-bold text-lg">Summary Order</h2>
            <span
              className={`${
                StatusBadge[detailData.status].color
              } text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center space-x-1`}
            >
              <span className="font-bold">
                {StatusBadge[detailData.status].label}
              </span>
            </span>
          </div>
          <div className="rounded-md overflow-hidden">
            <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
              <Label className="text-gray-700 leading-none">Order Id</Label>
              <span className="text-[#242424] flex items-center font-medium space-x-1">
                <MdConfirmationNumber />
                <span className="font-bold">{detailData?.order_id}</span>
              </span>
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
              <Label className="text-gray-700 leading-none">Item</Label>
              <p className="text-ellipsis line-clamp-3">{detailData?.item}</p>
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
              <Label className="text-gray-700 leading-none">Jumlah Paket</Label>
              <p className="text-ellipsis line-clamp-3">
                {detailData?.jumlah_karung} Paket
              </p>
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
              <Label className="text-gray-700 leading-none">Ukuran Paket</Label>
              <p className="text-ellipsis line-clamp-3">
                {detailData?.ukuran_karung}
              </p>
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
              <Label className="text-gray-700 leading-none">
                Berat per Paket
              </Label>
              <p className="text-ellipsis line-clamp-3">
                {detailData?.berat_per_karung_kg} kg
              </p>
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
              <Label className="text-gray-700 leading-none">Total Paket</Label>
              <p className="text-ellipsis line-clamp-3">
                {(detailData?.berat_per_karung_kg ?? 0) *
                  (detailData?.jumlah_karung ?? 0)}{" "}
                kg
              </p>
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
              <Label className="text-gray-700 leading-none">Alamat</Label>
              <p className="text-ellipsis line-clamp-3">{detailData?.alamat}</p>
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
              <div>
                <Label className="text-gray-700 leading-none">Tanggal</Label>
                <br />
                <span className="text-sm font-medium text-gray-400 leading-[0]">
                  (
                  {detailData?.tanggal_penjualan
                    ? "tanggal penjualan"
                    : detailData?.tanggal_manufacturing
                    ? "mulai produksi"
                    : detailData?.tanggal_pengangkutan
                    ? "tanggal pengangkutan"
                    : ""}
                  )
                </span>
              </div>

              <p className="text-ellipsis mb-1 line-clamp-1 text-sm">
                {detailData?.tanggal_penjualan?.toString() ||
                  detailData?.tanggal_manufacturing?.toString() ||
                  detailData?.tanggal_pengangkutan?.toString() ||
                  "no data"}
              </p>
            </div>
            {userDetails?.user_level === 2 && (
              <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
                <Label className="text-gray-700 leading-none">
                  Di Buat Oleh
                </Label>
                <p className="text-ellipsis line-clamp-3">
                  {detailData?.user_name}
                </p>
              </div>
            )}
            {detailData?.status === 1 && (
              <div className="w-full bg-white py-2 px-4">
                <div className="mb-4 flex justify-between items-center">
                  <Label className="text-gray-700 leading-none">
                    Detail Lokasi
                  </Label>
                  <span className="text-blue-500 cursor-pointer font-medium">
                    Lihat Maps
                  </span>
                </div>
                <div className="w-full h-[200px] mb-4">
                  <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <Map
                      style={{ borderRadius: "20px" }}
                      defaultZoom={18}
                      defaultCenter={markerLocation}
                      gestureHandling={"greedy"}
                      disableDefaultUI
                    >
                      <Marker position={markerLocation} />
                    </Map>
                  </APIProvider>
                </div>
              </div>
            )}
          </div>
          {detailData?.status === 3 && (
            <div className="mt-4">
              <div className="rounded-md overflow-hidden">
                <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                  <Label className="text-gray-700 leading-none">
                    Hasil Produksi
                  </Label>
                  <span className="text-[#242424] flex items-center space-x-1">
                    <p className="text-ellipsis line-clamp-3">
                      {detailData.resultProduction}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          )}

          {userDetails?.user_level === 2 && detailData?.status === 7 && (
            <div className="mt-4">
              <h2 className="font-bold">Detail Cost</h2>
              <div className="mt-4">
                <div className="rounded-md overflow-hidden">
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                    <Label className="text-gray-700 leading-none">
                      Jarak Pengangkutan
                    </Label>
                    <span className="text-[#242424] flex items-center space-x-1">
                      <p className="text-ellipsis line-clamp-3">
                        {detailData.jarakPengangkutan} KM
                      </p>
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
                    <Label className="text-gray-700 leading-none">
                      Jarak Pengiriman
                    </Label>
                    <p className="text-ellipsis line-clamp-3">
                      {detailData.jarakPengiriman} KM
                    </p>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                    <Label className="text-gray-700 leading-none">
                      Harga per Item
                    </Label>
                    <span className="text-[#242424] flex items-center space-x-1">
                      <p className="text-ellipsis line-clamp-3">
                        {formatRupiah(detailData.hargaItem ?? 0)}
                      </p>
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
                    <Label className="text-gray-700 leading-none">
                      Biaya Pengiriman
                    </Label>
                    <p className="text-ellipsis line-clamp-3">
                      {formatRupiah(detailData.biayaPengiriman ?? 0)}
                    </p>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                    <Label className="text-gray-700 leading-none">
                      Biaya Penyimpanan
                    </Label>
                    <span className="text-[#242424] flex items-center space-x-1">
                      <p className="text-ellipsis line-clamp-3">
                        {formatRupiah(detailData.biayaPenyimpanan ?? 0)}
                      </p>
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
                    <Label className="text-gray-700 leading-none">
                      Biaya Pemrosesan
                    </Label>
                    <p className="text-ellipsis line-clamp-3">
                      {formatRupiah(detailData.biayaPemrosesan ?? 0)}
                    </p>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                    <Label className="text-gray-700 leading-none">
                      Total Cost
                    </Label>
                    <span className="text-[#242424] flex items-center space-x-1">
                      <p className="text-ellipsis line-clamp-3">
                        {formatRupiah(detailData.totalCost ?? 0)}
                      </p>
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                    <Label className="text-gray-700 leading-none">
                      Harga Jual
                    </Label>
                    <span className="text-[#242424] flex items-center space-x-1">
                      <p className="text-ellipsis line-clamp-3">
                        {formatRupiah(detailData.hargaJual ?? 0)}
                      </p>
                    </span>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-gray-200 py-2 px-4">
                    <Label className="text-gray-700 leading-none">Margin</Label>
                    <p className="text-ellipsis line-clamp-3">
                      {formatRupiah(detailData.margin ?? 0)}
                    </p>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-4 bg-white py-2 px-4">
                    <Label className="text-gray-700 leading-none">
                      Pembayaran Petani
                    </Label>
                    <span className="text-[#242424] flex items-center space-x-1">
                      <p className="text-ellipsis line-clamp-3">
                        {formatRupiah(detailData.pembayaranPetani ?? 0)}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6">
            {userDetails?.user_level === 2 && detailData?.status === 2 && (
              <Button
                className="w-full bg-green-500 hover:bg-green-400"
                onClick={() => {
                  navigate("/cost-input");
                }}
              >
                Submit Cost
              </Button>
            )}
            {userDetails?.user_level === 2 && detailData?.status === 1 && (
              <Button
                className="w-full bg-green-500 hover:bg-green-400"
                onClick={() => {
                  sendToWhatsAppPegawai();
                }}
              >
                Buat Penugasan
              </Button>
            )}
            {userDetails?.user_level === 2 && detailData?.status === 7 && (
              <Button
                className="w-full bg-green-500 hover:bg-green-400"
                onClick={() => {
                  navigate("/complete-production");
                }}
              >
                Complete
              </Button>
            )}
            <Button
              className="mt-2 text-[#242424] w-full bg-white hover:bg-white"
              onClick={() => navigate("/homepage")}
            >
              Tutup
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    </Layout>
  );
};

export default OrderSummary;
