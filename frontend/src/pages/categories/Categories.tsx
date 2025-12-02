import { fetchCategories } from "../../services/categories";
import { Categorie } from "../../types/CategorieType";
import { useEffect, useState } from "react";
import { Tags } from "lucide-react"

export default function Categories() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);

  const getCategories = async () => {
    try{
      setLoading(true);
      setError(null);
      const data = await fetchCategories();
      setCategories(data);
    }catch (error) {
      setError("Failed to fetch categories");
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);


  if (loading) {
    return <div className="p-4 text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="p-4 flex gap-4 flex-col text-2xl">
      <div className="flex flex-row justify-between pb-8">
        <h1 className="text-5xl font-bold mb-4">Catégories</h1>
        <button className="bg-green-500 text-gray-200 px-4 rounded-4xl hover:cursor-pointer flex gap-4 items-center hover:bg-green-600">
          <span className="text-green-500 text-3xl rounded-full w-10 h-10 bg-gray-200">
            + 
          </span>
          Ajouter une catégorie
        </button>
      </div>
      {categories.map((categorie) => (
        <div key={categorie?.id} 
          className="p-4 bg-gray-200 shadow-md rounded-2xl flex flex-row gap-4 items-center justify-between"
        >
          <div className="flex flex-row gap-4">
            <span className="flex items-center-safe">
              <Tags size={20} className="text-gray-600" />
            </span>
            <p>{categorie?.name}</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer hover:bg-green-400">
              🗑️
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}