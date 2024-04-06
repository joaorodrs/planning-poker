type Props = {
  value?: number;
  isSelected: boolean;
  onSelectCard(value?: number): void;
}

const Card = ({ value, isSelected, onSelectCard }: Props) => {
  return (
    <div data-isSelected={isSelected} onClick={() => onSelectCard(value)} className="flex flex-col p-2 justify-between bg-white w-16 h-28 rounded-lg text-black text-xs m-2 data-[isSelected=true]:bg-primary-300 cursor-pointer transition-all data-[isSelected=true]:scale-110">
      <div className="flex">
        <span>{value || '?'}</span>
      </div>
      <span className="text-4xl">{value || '?'}</span>
      <div className="flex justify-end">
        <span>{value || '?'}</span>
      </div>
    </div>
  )
}

export default Card
