import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MugGrid from "@/components/MugGrid";
import type { Mug } from "@/components/MugCard";

// Temporary data for demonstration
const DEMO_MUGS: Mug[] = [
  {
    id: "1",
    name: "Snorkmaiden Pink",
    year: 2020,
    image: "/placeholder.svg",
    rarity: "Common",
    price: 29.99,
  },
  {
    id: "2",
    name: "Little My Red",
    year: 2021,
    image: "/placeholder.svg",
    rarity: "Rare",
    price: 49.99,
  },
  {
    id: "3",
    name: "Moomintroll Blue",
    year: 2019,
    image: "/placeholder.svg",
    rarity: "Ultra Rare",
    price: 99.99,
  },
  // Add more demo mugs as needed
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredMugs = DEMO_MUGS.filter((mug) =>
    mug.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container py-8 space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Moomin Mug Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive database of Moomin mugs, featuring detailed
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