import { ArrowLeftIcon, ArrowUpTrayIcon, CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function page() {
  return (
    <div className="max-w-[444px] min-h-screen mx-auto bg-[#EBEBFF] relative">
      <div className="w-full py-3 px-5 flex gap-3 items-center">
        <Link href="/student" className="p-2">
          <ArrowLeftIcon width={24} className="text-[#404040]" />
        </Link>
        <h2 className="text-[#404040] font-semibold text-xl">Pengajuan Izin</h2>
      </div>

      <div className="px-5 pt-7">
        <p className="text-[#525252]">Untuk mengajukan izin, silahkan upload surat keterangan dalam bentuk JPG, PNG, PDF</p>
        <h4 className="text-lg text-[#525252] font-medium mt-5">Jenis Izin</h4>

        <div className="flex justify-around mt-2">
          <button className="p-2 px-3 bg-white outline outline-[#BABAE8] flex gap-2 rounded-full w-2/5">
            <ClockIcon width={24} className="text-[#1F1F7A]" />
            <span>Half Day</span>
          </button>
          <button className="p-2 px-3 bg-[#CECEF3] flex gap-2 rounded-full w-2/5">
            <CalendarDaysIcon width={24} className="text-[#1F1F7A]" />
            <span>Full Day</span>
          </button>
        </div>

        <div className="mt-5">
          <form>
            <div>
              <h4 className="text-lg text-[#525252] font-medium mt-5">Kategori</h4>

              <select className="w-full bg-white py-2 px-5 rounded">
                <option value="">Sakit</option>
                <option value="">Izin</option>
              </select>
            </div>

            <div>
              <h4 className="text-lg text-[#525252] font-medium mt-5">Alasan</h4>

              <textarea className="w-full h-20 rounded py-2 px-5 text-sm"></textarea>
            </div>

            <div>
              <h4 className="text-lg text-[#525252] font-medium mt-5">Upload Surat Izin</h4>

              <button className="bg-white flex gap-5 py-2 px-5 w-full rounded">
                <ArrowUpTrayIcon width={24} />
                <span>Tambah File</span>
              </button>
            </div>
          </form>
        </div>

        <div className="absolute bottom-10 left-0 right-0">
          <button className="bg-[#1F1F7A] text-center block mx-auto px-32 py-3 font-semibold text-white">Ajukan Izin</button>
        </div>
      </div>
    </div>
  );
}
