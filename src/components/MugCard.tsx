import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface Mug {
  id: string;
  name: string;
  year: number;
  image: string;
  rarity: "Common" | "Rare" | "Ultra Rare";
  price: number;
}

const MugCard = ({ mug }: { mug: Mug }) => {
  const rarityColors = {
    Common: "bg-gray-200 text-gray-800",
    Rare: "bg-primary text-white",
    "Ultra Rare": "bg-accent text-white",
  };

  // Clean up the image path and ensure it starts with /mug_images/
  const imagePath = mug.image.includes('mug_images') ? mug.image : `/mug_images/${mug.image.split('/').pop()}`;

  return (
    <Link to={`/mug/${mug.id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={imagePath}
            alt={mug.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              console.error('Image failed to load:', imagePath);
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-foreground">{mug.name}</h3>
            <Badge className={rarityColors[mug.rarity]}>{mug.rarity}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Year: {mug.year}</span>
            <span className="font-medium text-primary">${mug.price}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MugCard;