import AppBar from '~/components/AppBar';

export default function page() {
  return (
    <div className="max-w-[444px] min-h-screen mx-auto bg-[#EBEBFF] relative">
      <div className="w-full py-4 px-5 flex justify-between items-center">
        <h2 className="text-[#404040] font-semibold text-xl">Statistic</h2>
      </div>

      <AppBar active="statistic" />
    </div>
  );
}
