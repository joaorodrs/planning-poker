import Card from "./card"

type Props = {
  cardSelected?: number;
  onSelectCard(value?: number): void;
  isDisabled: boolean;
}

const Deck = ({ cardSelected, isDisabled, onSelectCard }: Props) => {
  return (
    <div className="mt-20 pb-10">
      <h1 className="mb-4">Escolha seu card</h1>

      <div className="flex flex-wrap justify-center">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30].map(item => (
          <Card
            key={String(item)}
            value={item}
            isSelected={item === cardSelected}
            onSelectCard={onSelectCard}
            isDisabled={isDisabled}
          />
        ))}
      </div>
    </div>
  )
}

export default Deck
