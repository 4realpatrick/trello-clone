"use client";
// Cmp
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from "./header";
import Description from "./description";
import Actions from "./actions";
// Hooks
import { useCardModal } from "@/hooks/use-card-modal";
import { useQuery } from "@tanstack/react-query";
// Utils
import { fetcher } from "@/lib/fetcher";
// Types
import { TCardWithList } from "@/types";
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
        {cardData ? <Header data={cardData} /> : <Header.Skeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <Description data={cardData} />
              ) : (
                <Description.Skeleton />
              )}
            </div>
          </div>
          {cardData ? <Actions data={cardData} /> : <Actions.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
