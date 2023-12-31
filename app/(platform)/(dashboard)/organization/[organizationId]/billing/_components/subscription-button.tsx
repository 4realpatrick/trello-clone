"use client";
// Cmp
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// Hooks
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
// Utils
import { stripeRedirect } from "@/actions/stripe-redirect";

interface ISubscriptionButtonProps {
  isPro: boolean;
}
const SubscriptionButton: React.FC<ISubscriptionButtonProps> = ({ isPro }) => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: toast.error,
  });
  const handleClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };
  return (
    <Button disabled={isLoading} onClick={handleClick}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};

export default SubscriptionButton;
