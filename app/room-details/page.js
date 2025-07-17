"use client";

import { useState, useEffect,Suspense } from "react";

import HotelDetails from "@/component/Bookingdetails/BookingComponent";

import { useSearchParams } from "next/navigation";
export const dynamic = 'force-dynamic';

const ContentViewPage = () => {
  const [content, setContent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => {
    if (!search) return;

    const fetchContent = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.API}/getsingleroom/${search}`
        );

        if (!response.ok) {
          throw new Error("failed to  fetch content");
        }

        const data = await response.json();

        setContent(data);
      } catch (error) {
        setError(error.message || "an error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [search]);

  if (error) {
    return <p>Error {error}</p>;
  }

  return (
    <>
 

      <HotelDetails
        content={content}
        loading={loading}
        setLoading={setLoading}
      />
     
    </>
  );
};

export default ContentViewPage;
