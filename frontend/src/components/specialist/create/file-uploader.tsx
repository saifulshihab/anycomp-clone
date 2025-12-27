import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import { CloudUpload, Info, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const VisuallyHiddenInput = styled("input")({
  display: "none"
});

const FileUploaderBox = styled(Box)({
  mt: 2,
  height: 140,
  border: 2,
  borderColor: "primary.main",
  borderStyle: "dashed",
  borderRadius: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
});

function FileUploaderText({ title }: { title: string }) {
  return (
    <div className="mb-1">
      <Typography variant="body2" color="#222222" fontWeight={600}>
        {title}
      </Typography>
      <div className="flex items-center gap-1">
        <Info size={12} />
        <Typography
          variant="body1"
          sx={{
            fontSize: 12,
            fontWeight: 400,
            color: "#888888"
          }}
        >
          Maximum of 1 image
        </Typography>
      </div>
    </div>
  );
}

type Props = {
  label: string;
  media?: {
    previewUrl?: string;
    file: File;
  };
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
};

function FileUploader(props: Props) {
  const { label, media, onFileChange, onDelete } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    if (fileInputRef.current === null) return;
    fileInputRef.current?.click();
  };

  return (
    <div>
      <FileUploaderText title={label} />
      {media?.previewUrl ? (
        <div className="flex h-35 items-center justify-between rounded-sm border border-gray-300 p-2 shadow">
          <div className="flex h-full gap-4">
            <div className="relative h-full w-50 max-w-50">
              <Image
                fill
                alt="media"
                src={media.previewUrl}
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Typography
                variant="body2"
                color="#222222"
                fontSize={14}
                fontWeight={600}
                sx={{ overflowWrap: "break-word", wordBreak: "break-all" }}
              >
                {media.file.name}
              </Typography>
              <div className="mt-auto">
                <Typography variant="body2" color="#888888" fontSize={12}>
                  Size: {(media.file.size / 1e6).toFixed(2)} MB
                </Typography>
                <Typography variant="body2" color="#888888" fontSize={12}>
                  File Type: {media.file.type}
                </Typography>
              </div>
            </div>
          </div>
          <IconButton size="small" color="primary" onClick={onDelete}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      ) : (
        <div>
          <FileUploaderBox onClick={onClick}>
            <div className="flex flex-col items-center justify-center gap-1">
              <CloudUpload size={48} color="#002F70" />
              <div className="bg-primary rounded-[40px] p-1 px-3 text-xs text-white">
                Browse
              </div>
            </div>
            <VisuallyHiddenInput
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
            />
          </FileUploaderBox>
          <div className="flex items-center justify-between">
            <Typography
              variant="body1"
              sx={{
                fontSize: 12,
                fontWeight: 400,
                color: "#888888"
              }}
            >
              Accepted formats: PNG, JPG, JPEG
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: 12,
                fontWeight: 400,
                color: "#888888"
              }}
            >
              Maximum file size: 4MB
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
