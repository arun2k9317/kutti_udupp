import { Alert, Badge, Paper, Stack, Text, Title } from "@mantine/core";
import { IconTools } from "@tabler/icons-react";
import { brandTokens } from "@/lib/theme";

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const title = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Text className="ku-eyebrow">Admin Workspace</Text>
        <Title order={2} className="ku-serif" fz={28}>
          {title} Management
        </Title>
      </Stack>

      <Paper
        p="xl"
        radius="md"
        bg={brandTokens.bgSecondary}
        style={{ border: `1px solid ${brandTokens.border}` }}
      >
        <Stack gap="md">
          <Badge variant="light" color="warm" w="fit-content">
            Scheduled for Phase 3 & 4
          </Badge>
          <Alert icon={<IconTools size={18} />} color="espresso" variant="light">
            The <strong>{title}</strong> management module is part of the Phase 1 Admin
            shell. Interactive CRUD tables, forms, and PostgreSQL/Knex persistence will
            be implemented in Phase 3 and Phase 4.
          </Alert>
        </Stack>
      </Paper>
    </Stack>
  );
}
