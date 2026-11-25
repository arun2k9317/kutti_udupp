"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Burger,
  Divider,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowLeft,
  IconBell,
  IconBoxSeam,
  IconCategory,
  IconDashboard,
  IconDiscount2,
  IconPackage,
  IconSettings,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";
import { brandTokens } from "@/lib/theme";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: IconDashboard },
  { label: "Products", href: "/admin/products", icon: IconPackage },
  { label: "Categories", href: "/admin/categories", icon: IconCategory },
  { label: "Inventory", href: "/admin/inventory", icon: IconBoxSeam },
  { label: "Orders", href: "/admin/orders", icon: IconShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: IconUsers },
  { label: "Coupons", href: "/admin/coupons", icon: IconDiscount2 },
  { label: "Settings", href: "/admin/settings", icon: IconSettings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 256, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="lg"
      styles={{
        main: {
          backgroundColor: brandTokens.bgPrimary,
        },
        header: {
          backgroundColor: brandTokens.bgSecondary,
          borderBottom: `1px solid ${brandTokens.border}`,
        },
        navbar: {
          backgroundColor: brandTokens.bgSecondary,
          borderRight: `1px solid ${brandTokens.border}`,
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Breadcrumbs separator="/" visibleFrom="xs">
              {segments.map((seg, idx) => (
                <Text
                  key={seg + idx}
                  size="xs"
                  tt="capitalize"
                  fw={idx === segments.length - 1 ? 600 : 400}
                  c={
                    idx === segments.length - 1
                      ? brandTokens.textPrimary
                      : brandTokens.textSecondary
                  }
                >
                  {seg}
                </Text>
              ))}
            </Breadcrumbs>
          </Group>

          <Group gap="sm">
            <Badge variant="light" color="warm" visibleFrom="sm">
              Phase 1 Shell
            </Badge>
            <ActionIcon variant="subtle" color="espresso" aria-label="Admin notifications">
              <IconBell size={18} stroke={1.7} />
            </ActionIcon>
            <Menu shadow="sm" width={190}>
              <Menu.Target>
                <Group gap="xs" style={{ cursor: "pointer" }}>
                  <Avatar size="sm" radius="xl" color="espresso">
                    KU
                  </Avatar>
                  <Box visibleFrom="sm">
                    <Text size="xs" fw={600} lh={1.2}>
                      Studio Admin
                    </Text>
                    <Text size="10px" c={brandTokens.textSecondary}>
                      admin@kuttiudupp.in
                    </Text>
                  </Box>
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component={Link} href="/">
                  View Storefront
                </Menu.Item>
                <Menu.Item component={Link} href="/admin/settings">
                  Store Settings
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Stack gap={2} pb="md">
            <Text className="ku-serif" fw={600} size="lg" style={{ letterSpacing: "0.05em" }}>
              KUTTI UDUPP
            </Text>
            <Text size="11px" tt="uppercase" c={brandTokens.textSecondary} style={{ letterSpacing: "0.14em" }}>
              Commerce Admin
            </Text>
          </Stack>
          <Divider color={brandTokens.border} mb="sm" />
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea}>
          <Stack gap={4}>
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <NavLink
                  key={item.href}
                  component={Link}
                  href={item.href}
                  label={item.label}
                  leftSection={<Icon size={17} stroke={1.65} />}
                  active={active}
                  onClick={close}
                  color="espresso"
                  variant="light"
                  styles={{
                    root: {
                      borderRadius: 6,
                      fontWeight: active ? 600 : 500,
                    },
                  }}
                />
              );
            })}
          </Stack>
        </AppShell.Section>

        <AppShell.Section>
          <Divider color={brandTokens.border} my="sm" />
          <NavLink
            component={Link}
            href="/"
            label="Back to Storefront"
            leftSection={<IconArrowLeft size={16} />}
            styles={{ root: { borderRadius: 6 } }}
          />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
