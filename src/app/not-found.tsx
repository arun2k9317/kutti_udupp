import Link from "next/link";
import { Box, Button, Container, Stack, Text, Title } from "@mantine/core";
import { brandTokens } from "@/lib/theme";

export default function NotFound() {
  return (
    <Box
      bg={brandTokens.bgPrimary}
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
      py={64}
    >
      <Container size={560} ta="center">
        <Stack align="center" gap="md">
          <Text className="ku-eyebrow">404 · Page Not Found</Text>
          <Title order={1} className="ku-serif" fz={{ base: 30, md: 40 }}>
            This Little Outfit Wandered Off
          </Title>
          <Text size="sm" c={brandTokens.textSecondary} lh={1.65}>
            The page you&apos;re looking for might have moved or isn&apos;t available yet.
            Let&apos;s take you back to the boutique.
          </Text>
          <Button component={Link} href="/" color="espresso" size="md" mt="xs">
            Back to Kutti Udupp
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
