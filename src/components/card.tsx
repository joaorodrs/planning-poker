import { twMerge } from "tailwind-merge";

type Props = {
  value?: number;
  isSelected: boolean;
  onSelectCard(value?: number): void;
  isDisabled: boolean;
  className?: string;
}

const Card = ({ value, isSelected, isDisabled, onSelectCard, className }: Props) => {
  const onCardClick = () => {
    if (isDisabled) return;

    onSelectCard(value)
  }

  return (
    <div role="button" data-is-selected={isSelected} data-is-disabled={isDisabled} onClick={onCardClick} className={twMerge("flex flex-col p-2 justify-between bg-white w-16 h-28 rounded-lg text-black text-[10px] m-2 cursor-pointer transition-all data-[is-selected=true]:scale-110 select-none data-[is-disabled=true]:cursor-auto data-[is-disabled=true]:bg-slate-700 data-[is-selected=true]:bg-primary-300", className)}>
      <div className="flex">
        <span>{value || '?'}</span>
      </div>
      <span className="text-3xl">{value || '?'}</span>
      <div className="flex justify-end">
        <span>{value || '?'}</span>
      </div>
    </div>
  )
}

export default Card
