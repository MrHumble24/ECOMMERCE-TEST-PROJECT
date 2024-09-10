import { IconList } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetAllProductCategories } from "../hooks/useGetAllProductCategories";
import CustomNavLink from "./CustomNavLink";

interface Category {
  slug: string;
  name: string;
  url: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { data, isLoading, isError } = useGetAllProductCategories();

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setCategories(data);
    }
  }, [data, isLoading, isError]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load categories</div>;

  return (
    <>
      {categories?.map((category, index) => (
        <CustomNavLink
          key={index}
          label={category.name}
          to={`/products/category/${category.slug}`}
          icon={<IconList size="0.8rem" />}
        />
      ))}
    </>
  );
};

export default CategoriesPage;
