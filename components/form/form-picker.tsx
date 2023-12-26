"use client";
// Cmp
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
// Hooks
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
// Utils
import { cn } from "@/lib/utils";
// Api
import { unsplash } from "@/lib/unsplash";
import { defaultImages } from "@/constant/images";
import Link from "next/link";
import FormErrors from "./form-errors";
// Types
interface IFormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
const FormPicker: React.FC<IFormPickerProps> = ({ id, errors }) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectImageId] = useState(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);
  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="size-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="relaive">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((img) => (
          <div
            key={img.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectImageId(img.id);
            }}
          >
            <input
              readOnly
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === img.id}
              disabled={pending}
              value={`${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`}
            />
            <Image
              sizes="(min-width: 768px) 45px 25px, (max-width: 1200px) 90px 50px"
              fill
              alt="Unsplash image"
              className="object-cover rounded-sm"
              src={img.urls.thumb}
            />
            {selectedImageId === img.id && (
              <div className="absolute inset-y-0 size-full bg-neutral-950/30 flex items-center justify-center rounded-sm">
                <Check className="size-4 text-white" />
              </div>
            )}
            <Link
              href={img.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate hover:underline p-1 bg-background/50 text-primary"
            >
              {img.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors errors={errors} id="image" />
    </div>
  );
};

export default FormPicker;
