import {
  Box,
  Container,
  Divider,
  Grid,
  LoadingOverlay,
  Pagination,
} from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsByCategory } from "../hooks/useGetProductsByCategory";

import useCartStore from "../../../stores/useCartStore";
import ProductCard from "../components/ProductCard";
import { SearchProducts } from "../components/SearchProduct";
import { useSearchProducts } from "../hooks/useSearchProducts";

const ProductsGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchedResults, isLoading: searchLoading } =
    useSearchProducts(searchTerm);

  const productSlug = useParams().productSlug;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const [currentPage, setCurrentPage] = useState(1);

  const [pagenation, setPagenation] = useState({
    limit: 10,
    skip: 0,
  });

  const { data, isLoading, isError } = useGetProductsByCategory(
    productSlug || "beauty",
    pagenation.limit,
    pagenation.skip
  );

  const { cartItems } = useCartStore();

  if (isError) {
    return <div>Error</div>;
  }

  const totalPages = Math.ceil((data?.total || 0) / pagenation.limit);

  const handlePageChange = (page: number) => {
    scrollToTop();
    setCurrentPage(page);
    setPagenation({ limit: 10, skip: (page - 1) * 10 });
  };

  const isProductInCart = (productId: number) =>
    cartItems.some((item: { id: number }) => item.id === productId);

  return (
    <Container maw={{ base: "100%", md: "90%" }} pos="relative" pb={40}>
      <SearchProducts searchFn={setSearchTerm} />

      <LoadingOverlay
        visible={isLoading || searchLoading}
        zIndex={1000}
        h={"100%"}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "pink", type: "bars" }}
      />
      {searchTerm && searchedResults?.products && (
        <Box>
          <Divider label="Search Results" my={"xl"} />
          <Grid>
            {searchedResults?.products?.map((product) => (
              <Grid.Col
                span={{ base: 12, md: 6, lg: 5, xl: 4 }}
                key={product.id}
              >
                <ProductCard
                  product={product}
                  inCart={isProductInCart(product.id)}
                />
              </Grid.Col>
            ))}
          </Grid>
          <Divider label="Search Results" my={"xl"} />
        </Box>
      )}
      <Grid>
        {data?.products?.map((product) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 5, xl: 4 }} key={product.id}>
            <ProductCard
              product={product}
              inCart={isProductInCart(product.id)}
            />
          </Grid.Col>
        ))}
      </Grid>
      <Pagination
        value={currentPage}
        onChange={handlePageChange}
        my={10}
        total={totalPages}
      />
    </Container>
  );
};

export default ProductsGrid;
