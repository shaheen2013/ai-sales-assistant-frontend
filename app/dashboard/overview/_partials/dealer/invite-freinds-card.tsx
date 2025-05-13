import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';

const InviteFreindsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-400">
          Invite Your Friends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-stretch w-full">
          <div className="flex-1">
            <Input placeholder="Enter email" />
          </div>
          <Button variant={'primary'}>Submit</Button>
        </div>
        <h5 className="text-base font-semibold text-gray-400 mt-4">
          Share The Referral Link
        </h5>
        <div className="flex gap-4 items-center mt-4 w-full">
          <div className="flex-1">
            <Input placeholder="tezzai.com/?ref=6479" />
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Button className="border border-primary-500" variant={'outline'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M15.75 9.73242C16.1297 9.73242 16.4435 10.0146 16.4932 10.3807L16.5 10.4824V15.7324C16.5 17.195 15.3583 18.3908 13.9175 18.4774L13.75 18.4824H6.25C4.78747 18.4824 3.5916 17.3407 3.50502 15.8999L3.5 15.7324V10.4824C3.5 10.0682 3.83579 9.73242 4.25 9.73242C4.6297 9.73242 4.94349 10.0146 4.99315 10.3807L5 10.4824V15.7324C5 16.3796 5.49187 16.912 6.12219 16.976L6.25 16.9824H13.75C14.3972 16.9824 14.9295 16.4905 14.9935 15.8602L15 15.7324V10.4824C15 10.0682 15.3358 9.73242 15.75 9.73242ZM5.22703 6.94473L9.46967 2.70209C9.73594 2.43583 10.1526 2.41162 10.4462 2.62947L10.5303 2.70209L14.773 6.94473C15.0659 7.23763 15.0659 7.7125 14.773 8.00539C14.5067 8.27166 14.09 8.29587 13.7964 8.07801L13.7123 8.00539L10.75 5.04242V12.7324C10.75 13.1121 10.4678 13.4259 10.1018 13.4756L10 13.4824C9.6203 13.4824 9.30651 13.2003 9.25685 12.8342L9.25 12.7324V5.04242L6.28769 8.00539C6.02142 8.27166 5.60476 8.29587 5.31115 8.07801L5.22703 8.00539C4.96076 7.73913 4.93656 7.32246 5.15441 7.02885L5.22703 6.94473L9.46967 2.70209L5.22703 6.94473Z"
                  fill="#019935"
                />
              </svg>
            </Button>
            <div className="size-10 cursor-pointer rounded-md border flex items-center justify-center">
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Social icon" clip-path="url(#clip0_2210_7909)">
                  <path
                    id="Vector"
                    d="M21.909 11.4833C21.909 5.45838 17.0248 0.574219 10.9999 0.574219C4.97498 0.574219 0.0908203 5.45838 0.0908203 11.4833C0.0908203 16.9283 4.0801 21.4415 9.29537 22.2599V14.6367H6.52548V11.4833H9.29537V9.0799C9.29537 6.34581 10.9241 4.83558 13.4159 4.83558C14.6091 4.83558 15.8579 5.04865 15.8579 5.04865V7.73331H14.4823C13.1272 7.73331 12.7045 8.57429 12.7045 9.43786V11.4833H15.73L15.2464 14.6367H12.7045V22.2599C17.9197 21.4415 21.909 16.9283 21.909 11.4833Z"
                    fill="#1877F2"
                  />
                  <path
                    id="Vector_2"
                    d="M15.2463 14.6351L15.7299 11.4817H12.7044V9.43626C12.7044 8.57354 13.1271 7.73171 14.4822 7.73171H15.8578V5.04705C15.8578 5.04705 14.6094 4.83398 13.4158 4.83398C10.924 4.83398 9.29528 6.34421 9.29528 9.0783V11.4817H6.52539V14.6351H9.29528V22.2583C10.4248 22.435 11.5749 22.435 12.7044 22.2583V14.6351H15.2463Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2210_7909">
                    <rect
                      width="21.8182"
                      height="21.8182"
                      fill="white"
                      transform="translate(0.0908203 0.574219)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="size-10 cursor-pointer rounded-md border flex items-center justify-center">
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Social icon" clip-path="url(#clip0_2210_7913)">
                  <path
                    id="Vector"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.5871 21.4824L9.54221 14.2916L3.22659 21.4824H0.554688L8.3568 12.6016L0.554688 1.48242H7.41464L12.1694 8.25971L18.127 1.48242H20.7989L13.3588 9.95195L21.4471 21.4824H14.5871ZM17.5626 19.4552H15.7638L4.38046 3.50969H6.17954L10.7386 9.89439L11.527 11.0023L17.5626 19.4552Z"
                    fill="#242E36"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2210_7913">
                    <rect
                      width="21.8182"
                      height="21.8182"
                      fill="white"
                      transform="translate(0.0908203 0.574219)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteFreindsCard;
