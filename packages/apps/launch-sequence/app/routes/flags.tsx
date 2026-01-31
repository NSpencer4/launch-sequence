import { useState } from "react";
import styled from "styled-components";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import FlagTable from "../components/FlagTable";
import StatusBar from "../components/StatusBar";
import Pagination from "../components/Pagination";
import Icon from "../components/Icon";
import { Flag } from "../components/FlagTable/FlagTable.types";

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[8]};
  padding-bottom: 0;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  color: ${({ theme }) => theme.colors.typography.primary};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const TitleAccent = styled.span`
  width: 8px;
  height: 24px;
  background: ${({ theme }) => theme.colors.brand.primary};
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const FilterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding-left: ${({ theme }) => theme.spacing[4]};
  border-left: 1px solid ${({ theme }) => theme.colors.border.secondary};
`;

const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing[2]};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.functional.grey3};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: ${({ theme }) => theme.effects.transition.default};

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
    background: rgba(0, 242, 255, 0.05);
  }
`;

const Footer = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.border.secondary};
  padding: 0 ${({ theme }) => theme.spacing[2]};
`;

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
      <ContentWrapper>
        <PageHeader>
          <TitleRow>
            <Title>
              <TitleAccent />
              FLAGS INDEX
            </Title>
          </TitleRow>
          <SearchRow>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="SEARCH BY NAME, KEY, OR TAG (CMD+K)"
            />
            <FilterButtons>
              <FilterButton title="Filter Type">
                <Icon name="filter_list" size="md" />
              </FilterButton>
              <FilterButton title="Status Filter">
                <Icon name="rule" size="md" />
              </FilterButton>
              <FilterButton title="Tag Filter">
                <Icon name="sell" size="md" />
              </FilterButton>
            </FilterButtons>
          </SearchRow>
        </PageHeader>

        <FlagTable
          flags={flags}
          selectedIds={selectedIds}
          onSelectFlag={handleSelectFlag}
          onSelectAll={handleSelectAll}
          onToggleFlag={handleToggleFlag}
          onFlagClick={handleFlagClick}
        />

        <Footer>
          <StatusBar syncStatus="operational" />
          <Pagination
            currentPage={currentPage}
            totalItems={1248}
            itemsPerPage={50}
            onPageChange={setCurrentPage}
          />
        </Footer>
      </ContentWrapper>
    </PageLayout>
  );
}
