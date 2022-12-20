import { useDropzone } from 'react-dropzone';
// @mui
import { Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
//
import Iconify from '../iconify';
//
import { UploadProps } from './types';
import RejectionFiles from './errors/RejectionFiles';
import AvatarPreview from './preview/AvatarPreview';

// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: '50%',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
}));

const StyledPlaceholder = styled('div')(({ theme }) => ({
  zIndex: 7,
  display: 'flex',
  borderRadius: '50%',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  width: `calc(100% - 16px)`,
  height: `calc(100% - 16px)`,
  color: theme.palette.text.disabled,
  backgroundColor: theme.palette.grey[100],
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function UploadAvatar({
  error,
  file,
  disabled,
  helperText,
  sx,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    disabled,
    ...other,
  });

  const hasFile = !!file;

  const isError = isDragReject || !!error;

  return (
    <>
      <StyledDropZone
        {...getRootProps()}
        sx={{
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(isError && {
            borderColor: 'error.light',
            ...(hasFile && {
              bgcolor: 'error.lighter',
            }),
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasFile && {
            '&:hover': {
              '& .placeholder': {
                opacity: 1,
              },
            },
          }),
          ...sx,
        }}
      >
        <input {...getInputProps()} />

        {hasFile && <AvatarPreview file={file} />}

        <StyledPlaceholder
          className="placeholder"
          sx={{
            '&:hover': {
              opacity: 0.72,
            },
            ...(hasFile && {
              zIndex: 9,
              opacity: 0,
              color: 'common.white',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.64),
            }),
            ...(isError && {
              color: 'error.main',
              bgcolor: 'error.lighter',
            }),
          }}
        >
          <Iconify icon="ic:round-add-a-photo" width={24} sx={{ mb: 1, color: 'grey.600' }} />

          <Typography variant="caption" sx={{ color: 'grey.600' }}>
            {file ? 'Update photo' : 'Upload photo'}
          </Typography>
        </StyledPlaceholder>
      </StyledDropZone>

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />
    </>
  );
}
