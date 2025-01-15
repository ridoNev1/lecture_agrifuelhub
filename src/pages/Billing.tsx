import BottomNav from "@/components/layout/BottomNav";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";

const Billing = () => {
  return (
    <Layout>
      <>
        <Navbar />
        <div className="py-24 px-6">Billing</div>
        <BottomNav />
      </>
    </Layout>
  );
};

export default Billing;
