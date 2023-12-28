"use client";
// Cmp
import { Dialog, DialogContent } from "@/components/ui/dialog";
// Hooks
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { TCardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Header, { HeaderSkeleton } from "./header";

const CardModal: React.FC = () => {
  const id = useCardModal((s) => s.id);
  const isOpen = useCardModal((s) => s.isOpen);
  const onClose = useCardModal((s) => s.onClose);
  const { data: cardData } = useQuery<TCardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
    enabled: !!id,
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <Header data={cardData} /> : <HeaderSkeleton />}
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
