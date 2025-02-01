import { useState } from "react";
import MugGrid, { Mug } from "@/components/MugGrid";
import SearchBar from "@/components/SearchBar";
import mugsData from "../../muminmuggar.csv?raw";

// Parse CSV data
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

// Transform CSV data into Mug objects with validation
const MUGS: Mug[] = parsedMugs.map((mug: any, index: number) => {
  const tillverkad = mug.tillverkad || '2025';
  const year = parseInt(tillverkad.split('–')[0]);
  const imageName = mug.bildfil ? mug.bildfil.split('/').pop() : null;
  const imagePath = imageName ? `/mug_images/${imageName}` : '/placeholder.svg';

  return {
    id: (index + 1).toString(),
    name: mug.namn || 'Unknown Mug',
    year: year,
    image: imagePath,
    rarity: determineRarity(year),
    price: determinePrice(year),
  };
});

function determineRarity(year: number): "Common" | "Rare" | "Ultra Rare" {
  if (year < 2000) return "Ultra Rare";
  if (year < 2015) return "Rare";
  return "Common";
}

function determinePrice(year: number): number {
  if (year < 2000) return 299.99;
  if (year < 2015) return 149.99;
  return 79.99;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMugs = MUGS.filter((mug) =>
    mug.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Total mugs loaded:', MUGS.length);
  console.log('Filtered mugs:', filteredMugs.length);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Moomin Mugs Collection</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <MugGrid mugs={filteredMugs} />
      </main>
    </div>
  );
};

export default Index;