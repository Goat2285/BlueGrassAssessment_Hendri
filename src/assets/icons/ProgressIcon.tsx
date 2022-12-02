import { Box, BoxProps } from "@mui/material";
import { memo } from "react";

function ProgressIcon({ ...other }: BoxProps) {
  return (
    <Box {...other}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.16" cx="12" cy="12" r="12" fill="#54D62C"/>
        <path d="M18 8.66667C18.0063 8.62021 18.0063 8.57312 18 8.52667C17.9942 8.48753 17.9829 8.44938 17.9666 8.41333C17.949 8.38075 17.929 8.34955 17.9066 8.32C17.8813 8.27784 17.8498 8.23965 17.8133 8.20667L17.7333 8.16C17.6948 8.1313 17.6521 8.10881 17.6066 8.09333H17.4733C17.4327 8.054 17.3852 8.02237 17.3333 8H14C13.6318 8 13.3333 8.29848 13.3333 8.66667C13.3333 9.03486 13.6318 9.33333 14 9.33333H15.8866L13.22 12.4733L10.34 10.76C10.0581 10.5924 9.6963 10.6546 9.48662 10.9067L6.15329 14.9067C6.03992 15.0427 5.98534 15.2183 6.0016 15.3946C6.01786 15.571 6.10362 15.7336 6.23995 15.8467C6.3599 15.9461 6.51085 16.0003 6.66662 16C6.86491 16.0003 7.05305 15.9124 7.17995 15.76L10.1466 12.2L12.9933 13.9067C13.272 14.072 13.6293 14.0129 13.84 13.7667L16.6666 10.4667V12C16.6666 12.3682 16.9651 12.6667 17.3333 12.6667C17.7015 12.6667 18 12.3682 18 12V8.66667Z" fill="#54D62C"/>
      </svg>
    </Box>
  )
}

export default memo(ProgressIcon)