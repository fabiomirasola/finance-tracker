import { fetchCategories, deleteCategory, createCategory } from "../../services/categories";
import { Categorie } from "../../types/CategorieType";
import { useEffect, useState } from "react";
import { Tags } from "lucide-react"

export default function Categories() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

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
  
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);

      const numericId = Number(id);

      setCategories((prev) => prev.filter((category) => category.id !== numericId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return; 

    try{
      setLoading(true); 
      setError(null);
      
      const newCategory = await createCategory(name); 
      
      setCategories((prev) => [...prev, newCategory]);

      setShowModal(false);
      setName('');
    } catch (error) {
      setError("Failed to create category");
      console.error("Error creating category:", error);
    }
    finally{
      setLoading(false); 
    }
  }

  if (loading) {
    return <div className="p-4 text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="p-4 flex gap-4 flex-col text-2xl">
      <div className="flex flex-row justify-between pb-8">
        <h1 className="text-5xl font-bold mb-4">Catégories</h1>
        <button 
          className="bg-green-500 text-gray-200 px-4 rounded-4xl hover:cursor-pointer flex gap-4 items-center hover:bg-green-600"
          onClick={() => setShowModal(true)}
        >
          <span className="text-green-500 text-3xl rounded-full w-10 h-10 bg-gray-200">
            + 
          </span>
          Ajouter une catégorie
        </button>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] pr-2">
        {categories.map((categorie) => (
          <div key={categorie.id} 
            className="p-4 bg-gray-200 shadow-md rounded-2xl flex flex-row gap-4 items-center justify-between"
          >
            <div className="flex flex-row gap-4">
              <span className="flex items-center-safe">
                <Tags size={20} className="text-gray-600" />
              </span>
              <p>{categorie.name}</p>
            </div>

            <span
              onClick={() => {
                setCategoryToDelete(categorie.id)
                setShowDeleteModal(true)
              }}
              className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer hover:bg-green-400"
            >
              🗑️
            </span>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[420px] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-2xl font-semibold">Ajouter une transaction</h2>
              <button 
                onClick={() => {
                  setShowModal(false)
                  setName('')
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none hover:cursor-pointer"
              >
                ×
              </button>
            </div>
            <hr />
            <form className="flex flex-col gap-4" onSubmit={handleAddCategory}>
              <input
                type="text"
                placeholder="Titre"
                className="p-2 rounded text-base w-full bg-gray-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )} 
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[400px] flex flex-col gap-4">

            <div className="flex items-center justify-between ">
              <h2 className="text-2xl font-semibold">Confirmer la suppression</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none hover:cursor-pointer"
              >
                ×
              </button>
            </div>
            <hr />

            <p className="text-sm pt-2">
              Êtes-vous sûr de vouloir supprimer cette catégorie ?
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  handleDeleteCategory(categoryToDelete!.toString())
                  setShowDeleteModal(false)
                }}
                className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 hover:cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}