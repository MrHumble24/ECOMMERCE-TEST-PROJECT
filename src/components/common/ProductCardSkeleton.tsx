import { Box, Grid, Skeleton } from "@mantine/core";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Box>
      <Grid gutter="lg">
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 2 }} key={index}>
            <Skeleton height={320} radius="md" />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
