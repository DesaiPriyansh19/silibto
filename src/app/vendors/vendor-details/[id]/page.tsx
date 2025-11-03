"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import VendorDetails from "@/components/VendorDetails";


export default function VendorDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const vendorId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!vendorId) return <div>Vendor ID not found</div>;

  return (
    <VendorDetails
      vendorId={vendorId}
      onClose={() => router.push("/vendors/vendor-list")}
    />
  );
}
