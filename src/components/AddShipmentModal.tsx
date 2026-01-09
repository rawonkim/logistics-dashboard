"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddShipmentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      trackingNumber: formData.get("trackingNumber"),
      vesselName: formData.get("vesselName"),
      clientName: formData.get("clientName"),
      originPort: formData.get("originPort"),
      destinationPort: formData.get("destinationPort"),
      status: formData.get("status"),
      estimatedArrival: formData.get("estimatedArrival"),
    };

    const res = await fetch("/api/shipments", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
      >
        + New Shipment
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl text-black">
            <h2 className="text-2xl font-bold mb-6">Add New Shipment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="trackingNumber" placeholder="Tracking Number" className="w-full p-3 border rounded-lg" required />
              <input name="vesselName" placeholder="Vessel Name (예: MSC OSCAR)" className="w-full p-3 border rounded-lg" required />
              <input name="clientName" placeholder="Client Name" className="w-full p-3 border rounded-lg" required />
              <div className="grid grid-cols-2 gap-4">
                <input name="originPort" placeholder="Origin Port" className="w-full p-3 border rounded-lg" required />
                <input name="destinationPort" placeholder="Destination Port" className="w-full p-3 border rounded-lg" required />
              </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 ml-1">Shipment Status</label>
                    <select 
                    name="status" 
                    className="w-full p-3 border rounded-lg bg-white"
                    defaultValue="PENDING"
                    required
                    >
                    <option value="PENDING">Pending (대기 중)</option>
                    <option value="IN_TRANSIT">In Transit (운송 중)</option>
                    <option value="CLEARED">Cleared (통관 완료)</option>
                    <option value="DELIVERED">Delivered (배송 완료)</option>
                    </select>
                </div>

              <input name="estimatedArrival" type="date" className="w-full p-3 border rounded-lg" required />
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}