import React, { useEffect, useState } from "react";
import { Box, IconButton, ListItemButton, Popover, List as MuiList, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { deleteThread, fetchThreadsPreview, setCurrentThreadId } from "store/slices/chat";
import { IconDots, IconTrash } from "@tabler/icons-react";

function QuestionButtonsInner() {
  const dispatch = useDispatch();
  const [anchorUuid, setAnchorUuid] = useState(null);
  const [menuPos, setMenuPos] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentThreadId, threadsPreview } = useSelector(
    (s) => ({
      currentThreadId: s.chat.currentThreadId,
      threadsPreview: s.chat.threadsPreview,
    }),
    shallowEqual
  );

  const { sidebarToggle } = useSelector((state) => state.ui);

  const keys = React.useMemo(
    () => Object.keys(threadsPreview || {}),
    [threadsPreview]
  );

  const setThreadId = (e, uuid) => {
    e.stopPropagation();
    dispatch(setCurrentThreadId(uuid));
  };

  const showOptions = (e, uuid) => {
    e.stopPropagation();
    setAnchorUuid(uuid);
    setMenuPos({ top: e.clientY, left: e.clientX });
  };

  useEffect(() => {
    if (!menuPos || !Object.keys(menuPos).length) {
        console.log("unsetting")
        setAnchorUuid("");
    }
  }, [menuPos]);

  const itemKey = React.useCallback((index) => keys[index], [keys]);

  if (keys.length === 0) return null;
  console.log(sidebarToggle, "sidebarToggle")
  return (
    <>
    <Box className="menu-section">
      <Box>
        <List
          height={600}
          width="100%"
          itemCount={keys.length}
          itemSize={36}
          overscanCount={20}
          itemKey={itemKey}
        >
          {({ index, style }) => {
            const uuid = keys[index];
            const question = threadsPreview[uuid] || "";
            return (
              <Box
                style={style}
                className={`menu-item ${
                  currentThreadId === uuid ? "active" : ""
                } history ${!sidebarToggle ? "v-none" : ""}`}
              >
                <Box
                  style={{
                    width: "100%",
                    alignItems: "center",
                    color: "#0d0d0d",
                  }}
                  onClick={(e) => setThreadId(e, uuid)}
                  className="menu-text"
                >
                  {question}
                </Box>
                <IconButton
                  className="history-more"
                  disableRipple
                  onClick={(e) => showOptions(e, uuid)}
                >
                  <IconDots />
                </IconButton>
              </Box>
            );
          }}
        </List>
      </Box>
    </Box>

      <Popover
        open={Boolean(menuPos)}
        onClose={() => setMenuPos(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPos ?? { top: 0, left: 0 }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MuiList
          style={{
            maxWidth: "300px",
            display: anchorUuid ? "flex" : "none",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <ListItemButton
            className="labeling-popover"
            onClick={(e) => {
                e.stopPropagation();
                setOpenDelete(anchorUuid);
                setMenuPos(null);
            }}
          >
            <ListItemIcon>
              <IconTrash />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </ListItemButton>
        </MuiList>
      </Popover>

      <Dialog
        open={!!openDelete}
        onClose={() => setOpenDelete("")}
        aria-labelledby="delete"
        PaperProps={{
          style: { minWidth: "min(341px, 100%)" },
        }}
      >
        <DialogTitle id="delete">
          Delete chat?
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={16}>
            This will delete <b>{threadsPreview[openDelete]}{threadsPreview[openDelete]?.endsWith(".") ? "" : "."}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenDelete("")} className="close" variant="outlined">
            Close
          </Button>
          <Button
            onClick={(e) => {
                e.stopPropagation()
                dispatch(deleteThread({uuid: openDelete})).finally(() => {
                    dispatch(fetchThreadsPreview())
                    setOpenDelete("");
                })
            }}
            variant="contained"
            className="delete-danger"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>        
    </>
  );
}

export default React.memo(QuestionButtonsInner);
