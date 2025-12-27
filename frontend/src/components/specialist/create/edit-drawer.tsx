import { IMediaFiles } from "@/app/dashboard/specialists/create/page";
import { TSpecialist } from "@/types";
import { ISpecialistInput } from "@/types/specialist";
import {
  Autocomplete,
  Button,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { Save, X } from "lucide-react";
import { ChangeEvent } from "react";
import FileUploader from "./file-uploader";

type Props = {
  open: boolean;
  specialistInput: ISpecialistInput | undefined;
  mediaFiles: IMediaFiles;
  onClose: () => void;
  specialists: TSpecialist[];
  onFileDelete: (order: number) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, order: number) => void;
  handleInputChange: (key: keyof ISpecialistInput, value: any) => void;
};

function SpecialistEditDrawer(props: Props) {
  const {
    open,
    onClose,
    mediaFiles,
    onFileDelete,
    handleFileChange,
    specialistInput,
    handleInputChange,
    specialists
  } = props;

  const specialistsOptions = specialists.map((item) => ({
    id: item.id,
    title: item.title
  }));

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="flex w-125 flex-col gap-6 p-4">
        <div className="flex justify-between">
          <Typography variant="h5" fontWeight={600}>
            Edit Service
          </Typography>
          <IconButton onClick={onClose}>
            <X size={20} />
          </IconButton>
        </div>
        <div>
          <Typography variant="body2" color="#222222" fontWeight={600}>
            Title
          </Typography>
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            value={specialistInput?.title}
            variant="outlined"
            placeholder="Enter service title"
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
        <div>
          <Typography variant="body2" color="#222222" fontWeight={600}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Enter service description"
            value={specialistInput?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            sx={{ mt: 1 }}
          />
        </div>
        <div>
          <Typography variant="body2" color="#222222" fontWeight={600}>
            Estimated Completion Times (Days)
          </Typography>
          <FormControl fullWidth>
            <Select
              id="completion-time-select"
              label="Age"
              sx={{ mt: 1 }}
              value={specialistInput?.duration_days}
              onChange={(e) =>
                handleInputChange("duration_days", e.target.value)
              }
            >
              <MenuItem value={1}>1 day</MenuItem>
              <MenuItem value={2}>2 days</MenuItem>
              <MenuItem value={3}>3 days</MenuItem>
              <MenuItem value={4}>4 days</MenuItem>
              <MenuItem value={5}>5 days</MenuItem>
              <MenuItem value={6}>6 days</MenuItem>
              <MenuItem value={7}>7 days</MenuItem>
              <MenuItem value={8}>8 days</MenuItem>
              <MenuItem value={9}>9 days</MenuItem>
              <MenuItem value={10}>10 days</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Media 1 */}
        <FileUploader
          media={mediaFiles.media1}
          label="Service - Image (1st)"
          onFileChange={(e) => handleFileChange(e, 1)}
          onDelete={() => onFileDelete(1)}
        />
        <FileUploader
          media={mediaFiles.media2}
          label="Service - Image (2nd)"
          onFileChange={(e) => handleFileChange(e, 2)}
          onDelete={() => onFileDelete(2)}
        />
        <FileUploader
          media={mediaFiles.media3}
          label="Service - Image (3rd)"
          onFileChange={(e) => handleFileChange(e, 3)}
          onDelete={() => onFileDelete(3)}
        />
        <div>
          <Typography variant="body2" color="#222222" fontWeight={600}>
            Additional Offerings
          </Typography>
          <FormControl fullWidth hiddenLabel sx={{ mt: 1 }}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={specialistsOptions}
              getOptionLabel={(option) => option.title}
              value={specialistInput?.additional_offers}
              onChange={(_, value) => {
                handleInputChange("additional_offers", value);
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select additional offers" />
              )}
            />
          </FormControl>
        </div>
        <div>
          <Typography variant="body2" color="#222222" fontWeight={600}>
            Base Price
          </Typography>
          <Input
            type="number"
            fullWidth
            sx={{
              border: 1,
              borderColor: "divider",
              p: 2,
              px: 3,
              borderRadius: 1,
              mt: 1
            }}
            placeholder="Enter base price"
            value={specialistInput?.base_price}
            onChange={(e) => {
              let num;
              if (e.target.value !== undefined) {
                num = Number(e.target.value);
              }
              handleInputChange("base_price", num);
            }}
          />
        </div>
        {/* Save button */}
        <Divider />
        <div className="flex justify-end">
          <div className="flex items-center gap-3">
            <Button onClick={onClose} variant="outlined" sx={{ width: 120 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<Save size={16} />}
              sx={{ width: 120 }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SpecialistEditDrawer;
