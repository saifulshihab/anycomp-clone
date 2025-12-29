import { API_BASE_URL } from "@/constants";
import { ISpecialistWithMediaAndOfferings } from "@/types/specialist";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  specialists: ISpecialistWithMediaAndOfferings[];
};

const SpecialistList = (props: Props) => {
  const { specialists } = props;
  return (
    <div className="my-4 grid grid-cols-4 gap-6">
      {!specialists.length ? (
        specialists.map((specialist) => {
          const thumbnailImage = specialist.media.find(
            (image) => image.display_order === 1
          );
          return (
            <div key={specialist.id}>
              <div className="relative h-62.5">
                {thumbnailImage ? (
                  <Image
                    fill
                    alt={specialist.title}
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-2xl"
                    src={`${API_BASE_URL}/uploads/${thumbnailImage.file_name}`}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-content-center rounded-2xl bg-gray-200">
                    <ImageOff className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="mt-1 space-y-1">
                <div className="h-17 space-y-1">
                  <Link href={`/specialists/${specialist.id}`}>
                    <h2 className="hover:text-primary text-lg font-bold hover:underline">
                      {specialist.title}
                    </h2>
                  </Link>
                  <p className="line-clamp-2 text-sm text-[#454545]">
                    {specialist.description}
                  </p>
                </div>
                <p className="text-lg font-bold text-[#222222]">
                  RM {specialist.base_price}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="mt-5">No specialists data found.</div>
      )}
    </div>
  );
};

export default SpecialistList;
