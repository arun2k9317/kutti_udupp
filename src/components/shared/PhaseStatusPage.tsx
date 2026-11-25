import Link from "next/link";
import { Badge, Box, Button, Container, Paper, Stack, Text, Title } from "@mantine/core";
import { brandTokens } from "@/lib/theme";

export function PhaseStatusPage({
  eyebrow,
  title,
  description,
  phaseLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  phaseLabel: string;
}) {
  return (
    <Box py={{ base: 56, md: 84 }} bg={brandTokens.bgPrimary}>
      <Container size={720}>
        <Paper
          p={{ base: 28, md: 44 }}
          radius="md"
          bg={brandTokens.bgSecondary}
          ta="center"
          style={{ border: `1px solid ${brandTokens.border}` }}
        >
          <Stack align="center" gap="md">
            <Badge variant="light" color="warm" size="md">
              {phaseLabel}
            </Badge>
            <Text className="ku-eyebrow">{eyebrow}</Text>
            <Title order={1} className="ku-serif" fz={{ base: 26, md: 34 }}>
              {title}
            </Title>
            <Text size="sm" c={brandTokens.textSecondary} maw={480} lh={1.65}>
              {description}
            </Text>
            <Button component={Link} href="/" color="espresso" mt="xs">
              Return to Homepage
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
