"use client";
// Cmp
import FormInput from "@/components/form/form-input";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { updateBoard } from "@/actions/update-board";
import { toast } from "sonner";
import { ArrowBigLeft } from "lucide-react";
// Function
import getRegularTime from "@/lib/get-regular-time";
// Hooks
import { useAction } from "@/hooks/use-action";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
// Types
import type { ElementRef } from "react";
import { Board } from "@prisma/client";

interface IBoardTitleFormProps {
  data: Board;
}
const BoardTitleForm: React.FC<IBoardTitleFormProps> = ({ data }) => {
  const [title, setTitle] = useState(data.title);
  const formRef = useRef<ElementRef<"form">>(null);
  const router = useRouter();
  const { execute, isLoading } = useAction(updateBoard, {
    onSuccess(res) {
      setTitle(res.title);
      toast.success(`Board "${res.title}" updated!`, {
        description: getRegularTime(),
      });
    },
    onError(error) {
      toast.error(error);
      setTitle(data.title);
    },
    onFieldError(error) {
      setTitle(data.title);
      toast.error(error["title"]![0]);
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const handleBlur = () => {
    formRef.current?.requestSubmit();
    setIsEditing(false);
  };
  const onSubmit = (formData: FormData) => {
    setIsEditing(false);
    if (title === data.title) return;
    const submitTitle = formData.get("title") as string;
    execute({
      title: submitTitle,
      id: data.id,
    });
  };
  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit}>
        <FormInput
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          autoFocus
          id="title"
          value={title}
          onBlur={handleBlur}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none text-foreground"
        />
      </form>
    );
  }
  return (
    <>
      <Hint descrption="Go back" sideOffset={5} asChild>
        <Button
          variant="glass"
          className="group text-background group-hover/navbar:text-foreground"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowBigLeft className="group-hover:text-primary" />
        </Button>
      </Hint>
      <Hint descrption="Double click to edit" sideOffset={5} asChild>
        <Button
          className="font-bold text-lg h-auto w-auto p-1 px-2 text-background hover:!text-primary group-hover/navbar:text-foreground"
          variant="glass"
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </Button>
      </Hint>
    </>
  );
};

export default BoardTitleForm;
