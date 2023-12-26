"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormPicker from "./form-picker";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { REGULAR_TYPE_TIME } from "@/constant/time";
import { useRouter } from "next/navigation";
import FormInput from "./form-input";
import FormSubmit from "./form-submit";

interface IFormDialogProps {
  children: React.ReactNode;
}
const FormDialog: React.FC<IFormDialogProps> = ({ children }) => {
  const router = useRouter();
  const { execute, resetError, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      toast.success("Board created", {
        duration: 3000,
        description: REGULAR_TYPE_TIME,
        onAutoClose(toast) {
          router.push(`/board/${data.id}`);
        },
      });
    },
    onError(error) {
      toast.error(error);
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
            A board require a title and background, Click create when you're
            done.
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
