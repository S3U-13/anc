"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React, { useState } from "react";

import { Button } from "@heroui/button";
import ModalForm from "./create/page";
import { Tooltip } from "@heroui/tooltip";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Pagination } from "@heroui/pagination";
import useHook from "./useHook";

export default function page() {
  const {
    openModal,
    setOpenModal,
    capitalize,
    setVisibleColumns,
    visibleColumns,
    columns,
    onClear,
    filterValue,
    setFilterValue,
    sortedItems,
    filteredItems,
    onRowsPerPageChange,
    rowsPerPage,
    setPage,
    page,
    pages,
    onSortChange,
    sortDescriptor,
    fetchDataAnc,
    setDataAnc,
  } = useHook();
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((col) => visibleColumns.has(col.uid));
  }, [visibleColumns, columns]);

  return (
    <div className="mt-[10px] bg-white border border-divider dark:bg-[#27272a] dark:border-[#3d3d3d] p-2.5 rounded-lg">
      <div className="gap-[10px] flex justify-between">
        <Input
          value={filterValue}
          onValueChange={setFilterValue}
          type="search"
          className="w-1/4"
          placeholder="Search by wife HN..."
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          }
          onClear={onClear}
          isClearable
        />

        <div className="flex gap-[10px] items-center">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                }
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button
            onPress={() => setOpenModal(true)}
            color="primary"
            variant="solid"
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            }
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center py-[15px]">
        <span className="text-default-400 text-small">
          Total {filteredItems.length} records
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small ml-2"
            onChange={onRowsPerPageChange}
            value={rowsPerPage}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>

      <Table
        isHeaderSticky
        classNames={{ td: "p-2 py-4", th: "p-2 pt-4 pb-4" }}
        isStriped
        aria-label="Example table"
      >
        <TableHeader>
          <TableColumn>ลำดับ</TableColumn>
          {headerColumns.map((col) => (
            <TableColumn key={col.uid}>
              <div
                className="flex items-center"
                onClick={() => onSortChange(col.uid)}
              >
                {capitalize(col.name)}
                {sortDescriptor.column === col.uid && (
                  <svg
                    className={`w-4 h-3 ml-1 transition-transform ${
                      sortDescriptor.direction === "ascending"
                        ? "rotate-0"
                        : "rotate-180"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                )}
              </div>
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"ไม่มีข้อมูล"}>
          {sortedItems?.map((item, index) => (
            <TableRow key={item.anc_no}>
              <TableCell className="px-4">{index + 1}</TableCell>
              {headerColumns.map((col) => (
                <TableCell key={col.uid}>
                  {col.uid === "wife_name" &&
                    `${item.wife?.prename}${item.wife?.firstname} ${item.wife?.lastname}`}
                  {col.uid === "husband_name" &&
                    `${item.husband?.prename}${item.husband?.firstname} ${item.husband?.lastname}`}
                  {col.uid !== "wife_name" &&
                    col.uid !== "husband_name" &&
                    item[col.uid]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-[20px] flex justify-end px-[20px]">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
      <ModalForm
        openModal={openModal}
        closeModal={() => {
          setOpenModal(false);
          fetchDataAnc()
            .then((data) => setDataAnc(data || []))
            .catch(console.error);
        }}
      />
    </div>
  );
}
