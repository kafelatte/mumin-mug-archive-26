import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MugGrid from "@/components/MugGrid";
import type { Mug } from "@/components/MugCard";

// Temporary data for demonstration
const DEMO_MUGS: Mug[] = [
  {
    id: "1",
    name: "Snufkin's Adventure",
    year: 2020,
    image: "/lovable-uploads/047f045a-19c3-4f0f-9858-5e9afc031327.png",
    rarity: "Common",
    price: 29.99,
  },
  {
    id: "2",
    name: "Moomin Family Yellow",
    year: 2021,
    image: "/lovable-uploads/4ede59ac-88cc-4acd-88ac-57fcb5bbbabb.png",
    rarity: "Rare",
    price: 49.99,
  },
  {
    id: "3",
    name: "Moomin Family Pastel",
    year: 2019,
    image: "/lovable-uploads/ea44145c-80c8-4cbd-9057-e464367705d8.png",
    rarity: "Ultra Rare",
    price: 99.99,
  },
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