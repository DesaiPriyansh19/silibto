"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import UserDetails from "@/components/UserDetails";


export default function UserDetailsPage() {
const params = useParams();
const router = useRouter();

const userId = Array.isArray(params.id) ? params.id[0] : params.id;

if (!userId) return <div>User ID not found</div>;

return <UserDetails userId={userId} onClose={() => router.push("/users-permissions/user-management")} />;

}
