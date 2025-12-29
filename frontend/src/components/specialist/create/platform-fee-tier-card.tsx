import { IPlatformFeeTierResponse } from "@/api/platformFeeApi";
import { TierName } from "@/types/platform-fee";
import { ISpecialistInput } from "@/types/specialist";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography
} from "@mui/material";
import { memo } from "react";

type Props = {
  isLoading: boolean;
  specialistInput: ISpecialistInput | undefined;
  tier: IPlatformFeeTierResponse | undefined;
  error: string | undefined;
};

const PlatformFeeTierCard = memo(
  (props: Props) => {
    const { isLoading, tier, error, specialistInput } = props;

    if (!specialistInput?.base_price || specialistInput.base_price <= 0)
      return null;
    if (!tier) return null;

    const { applicable_fee_amount } = tier;
    const finalPrice = specialistInput.base_price + applicable_fee_amount;

    if (isLoading) {
      return (
        <Card className="mt-2 border border-gray-300">
          <CardContent>
            <div className="flex items-center gap-2">
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Calculating platform fee...
              </Typography>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Alert sx={{ mt: 2 }} severity="warning">
          {error}
        </Alert>
      );
    }

    const getTierColor = (tierName: TierName) => {
      switch (tierName) {
        case TierName.STARTER:
          return "#4CAF50";
        case TierName.PROFESSIONAL:
          return "#2196F3";
        case TierName.ENTERPRISE:
          return "#9C27B0";
        default:
          return "#757575";
      }
    };

    return (
      <Card className="mt-2 border border-gray-300 bg-[#fafafa]">
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <div
              className="h-2 w-2 rounded-[50%]"
              style={{ backgroundColor: getTierColor(tier.tier.tier_name) }}
            />
            <Typography variant="subtitle2" fontWeight={600}>
              Applicable Platform Fee Tier: {tier.tier.tier_name}
            </Typography>
          </Box>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <Typography variant="body2" color="text.secondary">
                Base Price:
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                RM {specialistInput.base_price.toFixed(2)}
              </Typography>
            </div>

            <div className="flex justify-between">
              <Typography variant="body2" color="text.secondary">
                Platform Fee ({tier.tier.platform_fee_percentage}%):
              </Typography>
              <Typography variant="body2" fontWeight={500} color="primary">
                RM {applicable_fee_amount.toFixed(2)}
              </Typography>
            </div>

            <div className="bt-1 mt-0.5 flex justify-between border-gray-300 pt-1">
              <Typography variant="body2" fontWeight={600}>
                Final Price:
              </Typography>
              <Typography variant="body2" fontWeight={600} color="primary">
                RM {finalPrice.toFixed(2)}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
  (prev, next) => {
    if (
      JSON.stringify(prev.tier) === JSON.stringify(next.tier) &&
      prev.isLoading === next.isLoading
    ) {
      return true;
    }
    return false;
  }
);

PlatformFeeTierCard.displayName = "PlatformFeeTierCard";
export default PlatformFeeTierCard;
