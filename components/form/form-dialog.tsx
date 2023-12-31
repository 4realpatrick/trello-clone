"use client";
// Cmp
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormPicker from "./form-picker";
import { toast } from "sonner";
import FormInput from "./form-input";
import FormSubmit from "./form-submit";
// Hooks
import { useAction } from "@/hooks/use-action";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
// Server action
import { createBoard } from "@/actions/create-board";
// Function
import getRegularTime from "@/lib/get-regular-time";

interface IFormDialogProps {
  children: React.ReactNode;
}
const FormDialog: React.FC<IFormDialogProps> = ({ children }) => {
  const router = useRouter();
  const proModal = useProModal();
  const { execute, resetError, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      toast.success("Board created", {
        duration: 3000,
        description: getRegularTime(),
        onAutoClose(toast) {
          router.push(`/board/${data.id}`);
        },
      });
    },
    onError(error) {
      toast.error(error);
      proModal.onOpen();
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };
  return (
    <Dialog onOpenChange={resetError}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create board</DialogTitle>
          <DialogDescription>
            A board require a title and background, Click create when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" action={onSubmit}>
          <FormPicker id="image" errors={fieldErrors} />
          <FormInput
            id="title"
            label="Board title"
            type="text"
            errors={fieldErrors}
            className="w-full"
          />
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
