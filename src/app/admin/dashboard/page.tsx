import {
  Alert,
  Badge,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { brandTokens } from "@/lib/theme";
import { SAMPLE_PRODUCTS, SHOP_CATEGORIES } from "@/data/catalog";

const OVERVIEW_CARDS = [
  { label: "Sample Categories", value: String(SHOP_CATEGORIES.length), note: "Active boutique lines" },
  { label: "Sample Products", value: String(SAMPLE_PRODUCTS.length), note: "Seeded for Phase 1" },
  { label: "Pending Orders", value: "—", note: "Enabled in Phase 4 & 6" },
  { label: "Database Status", value: "Not Connected", note: "Planned for Phase 4" },
];

export default function AdminDashboardPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-end" wrap="wrap">
        <BoxHeader />
        <Badge color="warm" variant="light" size="md">
          Phase 1 Foundation Shell
        </Badge>
      </Group>

      <Alert
        icon={<IconInfoCircle size={18} />}
        title="Admin Shell Ready"
        color="warm"
        variant="light"
        radius="md"
      >
        The Kutti Udupp Admin layout and Mantine navigation shell are configured. Full
        catalogue CRUD, inventory, orders, and analytics dashboards will be built in
        Phase 3 and wired to PostgreSQL/Knex in Phase 4.
      </Alert>

      <Grid gutter="md">
        {OVERVIEW_CARDS.map((card) => (
          <Grid.Col key={card.label} span={{ base: 12, sm: 6, lg: 3 }}>
            <Paper
              p="lg"
              radius="md"
              bg={brandTokens.bgSecondary}
              style={{ border: `1px solid ${brandTokens.border}` }}
            >
              <Text size="xs" tt="uppercase" fw={600} c={brandTokens.textSecondary} style={{ letterSpacing: "0.08em" }}>
                {card.label}
              </Text>
              <Text className="ku-serif" fz={28} fw={600} mt={6}>
                {card.value}
              </Text>
              <Text size="xs" c={brandTokens.textSecondary} mt={4}>
                {card.note}
              </Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

function BoxHeader() {
  return (
    <Stack gap={2}>
      <Text className="ku-eyebrow">Admin Overview</Text>
      <Title order={2} className="ku-serif" fz={28}>
        Kutti Udupp Studio Dashboard
      </Title>
    </Stack>
  );
}
