import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

export default function HalfDay() {
  return (
    <div className="mt-5">
      <form>
        <div>
          <h4 className="text-lg text-[#525252] font-medium mt-5">Pilih Mapel</h4>
          <div className="flex gap-4 flex-wrap mt-2 ml-3">
            <button type="button" className="py-2 px-5 outline outline-gray-500 rounded-full">
              PDS
            </button>
            <button type="button" className="py-2 px-5 outline outline-gray-500 rounded-full">
              PDS
            </button>
            <button type="button" className="py-2 px-5 outline outline-gray-500 rounded-full">
              PDS
            </button>
            <button type="button" className="py-2 px-5 outline outline-gray-500 rounded-full">
              PDS
            </button>
            <button type="button" className="py-2 px-5 outline outline-gray-500 rounded-full">
              PDS
            </button>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-lg text-[#525252] font-medium">Kategori</h4>

          <select className="w-full bg-white py-2 px-5 rounded">
            <option value="">Keperluan Sekolah</option>
            <option value="">Izin</option>
          </select>
        </div>

        <div className="mt-5">
          <h4 className="text-lg text-[#525252] font-medium">Alasan</h4>

          <textarea className="w-full h-20 rounded py-2 px-5 text-sm"></textarea>
        </div>

        <div className="mt-5">
          <h4 className="text-lg text-[#525252] font-medium">Upload Surat Izin</h4>

          <button className="bg-white flex gap-5 py-2 px-5 w-full rounded">
            <ArrowUpTrayIcon width={24} />
            <span>Tambah File</span>
          </button>
        </div>
      </form>
    </div>
  );
}
