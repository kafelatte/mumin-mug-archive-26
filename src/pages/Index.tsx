import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MugGrid from "@/components/MugGrid";
import type { Mug } from "@/components/MugCard";
import mugsData from "../../muminmuggar.csv?raw";

// Parse CSV data manually to avoid the label issue
const parseCSV = (csvText: string) => {
  const [headers, ...rows] = csvText.split('\n').filter(row => row.trim());
  const headerColumns = headers.split(',');
  
  return rows.map(row => {
    const values = row.split(',');
    return headerColumns.reduce((obj: any, header, index) => {
      // Ensure we have a value, or provide a default
      obj[header] = values[index] || '';
      return obj;
    }, {});
  });
};

const parsedMugs = parseCSV(mugsData);

// Transform CSV data into Mug objects with validation
const MUGS: Mug[] = parsedMugs.map((mug: any, index: number) => {
  // Validate required fields and provide defaults
  const tillverkad = mug.tillverkad || '2025';
  const year = parseInt(tillverkad.split('–')[0]);
  const imagePath = mug.bildfil ? `/mug_images/${mug.bildfil.split('/').pop()}` : '/placeholder.svg';

  return {
    id: (index + 1).toString(),
    name: mug.namn || 'Unknown Mug',
    year: year,
    image: imagePath,
    rarity: determineRarity(year),
    price: determinePrice(year),
  };
});

// Helper function to determine rarity based on year
function determineRarity(year: number): "Common" | "Rare" | "Ultra Rare" {
  if (year < 2000) return "Ultra Rare";
  if (year < 2015) return "Rare";
  return "Common";
}

// Helper function to determine price based on year
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
      <div className="container py-8 space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Moomin Mug Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive database of {MUGS.length} Moomin mugs, featuring detailed
            information about each unique piece.
          </p>
        </div>

        <SearchBar onSearch={setSearchQuery} />

        <div className="mt-12">
          <MugGrid mugs={filteredMugs} />
        </div>
      </div>
    </div>
  );
};

export default Index;