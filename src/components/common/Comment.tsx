import { Text, Avatar, Group, Rating, Box, Card } from "@mantine/core";
import { Review } from "../../interface/products";
import moment from "moment";

export function ReviewCard({
  comment,
  date,
  rating,
  reviewerEmail,
  reviewerName,
}: Review) {
  return (
    <Card bd={"1px solid gray"} my={10}>
      <Group>
        <Avatar size={"lg"} name={reviewerName} radius="xl"></Avatar>
        <Box>
          <Text size="sm">{reviewerName}</Text>
          <Rating my={5} value={rating} readOnly />
          <Text py="sm" size="sm">
            {comment}
          </Text>
          <Text size="xs" c="dimmed">
            {reviewerEmail}
          </Text>
          <Text size="xs" c="dimmed">
            {moment(date).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>
        </Box>
      </Group>
    </Card>
  );
}
