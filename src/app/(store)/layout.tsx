import { Box } from "@mantine/core";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { StoreHeader } from "@/components/storefront/StoreHeader";
import { StoreFooter } from "@/components/storefront/StoreFooter";
import { SearchModal } from "@/components/storefront/SearchModal";
import { CartDrawer } from "@/components/storefront/CartDrawer";
import { WishlistDrawer } from "@/components/storefront/WishlistDrawer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AnnouncementBar />
      <StoreHeader />
      <Box component="main" style={{ flex: 1 }}>
        {children}
      </Box>
      <StoreFooter />
      <SearchModal />
      <CartDrawer />
      <WishlistDrawer />
    </Box>
  );
}
