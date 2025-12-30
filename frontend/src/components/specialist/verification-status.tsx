import { SpecialistVerificationStatus } from "@/types/specialist";
import { cn, snakeToPlainText } from "../../../utils";

type Props = {
  status: SpecialistVerificationStatus | undefined;
};

function SpecialistVerificationStatusBadge({ status }: Props) {
  return status && status.length ? (
    <div
      className={cn("inline-block rounded-lg px-2 py-0.5", {
        "bg-[#18C96466]": status === SpecialistVerificationStatus.APPROVED,
        "bg-[#61E7DA66]": status === SpecialistVerificationStatus.UNDER_REVIEW,
        "bg-[#C0030666]": status === SpecialistVerificationStatus.REJECTED
      })}
    >
      <span
        className={cn("text-xs font-semibold", {
          "text-[#18C964]": status === SpecialistVerificationStatus.APPROVED,
          "text-[#4bb2a8]":
            status === SpecialistVerificationStatus.UNDER_REVIEW,
          "text-[#C00306]": status === SpecialistVerificationStatus.REJECTED
        })}
      >
        {snakeToPlainText(status)}
      </span>
    </div>
  ) : null;
}

export default SpecialistVerificationStatusBadge;
