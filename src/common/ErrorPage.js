import Layout from "../components/Layout";

export default function ErrorPage() {
  return (
    <Layout title="Kesalahan">
      <div className="mx-auto h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg">
        <div className="flex justify-center">
          <h1 className="text-center text-3xl">Sedang Dalam Pemeliharaan</h1>
        </div>
      </div>
    </Layout>
  );
}
