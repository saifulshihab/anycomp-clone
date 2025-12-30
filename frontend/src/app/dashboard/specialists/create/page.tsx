"use client";

import { apiErrorHandler } from "@/api/apiErrorHandler";
import {
  createSpecialistApi,
  getAllSpecialistsApi,
  publishSpecialistApi,
  uploadSpecialistMediaApi
} from "@/api/specialistApi";
import SpecialistEditDrawer from "@/components/specialist/create/edit-drawer";
import { revalidateHomePage } from "@/lib/actions";
import { ISpecialist, ISpecialistInput } from "@/types/specialist";
import { specialistValidator } from "@/validators/specialist-validator";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import { AxiosError } from "axios";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ImageUploadBoxPlaceholder = () => {
  return (
    <div className="box-border flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 bg-[#F5F5F5] p-4">
      <ImageUp size={64} color="#ddd" />
      <Typography variant="body2" color="#888" sx={{ textAlign: "center" }}>
        Upload an image for your service listing in PNG, JPG or JPEG up to 4MB
      </Typography>
    </div>
  );
};

interface IMediaFile {
  file: File;
  previewUrl: string;
}

export interface IMediaFiles {
  media1: IMediaFile;
  media2: IMediaFile;
  media3: IMediaFile;
}

const initialSpecialistInput = {
  title: undefined,
  description: undefined,
  duration_days: undefined,
  base_price: undefined,
  platform_fee: undefined,
  final_price: undefined,
  service_offerings: []
};

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [specialistInput, setSpecialistInput] = useState<ISpecialistInput>(
    initialSpecialistInput
  );
  const [formErrors, setFormErrors] = useState<any>();
  const [mediaFiles, setMediaFiles] = useState<IMediaFiles>({
    media1: { previewUrl: "", file: null as unknown as File },
    media2: { previewUrl: "", file: null as unknown as File },
    media3: { previewUrl: "", file: null as unknown as File }
  });
  const [specialists, setSpecialists] = useState<ISpecialist[]>([]);
  const [isPublishDialogOpen, setPublishConfirmationDialogOpen] =
    useState(false);

  const getAllSpecialists = useCallback(async () => {
    try {
      const { data } = await getAllSpecialistsApi({});
      setSpecialists(data.data);
    } catch (err) {
      apiErrorHandler(err as AxiosError);
    }
  }, []);

  useEffect(() => {
    getAllSpecialists();
  }, [getAllSpecialists]);

  const handleInputChange = (key: keyof ISpecialistInput, value: any) => {
    setSpecialistInput((prev) => ({
      ...prev,
      [key]: value
    }));
    setFormErrors((prev: any) => ({
      ...prev,
      [key]: null
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setMediaFiles(
      (prev) =>
        ({
          ...prev,
          [`media${order}`]: {
            previewUrl: URL.createObjectURL(file),
            file
          }
        }) as any
    );
  };

  const onFileDelete = (order: number) => {
    setMediaFiles(
      (prev) =>
        ({
          ...prev,
          [`media${order}`]: {
            previewUrl: "",
            file: null as unknown as File
          }
        }) as any
    );
  };

  const totalPrice =
    specialistInput.base_price !== undefined &&
    specialistInput.platform_fee !== undefined
      ? Number(specialistInput.base_price + specialistInput.platform_fee)
      : 0;

  const handlePublishConfirmationDialogClose = () => {
    setPublishConfirmationDialogOpen(false);
  };

  const onPublish = async () => {
    try {
      setIsSaving(true);
      // Create specialist first
      const { data } = await createSpecialistApi(specialistInput);
      const specialistId = data.id;

      // Upload specialist media
      const formData = new FormData();
      const display_order: any = {};

      if (mediaFiles.media1.file) {
        formData.append("files", mediaFiles.media1.file);
        display_order[`${mediaFiles.media1.file.name}`] = 1;
      }

      if (mediaFiles.media2.file) {
        display_order[`${mediaFiles.media2.file.name}`] = 2;
        formData.append("files", mediaFiles.media2.file);
      }

      if (mediaFiles.media3.file) {
        display_order[`${mediaFiles.media3.file.name}`] = 3;
        formData.append("files", mediaFiles.media3.file);
      }

      await uploadSpecialistMediaApi(specialistId, formData, {
        display_order: JSON.stringify(display_order)
      });
      await publishSpecialistApi(specialistId);

      setIsDrawerOpen(false);
      setPublishConfirmationDialogOpen(false);
      setSpecialistInput(initialSpecialistInput);
      toast.success("Specialist created.");
      // Redirect to all specialists page after published
      revalidateHomePage();
    } catch (err) {
      apiErrorHandler(err as AxiosError);
    } finally {
      setIsSaving(false);
    }
  };

  const onSave = async () => {
    try {
      setIsSaving(true);
      const { isValid, errors } = await specialistValidator(specialistInput);
      if (!isValid) {
        setFormErrors(errors);
        return;
      }
      setFormErrors(null);
      // Open publish confirmation dialog
      setPublishConfirmationDialogOpen(true);
    } catch (err) {
      apiErrorHandler(err as AxiosError);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          {/* Title */}
          <div className="mb-4">
            {specialistInput?.title ? (
              <Typography variant="h5" fontWeight={600}>
                {specialistInput?.title}
              </Typography>
            ) : (
              <Typography variant="h5" color="#aaaaaaff">
                Service title...
              </Typography>
            )}
          </div>
          {/* Media */}
          <Grid
            container
            spacing={2}
            justifyContent="stretch"
            alignContent="stretch"
          >
            <Grid size={6}>
              {mediaFiles.media1.previewUrl ? (
                <div className="relative h-112.5">
                  <Image
                    fill
                    alt={mediaFiles.media1.file.name}
                    src={mediaFiles.media1.previewUrl}
                    objectFit="cover"
                    objectPosition="center"
                    style={{ borderRadius: "4px" }}
                  />
                </div>
              ) : (
                <div className="box-border flex h-112.5 flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 bg-[#F5F5F5] p-4">
                  <ImageUp size={64} color="#ddd" />
                  <Typography
                    variant="body2"
                    color="#888"
                    sx={{ textAlign: "center" }}
                  >
                    Upload an image for your service listing in PNG, JPG or JPEG
                    up to 4MB
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid size={6}>
              <div className="flex h-full flex-col gap-2">
                {mediaFiles.media2.previewUrl ? (
                  <div className="relative flex-1">
                    <Image
                      fill
                      alt={mediaFiles.media2.file.name}
                      src={mediaFiles.media2.previewUrl}
                      objectFit="cover"
                      objectPosition="center"
                      style={{ borderRadius: "4px" }}
                    />
                  </div>
                ) : (
                  <ImageUploadBoxPlaceholder />
                )}
                {mediaFiles.media3.previewUrl ? (
                  <div className="relative flex-1">
                    <Image
                      fill
                      alt={mediaFiles.media3.file.name}
                      src={mediaFiles.media3.previewUrl}
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
            {specialistInput.description ? (
              <Typography variant="body2" color="#888">
                {specialistInput.description}
              </Typography>
            ) : (
              <Typography variant="body2" color="#aaaaaaff">
                Describe your service here...
              </Typography>
            )}
          </div>
        </div>
        <div className="w-100">
          <div className="flex justify-end gap-3">
            <Button
              variant="contained"
              sx={{ minWidth: 120 }}
              onClick={() => setIsDrawerOpen(true)}
            >
              Edit
            </Button>
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
                RM {specialistInput.base_price || 0}
              </Typography>
            </div>
            <div className="mt-auto">
              <div>
                <div className="flex justify-between">
                  <Typography variant="body1" fontWeight={500} color="#454545">
                    Base price
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="#222222">
                    RM {specialistInput.base_price || 0}
                  </Typography>
                </div>
                <div className="mt-1 flex justify-between">
                  <Typography variant="body1" fontWeight={500} color="#454545">
                    Platform fee
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="#222222">
                    RM {specialistInput.platform_fee || 0}
                  </Typography>
                </div>
              </div>
              <Divider sx={{ my: 2 }} />
              <div className="mt-1 flex justify-between">
                <Typography variant="body1" fontWeight={500} color="#454545">
                  Total
                </Typography>
                <Typography variant="body1" fontWeight={600} color="#222222">
                  RM {totalPrice}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SpecialistEditDrawer
        onSave={onSave}
        isSaving={isSaving}
        open={isDrawerOpen}
        mediaFiles={mediaFiles}
        formErrors={formErrors}
        specialists={specialists}
        onFileDelete={onFileDelete}
        specialistInput={specialistInput}
        handleFileChange={handleFileChange}
        handleInputChange={handleInputChange}
        onClose={() => setIsDrawerOpen(false)}
      />
      <Dialog
        open={isPublishDialogOpen}
        onClose={handlePublishConfirmationDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Publish Changes</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to publish these changes? It will appear in the
            marketplace listing.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            disabled={isSaving}
            onClick={() => {
              handlePublishConfirmationDialogClose();
            }}
          >
            Continue Editing
          </Button>
          <Button
            loading={isSaving}
            sx={{ width: 120 }}
            variant="contained"
            onClick={onPublish}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
