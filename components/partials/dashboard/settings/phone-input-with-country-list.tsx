import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { Button } from '@/components/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn/command';
import { Input } from '@/components/shadcn/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/popover';
import { ScrollArea } from '@/components/shadcn/scroll-area';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value' | 'ref'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, defaultCountry = 'US', ...props }, ref) => {
      // Track if this is the first render
      const isFirstRender = React.useRef(true);

      // Only set default country code on first render if no value is provided
      React.useEffect(() => {
        // If there's already a value from the API, don't override it
        if (isFirstRender.current && !value) {
          const countryCode = `+${RPNInput.getCountryCallingCode(
            defaultCountry
          )}`;
          onChange?.(countryCode as RPNInput.Value);
        }
        isFirstRender.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      // Handle country selection and value changes
      const handleChange = (newValue: RPNInput.Value) => {
        // If input is empty or just has a plus, use the default country code
        if (!newValue || newValue === '+') {
          const countryCode = `+${RPNInput.getCountryCallingCode(
            defaultCountry
          )}`;
          onChange?.(countryCode as RPNInput.Value);
          return;
        }

        onChange?.(newValue || ('' as RPNInput.Value));
      };

      return (
        <RPNInput.default
          ref={ref}
          className={cn('flex', className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          onChange={handleChange}
          value={value}
          defaultCountry={defaultCountry}
          international
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <div className="w-full">
    <Input
      className={cn(
        'rounded-e-md rounded-s-none focus:border-primary-500',
        className
      )}
      {...props}
      ref={ref}
    />
  </div>
));
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 rounded-e-none rounded-s-md border-r-0 px-3 focus:z-10 focus:border-primary-500"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              '-mr-2 size-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={(country) => {
                        onChange(country);
                        setOpen(false); // Close the popover after selection
                      }}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem
      className="gap-2 cursor-pointer"
      onSelect={() => onChange(country)}
      value={`${country}-${countryName}`} // Ensure unique value for better selection
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(
        country
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
