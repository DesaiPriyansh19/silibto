"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import ClientDetails from "@/components/ClientDetails"; // correct import

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // ensure we have a single string ID
  const clientId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!clientId) return <div>Client ID not found</div>;

  return (
    <ClientDetails
      clientId={clientId}       // pass the clientId prop
      onClose={() => router.push("/clients/client-list")}  // go back to client table
    />
  );
}
