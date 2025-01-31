import MugCard, { Mug } from "./MugCard";

const MugGrid = ({ mugs }: { mugs: Mug[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mugs.map((mug) => (
        <MugCard key={mug.id} mug={mug} />
      ))}
    </div>
  );
};

export default MugGrid;