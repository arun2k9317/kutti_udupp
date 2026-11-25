"use client";

import { useEffect, useState } from "react";
import { Box, Container, Group, Text, UnstyledButton } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { ANNOUNCEMENTS } from "@/data/catalog";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <Box
      component="div"
      bg="#35312F"
      c="#F8F5F0"
      py={8}
      style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
    >
      <Container>
        <Group justify="space-between" align="center" wrap="nowrap" gap="xs">
          <UnstyledButton
            onClick={handlePrev}
            aria-label="Previous announcement"
            visibleFrom="sm"
            style={{ color: "#D5D0CC", display: "flex", alignItems: "center" }}
          >
            <IconChevronLeft size={14} stroke={1.6} />
          </UnstyledButton>

          <Text
            size="xs"
            ta="center"
            fw={500}
            style={{
              letterSpacing: "0.04em",
              flex: 1,
              lineHeight: 1.4,
            }}
          >
            {ANNOUNCEMENTS[index]}
          </Text>

          <UnstyledButton
            onClick={handleNext}
            aria-label="Next announcement"
            visibleFrom="sm"
            style={{ color: "#D5D0CC", display: "flex", alignItems: "center" }}
          >
            <IconChevronRight size={14} stroke={1.6} />
          </UnstyledButton>
        </Group>
      </Container>
    </Box>
  );
}
