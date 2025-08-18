import { IconDownload } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";

/**
 * Convert a 1-based column index into spreadsheet-like letters:
 * 1 -> A, 2 -> B, 26 -> Z, 27 -> AA, etc.
 */
function labelColumn(colIndex) {
  let i = parseInt(colIndex, 10);
  if (!i) return "";
  let result = "";
  while (i > 26) {
    const remainder = i % 26 || 26;
    result = String.fromCharCode(64 + remainder) + result;
    i = Math.floor((i - 1) / 26);
  }
  return String.fromCharCode(64 + i) + result;
}

/**
 * Main HeihoViewer React component
 */
function HeihoViewer({
  data = [],
  className = "heiho-view",
  max, // max rows to show
  header = null, // auto-detect header row by default
  title = "Preview",
  dataLength,
  href,
  onClose, // optional callback when closed
}) {
  // We manage showing/hiding locally
  const [isOpen, setIsOpen] = useState(true);
  // We’ll store references to elements to replicate the resize logic
  const shellRef = useRef(null);
  const scrollRef = useRef(null);
  const tableRef = useRef(null);

  const columns = data[0].length;

  const dataKeys = Object.keys(data.slice(1,))
  const isTruncated = dataLength > max;
  const rowKeys = isTruncated ? dataKeys.slice(0, max) : dataKeys;
  const content = data.slice(1);

  let firstRowData = null;
  const rows = rowKeys.map((key, index) => {
    const rowIndex = index + 1;
    const rowData = content[key];

    if (rowIndex === 1) {
      firstRowData = rowData;
    }

    const cells = [];
    cells.push(<td key="rowNum">{rowIndex}</td>);

    if (typeof rowData === "object" && rowData !== null) {
      const rowKeysInner = Array.isArray(rowData)
        ? rowData.map((v, i) => ({ k: String(i), v }))
        : Object.entries(rowData).map(([k, v]) => ({ k, v }));

      let colCount = 0;
      for (let i = 0; i < rowKeysInner.length; i++) {
        colCount++;
        cells.push(
          <td key={`col-${rowKeysInner[i].k}`}>{String(rowKeysInner[i].v)}</td>
        );
      }

      while (colCount < columns) {
        colCount++;
        cells.push(<td key={`pad-${colCount}`} />);
      }
    } else {
      cells.push(
        <td colSpan={columns} key="single">
          {String(rowData || "")}
        </td>
      );
    }

    return <tr key={key}>{cells}</tr>;
  });

  let useHeader = header;
  if (useHeader === null) {
    useHeader = true;
    if (!firstRowData) {
      useHeader = false;
    } else {
      const rowData = Array.isArray(firstRowData)
        ? firstRowData
        : Object.values(firstRowData);
      if (rowData.length < columns) {
        useHeader = false;
      } else {
        for (const cellVal of rowData) {
          if (!cellVal || !isNaN(parseFloat(cellVal))) {
            useHeader = false;
            break;
          }
        }
      }
    }
  }

  if (useHeader && rows.length > 0) {
    rows[0] = React.cloneElement(rows[0], {
      className: "heiho-header",
    });
  }

  const theadCells = [];
  for (let i = 0; i <= columns; i++) {
    if (i === 0) {
      theadCells.push(<th key={`col-head-${i}`}></th>);
      continue;
    }
    theadCells.push(<th key={`col-head-${i}`}>{data[0][i - 1]}</th>);
  }

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const resize = () => {
    if (!shellRef.current || !tableRef.current || !scrollRef.current) return;

    if (shellRef.current.offsetWidth > tableRef.current.offsetWidth) {
      tableRef.current.classList.add("width100");
    } else {
      tableRef.current.classList.remove("width100");
    }

    const headerEl = document.getElementById(`${className}-header`);
    const truncatedEl = document.getElementById(`${className}-truncated`);
    if (!headerEl || !truncatedEl) return;

    scrollRef.current.style.height = "";

    const newHeight =
      shellRef.current.offsetHeight -
      2 - // bottom offset
      headerEl.offsetHeight -
      truncatedEl.offsetHeight;

    if (tableRef.current.offsetHeight > newHeight) {
      scrollRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [data, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("heiho-body");
    } else {
      document.body.classList.remove("heiho-body");
    }
    return () => {
      document.body.classList.remove("heiho-body");
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className} ref={shellRef} style={{ display: "block" }}>
      <div className={`${className}-header`}>
        {/* <div className={`${className}-title`}>{isTruncated ? `${title} (showing ${max} of ${dataLength})` : title}</div> */}
        <div className={`${className}-title`}>{title}</div>
        <div className={`${className}-close`}>
          <a
            data-previewed
            download
            href={href}
            style={{ color: "#b4b4b4" }}
            className="csv-download"
          >
            <IconDownload />
          </a>
        </div>
      </div>

      <div className={`${className}-scroll`} ref={scrollRef}>
        <table className={`${className}-table`} ref={tableRef}>
          <thead>
            <tr className={`${className}-thead`}>{theadCells}</tr>
          </thead>
          <tbody className={`${className}-tbody`}>{rows}</tbody>
        </table>
      </div>

      {isTruncated ? (
        <div className={`${className}-truncated`}>
          {`${max}/${dataLength} rows displayed. Download full CSV above.`}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HeihoViewer;
