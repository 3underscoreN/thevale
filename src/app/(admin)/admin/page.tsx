"use client";

import React from "react";

import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <Button variant="outline" className="mt-4" onClick={() => fetch("/api/admin/test")}>
        Fetch from API
      </Button>
    </div>
  );
}