import { create } from "zustand";
interface ICardModalStore {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}
export const useCardModal = create<ICardModalStore>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen(id: string) {
    set({ isOpen: true, id });
  },
  onClose() {
    set({ isOpen: false, id: undefined });
  },
}));
