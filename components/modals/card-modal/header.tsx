"use client";
import { updateCard } from "@/actions/update-card";
import FormInput from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import getRegularTime from "@/lib/get-regular-time";
import { TCardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutList } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
interface IHeaderProps {
  data: TCardWithList;
}
const Header: React.FC<IHeaderProps> = ({ data }) => {
  const { execute } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Renamed to "${data.title}"`, {
        description: getRegularTime(),
      });
      setTitle(data.title);
    },
    onError: toast.error,
  });
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.title);
  const handleBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    if (title === data.title) {
      return;
    }
    execute({
      title,
      boardId,
      id: data.id,
    });
  };
  return (
    <div className="mb-6 w-full">
      <div className="w-full flex items-center">
        <LayoutList className="size-5 text-neutral-700" />
        <form action={handleSubmit}>
          <FormInput
            ref={inputRef}
            autoFocus
            id="title"
            name="title"
            defaultValue={title}
            className="font-semibold !text-xl !px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-background focus-visible:border-input mb-0.5 truncate !py-0 ml-4 h-7"
            onBlur={handleBlur}
          />
        </form>
      </div>
      <p className="text-sm text-muted-foreground pl-9">
        in list <span className="underline">{data.list.title}</span>
      </p>
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="size-6 mt-1 bg-neutral-100" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
export default Header;
