"use client";
// Cmp
import FormInput from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, LayoutList, CalendarClock } from "lucide-react";
import { toast } from "sonner";
// Server action
import { updateCard } from "@/actions/update-card";
// Hooks
import { useAction } from "@/hooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
// Utils
import getRegularTime from "@/lib/get-regular-time";
// Types
import type { TCardWithList } from "@/types";
import type { ElementRef } from "react";
interface IHeaderProps {
  data: TCardWithList;
}
const Header: React.FC<IHeaderProps> & { Skeleton: React.FC } = ({ data }) => {
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
      originalTitle: data.title,
      title,
      boardId,
      id: data.id,
    });
  };
  return (
    <div className="mb-6 w-full">
      <div className="w-full flex items-center">
        <LayoutList className="size-4 md:size-6 text-foreground" />
        <form action={handleSubmit}>
          <FormInput
            ref={inputRef}
            autoFocus
            id="title"
            name="title"
            defaultValue={title}
            className="font-semibold !text-xl !px-1 text-primary bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-background focus-visible:border-input mb-0.5 truncate !py-0 ml-4 h-7"
            onBlur={handleBlur}
          />
        </form>
      </div>
      <p className="text-sm text-muted-foreground pl-9 mt-1">
        in list <span className="underline">{data.list.title}</span>
      </p>
      <div className="pl-9 mt-2 flex items-center">
        <CalendarDays className="size-3 md:size-4 text-foreground" />
        <span className="pl-3 text-sm text-muted-foreground">
          Created at {getRegularTime(data.createdAt)}
        </span>
      </div>
      <div className="pl-9 mt-2 flex items-center">
        <CalendarClock className="size-3 md:size-4 text-foreground" />
        <span className="pl-3 text-sm text-muted-foreground">
          Updated at {getRegularTime(data.updatedAt)}
        </span>
      </div>
    </div>
  );
};
Header.Skeleton = () => {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="size-6 mt-1 bg-neutral-100" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 mb-1 bg-neutral-200" />
        <div className="flex">
          <CalendarDays className="size-3 md:size-4 text-foreground mr-2" />
          <Skeleton className="w-full h-4 mb-1 bg-neutral-200" />
        </div>
        <div className="flex">
          <CalendarClock className="size-3 md:size-4 text-foreground mr-2" />
          <Skeleton className="w-full h-4 bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};
export default Header;
