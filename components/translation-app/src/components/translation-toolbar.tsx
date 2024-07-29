import { Button, Icon, Label, Checkbox } from '@crystallize/design-system';
import { useState } from 'react';
import Dropdown from './dropdown';
import type { Preferences } from '../use-cases/contracts/types';
import { useLocation, useNavigate } from '@remix-run/react';

type TranslationToolbarProps = {
    availableLanguages: { code: string; name: string }[];
    fromLanguage: string;
    toLanguage: string | null;
    onTranslate: ({
        shouldPushTranslationToDraft,
        shouldIncludeAllVariants,
        customPromptFromUser,
    }: Preferences) => void;
};

export function TranslationToolbar({
    fromLanguage,
    toLanguage,
    availableLanguages,
    onTranslate,
}: TranslationToolbarProps) {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();

    const selected = availableLanguages.find((lang) => lang.code === toLanguage);
    const [preferences, setPreferences] = useState({
        shouldPushTranslationToDraft: true,
        shouldIncludeAllVariants: false,
        customPromptFromUser: '',
    });

    return (
        <div className="border-solid bg-cyan-50 shadow-md shadow-cyan-500 rounded-md overflow-hidden">
            <div className="border-0 border-b border-green-200 flex justify-between items-center pr-6">
                <input
                    value={preferences.customPromptFromUser}
                    className="pl-6 py-4 pt-6 w-full bg-[transparent] placeholder:italic outline-none focus:bg-[#fff]"
                    placeholder="Add your own twist, i.e speak like a pirate (optional)."
                    onChange={(e) =>
                        setPreferences((prev) => ({
                            ...prev,
                            customPromptFromUser: e.target.value,
                        }))
                    }
                />
                <div className="flex gap-8 pl-6">
                    <Button
                        intent="action"
                        onClick={() => onTranslate(preferences)}
                        prepend={<Icon.Language width={20} height={20} />}
                        disabled={toLanguage ? false : true}
                    >
                        Translate
                    </Button>
                </div>
            </div>
            <div className="flex flex-row px-6 py-2 flex-wrap gap-y-6">
                <div className="flex flex-row gap-2 items-center pr-4 ">
                    <div>
                        <Dropdown
                            options={availableLanguages}
                            buttonText="Select language"
                            selectedOption={fromLanguage}
                            onSelectOption={(code) => {
                                const query = new URLSearchParams(search);
                                query.set('fromLanguage', code);
                                navigate(`${pathname}?${query.toString()}`);
                            }}
                        />
                    </div>
                    <span>to </span>
                    <div className="flex items-center gap-4">
                        <Dropdown
                            options={availableLanguages}
                            selectedOption={toLanguage ?? undefined}
                            buttonText="Select language"
                            onSelectOption={(code) => {
                                const query = new URLSearchParams(search);
                                query.set('toLanguage', code);
                                navigate(`${pathname}?${query.toString()}`);
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-8">
                    <Label className="text-xs whitespace-nowrap flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            checked={preferences.shouldPushTranslationToDraft}
                            onCheckedChange={(value: boolean) =>
                                setPreferences((prev) => ({
                                    ...prev,
                                    shouldPushTranslationToDraft: value,
                                }))
                            }
                        />
                        Add all translations to {selected ? `${selected.name}` : ''} draft
                    </Label>
                    <Label className="text-xs  whitespace-nowrap  flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            checked={preferences.shouldIncludeAllVariants}
                            onCheckedChange={(value: boolean) =>
                                setPreferences((prev) => ({
                                    ...prev,
                                    shouldIncludeAllVariants: value,
                                }))
                            }
                        />
                        Include all variants
                    </Label>
                </div>
            </div>
        </div>
    );
}
