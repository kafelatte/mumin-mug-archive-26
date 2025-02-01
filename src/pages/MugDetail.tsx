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
      obj[header] = values[index];
      return obj;
    }, {});
  });
};

const parsedMugs = parseCSV(mugsData);

const MugDetail = () => {
  const { id } = useParams();
  console.log("Mug ID:", id);
  console.log("Total mugs:", parsedMugs.length);

  const mug = parsedMugs[Number(id) - 1];
  console.log("Selected mug:", mug);

  if (!mug) {
    return <div className="container py-8">Mug not found</div>;
  }

  const determineRarity = (year: number): "Common" | "Rare" | "Ultra Rare" => {
    if (year < 2000) return "Ultra Rare";
    if (year < 2015) return "Rare";
    return "Common";
  };

  const determinePrice = (year: number): number => {
    if (year < 2000) return 299.99;
    if (year < 2015) return 149.99;
    return 79.99;
  };

  const year = parseInt(mug.tillverkad.split('–')[0]);
  const rarity = determineRarity(year);
  const price = determinePrice(year);

  const rarityColors = {
    Common: "bg-gray-200 text-gray-800",
    Rare: "bg-primary text-white",
    "Ultra Rare": "bg-accent text-white",
  };

  return (
    <div className="container py-8">
      <Card className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="aspect-square overflow-hidden bg-muted rounded-lg">
            <img
              src={`/mug_images/${mug.bildfil.split('/').pop()}`}
              alt={mug.namn}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-foreground">{mug.namn}</h1>
              <Badge className={rarityColors[rarity]}>{rarity}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">Year: {mug.tillverkad}</p>
              <p className="text-lg text-muted-foreground">Designer: {mug.designer}</p>
              <p className="text-lg text-muted-foreground">Material: {mug.material}</p>
              <p className="text-lg text-muted-foreground">Weight: {mug.vikt}</p>
              <p className="text-lg text-muted-foreground">Volume: {mug.volym}</p>
              <p className="text-2xl font-bold text-primary mt-4">${price}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MugDetail;