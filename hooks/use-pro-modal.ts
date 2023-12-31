import { create } from "zustand";
interface IProModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useProModal = create<IProModalStore>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen() {
    set({ isOpen: true });
  },
  onClose() {
    set({ isOpen: false });
  },
}));
