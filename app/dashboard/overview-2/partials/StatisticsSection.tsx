import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

export default function StatisticsSection() {
  return (
    <div className="border rounded-xl p-4">
      {/* top */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-gray-500 text-xl font-semibold">
            Support Statistic
          </h2>
          <h4 className="text-gray-300 text-base">
            All transactions are secure and encrypted
          </h4>
        </div>

        <div>
          <Select defaultValue="last-week">
            <SelectTrigger
              className="w-[130px] text-primary-500 font-medium"
              postIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M2.21967 6.7724C2.51256 6.47951 2.98744 6.47951 3.28033 6.7724L10 13.4921L16.7197 6.7724C17.0126 6.47951 17.4874 6.47951 17.7803 6.7724C18.0732 7.0653 18.0732 7.54017 17.7803 7.83306L10.5303 15.0831C10.2374 15.376 9.76256 15.376 9.46967 15.0831L2.21967 7.83306C1.92678 7.54017 1.92678 7.0653 2.21967 6.7724Z"
                    fill="#019935"
                  />
                </svg>
              }
            >
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="last-week">Last Week</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <hr />

      {/* content */}
    </div>
  );
}
