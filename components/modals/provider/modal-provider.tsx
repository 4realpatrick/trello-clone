"use client";
// Cmp
import CardModal from "../card-modal";
//Hooks
import { useEffect, useState } from "react";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CardModal />
    </>
  );
};

export default ModalProvider;
