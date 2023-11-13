export const TextDescriptionCell = ({
  text,
  description,
}: {
  text: string;
  description: string;
}) => {
  return (
    <div className="pl-3">
      <div className="text-base font-semibold">{text}</div>
      <div className="font-normal text-gray-500">{description}</div>
    </div>
  );
};
