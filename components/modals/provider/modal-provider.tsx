"use client";
// Cmp
import CardModal from "../card-modal";
import ProModal from "../pro-modal";
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
      <ProModal />
      <CardModal />
    </>
  );
};

export default ModalProvider;
