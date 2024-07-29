import { IconButton, Icon, Tooltip } from '@crystallize/design-system';
export const CopyButton = ({ text, variant = 'default' }: { text: string; variant?: 'elevate' | 'default' }) => {
    const handleCopy = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Tooltip content="Copy to clipboard">
            <IconButton className="!w-7 !h-7" variant={variant} onClick={handleCopy}>
                <Icon.Copy width="20" height="20" />
            </IconButton>
        </Tooltip>
    );
};
