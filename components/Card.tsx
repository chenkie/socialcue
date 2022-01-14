interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps) => {
  return (
    <div className="rounded-xl bg-white px-6 py-4 shadow my-4">
      {props.children}
    </div>
  );
};

export default Card;
