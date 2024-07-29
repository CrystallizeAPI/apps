import { Button, DropdownMenu, Icon } from '@crystallize/design-system';

type DropdownProps = {
    options: { name: string; code: string }[];
    onSelectOption: (code: string) => void;
    buttonText: string;
    selectedOption?: string;
};

const DropdownContent = ({ options, onSelectOption }: Pick<DropdownProps, 'options' | 'onSelectOption'>) => (
    <div className="shadow bg-[#fff] w-[150px] rounded-md py-1 flex flex-col">
        {options.map((option) => {
            return (
                <DropdownMenu.Item
                    key={option.code}
                    onSelect={() => onSelectOption(option.code)}
                    className="font-medium px-2 py-1 text-sm text-center cursor-pointer"
                >
                    {option.name} ({option.code})
                </DropdownMenu.Item>
            );
        })}
    </div>
);

function Dropdown({ options, selectedOption, onSelectOption, buttonText }: DropdownProps) {
    const selected = options.find((opt) => opt.code === selectedOption);

    return (
        <div>
            <DropdownMenu.Root content={<DropdownContent options={options} onSelectOption={onSelectOption} />}>
                <Button append={<Icon.Arrow />} variant="elevate">
                    <span className="min-w-[100px]">
                        {selected ? (
                            <span>
                                {selected.name} ({selected.code})
                            </span>
                        ) : (
                            <span className="italic font-normal mx-2">{buttonText}</span>
                        )}
                    </span>
                </Button>
            </DropdownMenu.Root>
        </div>
    );
}

export default Dropdown;
