"use client";
import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import useHook from "./useHook";
import ModalFormService from "./create/page";
import ModalViewAncService from "./view/page";
import ModalEditAncService from "./edit/page";
import ViewById from "./components/view_by_id";
import EditById from "./components/edit_by_id";

import { Chip } from "@heroui/chip";

export default function App() {
  const {
    setOpenFormService,
    openFormService,
    setOpenViewAncService,
    openViewAncService,
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
    fetchDataAncService,
    formatAddress,
    handleSelectRound,
    roundData,
    formatThaiDateTime,
    btiData,
    cbeData,
    ReferralValue,
    formatThaiDateNoTime,
    LabWife,
    LabHusband,
    calculateAge,
    bmi,
    bp,
    height,
    checkLabRisk,
    getLabWarning,
    handleSelectEditId,
    openEditAncService,
    setOpenEditAncService,
    currentData,
    isEditLoading,
    selectedEditId,
    setDataAnc,
    temperature,
    pulse,
  } = useHook();
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((col) => visibleColumns.has(col.uid));
  }, [visibleColumns, columns]);

  return (
    <div className="mt-[10px] bg-white border border-divider dark:bg-[#0e0e11] dark:border-[#3d3d3d] p-2.5 rounded-lg">
      <div className="grid grid-cols-1 gap-2 lg:flex md:justify-between">
        <Input
          value={filterValue}
          onValueChange={setFilterValue}
          type="search"
          className="w-full lg:w-1/4"
          variant="bordered"
          placeholder="Search..."
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
            <DropdownTrigger className="">
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
            onPress={() => setOpenFormService(true)}
            color="danger"
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
        classNames={{ td: "p-2 pt-2.5 pb-2.5", th: "p-2 pt-4 pb-4" }}
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
          <TableColumn className="text-center">จัดการ</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"ไม่มีข้อมูล"}>
          {sortedItems?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="px-4">
                {index + 1 + (page - 1) * rowsPerPage}
              </TableCell>
              {headerColumns.map((col) => (
                <TableCell key={col.uid}>
                  {col.uid === "hn_wife" && item.wife?.hn}
                  {col.uid === "wife_name" &&
                    `${item.wife?.prename ?? ""}${item.wife?.firstname ?? ""} ${item.wife?.lastname ?? ""}`}
                  {col.uid === "address" &&
                    formatAddress(item.wife?.pat_address)}
                  {col.uid === "phone" && item.wife?.pat_address?.phone}

                  {col.uid === "hn_husband" && item.husband?.hn}
                  {col.uid === "husband_name" &&
                    (item.husband_name ? `${item.husband_name}` : "ไม่พบสามี")}
                  {col.uid === "status" && (
                    <Chip
                      variant="flat"
                      color={
                        item.choice?.abortion_id === 13 ? "success" : "danger"
                      }
                    >
                      {item.choice?.choice_name ?? "ไม่ได้ระบุ"}
                    </Chip>
                  )}
                  {col.uid === "check" && (
                    <Chip
                      variant="dot"
                      color={
                        item.round_status === "ไม่ครบ" ? "warning" : "primary"
                      }
                    >
                      {item.round_status}
                    </Chip>
                  )}

                  {col.uid !== "wife_name" &&
                    col.uid !== "husband_name" &&
                    item[col.uid]}
                </TableCell>
              ))}
              <TableCell>
                <div className="flex justify-center gap-[10px] items-center">
                  <ViewById item={item} handleSelectRound={handleSelectRound} />
                  <EditById
                    item={item}
                    handleSelectEditId={handleSelectEditId}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-[20px] flex justify-end px-[20px]">
        <Pagination
          isCompact
          showControls
          showShadow
          color="danger"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
      <ModalFormService
        openFormService={openFormService}
        setOpenFormService={setOpenFormService}
        closeFormService={() => {
          setOpenFormService(false);
          fetchDataAncService()
            .then((data) => setDataAnc(data || []))
            .catch(console.error);
        }}
      />
      <ModalViewAncService
        btiData={btiData}
        cbeData={cbeData}
        ReferralValue={ReferralValue}
        formatAddress={formatAddress}
        openViewService={openViewAncService}
        closeViewService={() => {
          setOpenViewAncService(false);
        }}
        roundData={roundData}
        formatThaiDateTime={formatThaiDateTime}
        formatThaiDateNoTime={formatThaiDateNoTime}
        LabWife={LabWife}
        LabHusband={LabHusband}
        calculateAge={calculateAge}
        bmi={bmi}
        bp={bp}
        temperature={temperature}
        pulse={pulse}
        height={height}
        checkLabRisk={checkLabRisk}
        getLabWarning={getLabWarning}
      />
      <ModalEditAncService
        openEditService={openEditAncService}
        closeEditService={() => {
          setOpenEditAncService(false);
          fetchDataAncService()
            .then((data) => setDataAnc(data || []))
            .catch(console.error);
        }}
        currentData={currentData}
        isEditLoading={isEditLoading}
        selectedEditId={selectedEditId}
      />
    </div>
  );
}
