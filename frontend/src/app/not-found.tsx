import { SearchAlert } from "lucide-react";

function Page() {
  return (
    <div className="h-full grid place-content-center place-items-center">
      <div className="flex gap-2 items-center flex-col">
        <SearchAlert />
        <p>
          <span className="font-extrabold">404</span> | Page Not Found
        </p>
      </div>
    </div>
  );
}

export default Page;
