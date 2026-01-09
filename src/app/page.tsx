import { db } from "@/lib/db";
import AddShipmentModal from "@/components/AddShipmentModal";
import DeleteButton from "@/components/DeleteButton";

export const revalidate = 0;

export default async function DashboardPage() {
  const shipments = await db.shipment.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Logistics Operations</h1>
            <p className="text-slate-500 mt-1">Real-time Container Tracking System</p>
          </div>

          <AddShipmentModal></AddShipmentModal>

        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Shipments</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{shipments.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">In Transit</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {shipments.filter(s => s.status === 'IN_TRANSIT').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <p className="text-3xl font-bold text-amber-500 mt-2">
              {shipments.filter(s => s.status === 'PENDING').length}
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-500">Tracking No.</th>
                <th className="px-6 py-4 font-bold text-slate-500">Vessel</th>
                <th className="px-6 py-4 font-bold text-slate-500">Client</th>
                <th className="px-6 py-4 font-bold text-slate-500">Route</th>
                <th className="px-6 py-4 font-bold text-slate-500">Status</th>
                <th className="px-6 py-4 font-bold text-slate-500">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shipments.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-semibold text-blue-600">{s.trackingNumber}</td>
                  <td className="px-6 py-4 text-slate-900 font-medium">{s.vesselName || "-"}</td>
                  <td className="px-6 py-4 text-slate-900">{s.clientName}</td>
                  <td className="px-6 py-4 text-slate-600">{s.originPort} → {s.destinationPort}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md font-bold text-[11px] 
                      ${s.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-700' : 
                        s.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                        'bg-slate-100 text-slate-600'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(s.estimatedArrival).toLocaleDateString()}

                    <DeleteButton trackingNumber={s.trackingNumber} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}