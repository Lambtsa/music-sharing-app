import { SearchInputType } from "@customTypes";
import { useTranslation } from "@hooks/useTranslation";
import { Dispatch, SetStateAction, useMemo } from "react";
import {
  ButtonText,
  SelectorButton,
  SelectorContainer,
} from "./Selector.styles";

interface SelectorProps {
  isLight: boolean;
  selected: SearchInputType;
  setSelected: Dispatch<SetStateAction<SearchInputType>>;
}

export const Selector = ({
  isLight,
  selected,
  setSelected,
}: SelectorProps): JSX.Element => {
  const { t } = useTranslation();

  const options = useMemo((): SearchInputType[] => {
    return ["artist", "track", "url"];
  }, []);

  const handleOnClick = (input: SearchInputType) => {
    setSelected(input);
  };

  const hasOptions = !!options.length;

  return (
    <SelectorContainer>
      {hasOptions &&
        options.map((option) => (
          <SelectorButton
            key={option}
            data-test={`selector-${option}`}
            type="button"
            isSelected={selected === option}
            isLight={isLight}
            onClick={() => handleOnClick(option)}
          >
            <ButtonText isSelected={selected === option} isLight={isLight}>
              {t({ id: `label.${option}` })}
            </ButtonText>
          </SelectorButton>
        ))}
    </SelectorContainer>
  );
};
