// @mui
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';
import Iconify from '../iconify';
import { StyledButtonHolder } from './style';
//
import { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  hideCloseBtn,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      {!hideCloseBtn ? (
        <StyledButtonHolder>
          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </StyledButtonHolder>
      ) : null}
      {title ? <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle> : null}

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      {action ? (
        <DialogActions>
          {action}

          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
