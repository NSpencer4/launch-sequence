import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import FlagTable from "../components/FlagTable";
import StatusBar from "../components/StatusBar";
import Pagination from "../components/Pagination";
import Icon from "../components/Icon";
import { Flag } from "../components/FlagTable/FlagTable.types";

// Mock data
const mockFlags: Flag[] = [
  {
    id: "1",
    name: "V3_SWAP_ENGINE",
    key: "v3-engine-core-stable",
    type: "Boolean",
    active: true,
    tags: ["CORE", "INFRA"],
    lastModified: "2m ago",
  },
  {
    id: "2",
    name: "NFT_MINT_EXP_B",
    key: "nft-v2-experiment-variant-b",
    type: "Multivariate",
    active: true,
    tags: ["NFT", "A/B_TEST"],
    lastModified: "14h ago",
  },
  {
    id: "3",
    name: "DARK_MODE_V2",
    key: "theme-switch-v2-dark",
    type: "Boolean",
    active: false,
    tags: ["UI", "STAGING"],
    lastModified: "2d ago",
  },
  {
    id: "4",
    name: "RPC_BALANCER_V4",
    key: "infra-rpc-load-balancer",
    type: "String",
    active: true,
    tags: ["NODE_CLUSTER"],
    lastModified: "15m ago",
  },
  {
    id: "5",
    name: "STAKING_REWARDS_API",
    key: "api-staking-v3-rewards",
    type: "JSON",
    active: true,
    tags: ["DEFI", "BACKEND"],
    lastModified: "1w ago",
  },
];

export default function FlagsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [flags, setFlags] = useState<Flag[]>(mockFlags);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectFlag = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedIds(flags.map((flag) => flag.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleFlag = (id: string, active: boolean) => {
    setFlags(
      flags.map((flag) => (flag.id === id ? { ...flag, active } : flag))
    );
  };

  const handleFlagClick = (flag: Flag) => {
    console.log("Flag clicked:", flag);
  };

  const handleCreateFlag = () => {
    console.log("Create new flag");
  };

  return (
    <PageLayout activeNavItem="flag-explorer">
      <Header onCreateFlag={handleCreateFlag} />
      <Box
        flex="1"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        p="8"
        pb="0"
      >
        {/* Page Header */}
        <Flex direction="column" gap="4" mb="6">
          {/* Title Row */}
          <Flex align="center" justify="space-between">
            <Flex
              as="h2"
              align="center"
              gap="3"
              fontFamily="display"
              fontSize="3xl"
              color="typography.primary"
              letterSpacing="tight"
            >
              <Box w="8px" h="24px" bg="brand.primary" />
              FLAGS INDEX
            </Flex>
          </Flex>

          {/* Search Row */}
          <Flex align="center" gap="4">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="SEARCH BY NAME, KEY, OR TAG (CMD+K)"
            />
            <Flex
              align="center"
              gap="2"
              pl="4"
              borderLeft="1px solid"
              borderColor="border.secondary"
            >
              <Box
                as="button"
                p="2"
                bg="none"
                border="none"
                color="functional.grey3"
                cursor="pointer"
                borderRadius="base"
                transition="all 0.2s ease"
                title="Filter Type"
                _hover={{
                  color: "brand.primary",
                  bg: "rgba(0, 242, 255, 0.05)",
                }}
              >
                <Icon name="filter_list" size="md" />
              </Box>
              <Box
                as="button"
                p="2"
                bg="none"
                border="none"
                color="functional.grey3"
                cursor="pointer"
                borderRadius="base"
                transition="all 0.2s ease"
                title="Status Filter"
                _hover={{
                  color: "brand.primary",
                  bg: "rgba(0, 242, 255, 0.05)",
                }}
              >
                <Icon name="rule" size="md" />
              </Box>
              <Box
                as="button"
                p="2"
                bg="none"
                border="none"
                color="functional.grey3"
                cursor="pointer"
                borderRadius="base"
                transition="all 0.2s ease"
                title="Tag Filter"
                _hover={{
                  color: "brand.primary",
                  bg: "rgba(0, 242, 255, 0.05)",
                }}
              >
                <Icon name="sell" size="md" />
              </Box>
            </Flex>
          </Flex>
        </Flex>

        <FlagTable
          flags={flags}
          selectedIds={selectedIds}
          onSelectFlag={handleSelectFlag}
          onSelectAll={handleSelectAll}
          onToggleFlag={handleToggleFlag}
          onFlagClick={handleFlagClick}
        />

        {/* Footer */}
        <Flex
          h="48px"
          align="center"
          justify="space-between"
          borderTop="1px solid"
          borderColor="border.secondary"
          px="2"
        >
          <StatusBar syncStatus="operational" />
          <Pagination
            currentPage={currentPage}
            totalItems={1248}
            itemsPerPage={50}
            onPageChange={setCurrentPage}
          />
        </Flex>
      </Box>
    </PageLayout>
  );
}
