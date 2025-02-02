import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import mugsData from "../../muminmuggar.csv?raw";

// Reuse the parsing logic from Index.tsx
const parseCSV = (csvText: string) => {
  const [headers, ...rows] = csvText.split('\n').filter(row => row.trim());
  const headerColumns = headers.split(',');
  
  return rows.map(row => {
    const values = row.split(',');
    return headerColumns.reduce((obj: any, header, index) => {
      obj[header] = values[index] || '';
      return obj;
    }, {});
  });
};

const parsedMugs = parseCSV(mugsData);

const MugDetail = () => {
  const { id } = useParams();
  console.log("Mug ID:", id);
  console.log("Total mugs:", parsedMugs.length);

  // Find the mug by its muggnummer (mug number) instead of array index
  const mug = parsedMugs.find(m => m.muggnummer === id);
  console.log("Selected mug:", mug);

  if (!mug) {
    return <div className="container py-8">Mug not found</div>;
  }

  const determineRarity = (yearString: string): "Common" | "Rare" | "Ultra Rare" => {
    // Extract the first year if there's a range (e.g., "2019-2022" -> "2019")
    const year = parseInt(yearString.split('–')[0]);
    
    if (isNaN(year)) return "Common"; // Default to Common if year can't be parsed
    if (year < 2000) return "Ultra Rare";
    if (year < 2015) return "Rare";
    return "Common";
  };

  const determinePrice = (yearString: string): number => {
    const year = parseInt(yearString.split('–')[0]);
    
    if (isNaN(year)) return 79.99; // Default price if year can't be parsed
    if (year < 2000) return 299.99;
    if (year < 2015) return 149.99;
    return 79.99;
  };

  const rarity = determineRarity(mug.tillverkad || '');
  const price = determinePrice(mug.tillverkad || '');

  const rarityColors = {
    Common: "bg-gray-200 text-gray-800",
    Rare: "bg-primary text-white",
    "Ultra Rare": "bg-accent text-white",
  };

  // Extract just the filename from the path
  const imageName = mug.bildfil?.split('/').pop() || '';

  return (
    <div className="container py-8">
      <Card className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="aspect-square overflow-hidden bg-muted rounded-lg">
            <img
              src={imageName ? `/mug_images/${imageName}` : '/placeholder.svg'}
              alt={mug.namn || 'Moomin mug'}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image failed to load:', imageName);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-foreground">{mug.namn || 'Unknown name'}</h1>
              <Badge className={rarityColors[rarity]}>{rarity}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">Year: {mug.tillverkad || 'Unknown'}</p>
              <p className="text-lg text-muted-foreground">Designer: {mug.designer || 'Unknown'}</p>
              <p className="text-lg text-muted-foreground">Material: {mug.material || 'Unknown'}</p>
              <p className="text-lg text-muted-foreground">Weight: {mug.vikt || 'Unknown'}</p>
              <p className="text-lg text-muted-foreground">Volume: {mug.volym || 'Unknown'}</p>
              <p className="text-2xl font-bold text-primary mt-4">${price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MugDetail;