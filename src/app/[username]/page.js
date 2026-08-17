import React from "react";
import PaymentPage from "../components/PaymentPage";

export const dynamic = "force-dynamic";

const Username = async ({ params }) => {
  const { username } = await params;
  return (
    <>
      <PaymentPage username={username} />
    </>
  );
};

export default Username;
