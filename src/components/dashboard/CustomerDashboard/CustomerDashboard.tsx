//Developer : Malarkodi J

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, InputGroup, Button } from "react-bootstrap";
import debounce from "lodash.debounce";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import MockData from "./MockData.json";

interface Account {
  id: number;
  name: string;
  accountNumber: string;
  type: string;
  balance: number;
  creationDate: string;
  lastTransactionDate: string;
}

type SortDirection = "asc" | "desc";
type SortKey =
  | "accountNumber"
  | "name"
  | "type"
  | "balance"
  | "creationDate"
  | "lastTransactionDate";

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "creationDate",
    direction: "asc",
  });

  const rowsPerPage = 5;

  const fetchAccounts = async (): Promise<void> => {
    try {
      // const response = await fetch(`http://localhost:3001/accounts`);
      // const data = await response.json();

      //MockData for overall demo
      const data = MockData.accounts;

      setAccounts(data);
      setFilteredAccounts(data);
      setTotalPages(Math.ceil(data.length / rowsPerPage));
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const sortArray = (data: Account[]) => {
    let updatedAccounts = [...data];
    updatedAccounts = updatedAccounts.sort((a, b) => {
      const { key, direction } = sortConfig;

      if (key === "creationDate" || key === "lastTransactionDate") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);

        if (dateA < dateB) {
          return direction === "asc" ? -1 : 1;
        }
        if (dateA > dateB) {
          return direction === "asc" ? 1 : -1;
        }
      }

      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }

      return 0;
    });

    return updatedAccounts;
  };

  const debouncedSearch = debounce((query: string) => {
    let filteredData = accounts.filter(
      (account) =>
        account.type.toLowerCase().includes(query.toLowerCase()) ||
        account.accountNumber.includes(query)
    );

    setFilteredAccounts(
      filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    );
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredData.length / rowsPerPage));
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSort = (key: SortKey): void => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setCurrentPage(1);
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let updatedAccounts = [...accounts];
    if (!search) {
      updatedAccounts = sortArray(updatedAccounts);
      setFilteredAccounts(
        updatedAccounts.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        )
      );
    } else {
      let filteredData = accounts.filter(
        (account) =>
          account.type.toLowerCase().includes(search.toLowerCase()) ||
          account.accountNumber.includes(search)
      );
      setFilteredAccounts(
        filteredData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        )
      );
    }
  }, [accounts, sortConfig, search, currentPage, rowsPerPage]);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const handleTransfer = () => {
    navigate("/fundtransfer");
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const renderSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div className="container-fluid mt-4 px-4">
      <div className="d-flex justify-content-center align-items-center">
        <h2 className="mb-4">Account Summary</h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-25">
          <Form.Control
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
        </InputGroup>

        <Button variant="primary" onClick={handleTransfer}>
          Transfer
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover variant="light" className="w-100">
          <thead>
            <tr>
              <th onClick={() => handleSort("accountNumber")}>
                Account Number {renderSortIcon("accountNumber")}
              </th>
              <th onClick={() => handleSort("name")}>
                Name {renderSortIcon("name")}
              </th>
              <th onClick={() => handleSort("type")}>
                Account Type {renderSortIcon("type")}
              </th>
              <th onClick={() => handleSort("balance")}>
                Balance {renderSortIcon("balance")}
              </th>
              <th onClick={() => handleSort("creationDate")}>
                Creation Date {renderSortIcon("creationDate")}
              </th>
              <th onClick={() => handleSort("lastTransactionDate")}>
                Last Transaction Date {renderSortIcon("lastTransactionDate")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account) => (
              <tr key={account.id}>
                <td>{account.accountNumber}</td>
                <td>{account.name}</td>
                <td>{account.type}</td>
                <td>${account.balance.toFixed(2)}</td>
                <td>{new Date(account.creationDate).toLocaleDateString()}</td>
                <td>
                  {new Date(account.lastTransactionDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Page {currentPage} of {totalPages}
        </div>

        <div>
          <Button
            className="me-2"
            variant="primary"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
