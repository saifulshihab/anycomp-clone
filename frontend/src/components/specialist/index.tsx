"use client";

import { API_BASE_URL } from "@/constants";
import { ISpecialistWithMediaAndOfferings } from "@/types/specialist";
import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { ImageOff } from "lucide-react";
import Image from "next/image";

const ImageUploadBoxPlaceholder = () => {
  return (
    <div className="box-border flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 bg-[#F5F5F5] p-4">
      <ImageOff size={64} color="#ddd" />
      <Typography variant="body2" color="#888" sx={{ textAlign: "center" }}>
        Image not found
      </Typography>
    </div>
  );
};

type Props = {
  isLoading?: boolean;
  specialist: ISpecialistWithMediaAndOfferings | undefined;
};

function Specialist(props: Props) {
  const { isLoading, specialist } = props;

  if (!specialist) return <div>Specialist not found.</div>;

  const thumbnailImage = specialist.media.find(
    (image) => image.display_order === 1
  );
  const secondImage = specialist.media.find(
    (image) => image.display_order === 2
  );
  const thirdImage = specialist.media.find(
    (image) => image.display_order === 3
  );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        {/* Title */}
        <div className="mb-4">
          <Typography variant="h5" fontWeight={600} color="#222222">
            {specialist.title}
          </Typography>
        </div>
        {/* Media */}
        <Grid
          container
          spacing={2}
          justifyContent="stretch"
          alignContent="stretch"
        >
          <Grid size={6}>
            {thumbnailImage ? (
              <div className="relative h-112.5">
                <Image
                  fill
                  alt={thumbnailImage.file_name}
                  src={`${API_BASE_URL}/uploads/${thumbnailImage.file_name}`}
                  objectFit="cover"
                  objectPosition="center"
                  style={{ borderRadius: "4px" }}
                />
              </div>
            ) : (
              <div className="box-border flex h-112.5 flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 bg-[#F5F5F5] p-4">
                <ImageOff size={64} color="#ddd" />
                <Typography
                  variant="body2"
                  color="#888"
                  sx={{ textAlign: "center" }}
                >
                  Image not found
                </Typography>
              </div>
            )}
          </Grid>
          <Grid size={6}>
            <div className="flex h-full flex-col gap-2">
              {secondImage ? (
                <div className="relative flex-1">
                  <Image
                    fill
                    alt={secondImage.file_name}
                    src={`${API_BASE_URL}/uploads/${secondImage.file_name}`}
                    objectFit="cover"
                    objectPosition="center"
                    style={{ borderRadius: "4px" }}
                  />
                </div>
              ) : (
                <ImageUploadBoxPlaceholder />
              )}
              {thirdImage ? (
                <div className="relative flex-1">
                  <Image
                    fill
                    alt={thirdImage.file_name}
                    src={`${API_BASE_URL}/uploads/${thirdImage.file_name}`}
                    objectFit="cover"
                    style={{ borderRadius: "4px" }}
                    objectPosition="center"
                  />
                </div>
              ) : (
                <ImageUploadBoxPlaceholder />
              )}
            </div>
          </Grid>
        </Grid>
        {/* Description */}
        <div>
          <Typography variant="h6" fontWeight={600} mt={4} mb={1}>
            Description
          </Typography>
          <Typography variant="body2" color="#888">
            {specialist.description}
          </Typography>
        </div>
        {/* Additional offerings - Service Offering Card */}
        {specialist.service_offerings &&
          specialist.service_offerings.length > 0 && (
            <div className="mt-6">
              <Typography variant="h6" fontWeight={600} mb={1}>
                Additional Offerings
              </Typography>
              <div className="flex flex-wrap gap-3">
                {specialist.service_offerings.map(({ specialist }) => (
                  <div
                    key={specialist.id}
                    className="flex max-w-xs min-w-[180px] flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {specialist.title}
                    </Typography>
                    {specialist.description && (
                      <Typography
                        variant="body2"
                        color="#666"
                        className="mt-1 line-clamp-2"
                      >
                        {specialist.description}
                      </Typography>
                    )}
                    {specialist.base_price !== undefined && (
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        className="mt-2"
                      >
                        RM {specialist.base_price}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      <div className="w-100">
        <div className="flex justify-end gap-3">
          <div className="h-10" />
        </div>
        <div className="mt-3 box-border flex h-100 flex-col rounded-lg border border-gray-300 p-5">
          <div>
            <Typography variant="h5" fontWeight={600}>
              Professional Fee
            </Typography>
            <Typography variant="body2" color="#888888">
              Set a rate for your service
            </Typography>
          </div>
          <div className="flex items-center justify-center py-5">
            <Typography
              variant="h4"
              sx={{
                mt: 3,
                mb: 1,
                fontWeight: 500,
                textDecoration: "underline"
              }}
            >
              RM {specialist.base_price || 0}
            </Typography>
          </div>
          <div className="mt-auto">
            <div>
              <div className="flex justify-between">
                <Typography variant="body1" fontWeight={500} color="#454545">
                  Base price
                </Typography>
                <Typography variant="body1" fontWeight={600} color="#222222">
                  RM {specialist.base_price || 0}
                </Typography>
              </div>
              <div className="mt-1 flex justify-between">
                <Typography variant="body1" fontWeight={500} color="#454545">
                  Platform fee
                </Typography>
                <Typography variant="body1" fontWeight={600} color="#222222">
                  RM {specialist.platform_fee || 0}
                </Typography>
              </div>
            </div>
            <Divider sx={{ my: 2 }} />
            <div className="mt-1 flex justify-between">
              <Typography variant="body1" fontWeight={500} color="#454545">
                Total
              </Typography>
              <Typography variant="body1" fontWeight={600} color="#222222">
                RM {specialist.final_price}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specialist;
