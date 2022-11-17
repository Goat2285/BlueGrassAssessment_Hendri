import {
  Box,
  Button,
  Card,
  CardHeader,
  CardProps,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconButtonAnimate } from 'src/components/animate';
import { CustomAvatar } from 'src/components/custom-avatar';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

type RowProps = {
  id: string;
  name: string;
  typeOfUpdate: string;
  avatar?: string;
};

interface Props extends CardProps {
  title: string;
  tableData: RowProps[];
}

export default function LandingRecentUpdates({ title, tableData, ...other }: Props) {
  const navigate = useNavigate();

  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset', minHeight: 310, height: 310 }}>
        <Scrollbar>
          <Table>
            <TableBody>
              {tableData.map((row) => (
                <LandingRecentUpdatesRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />

      <Box
        sx={{
          p: 2,
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
        }}
      >
        <Button
          size="small"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          onClick={() => {
            navigate('/dashboard/logs');
          }}
        >
          See All
        </Button>
      </Box>
    </Card>
  );
}

type LandingRecentUpdatesRowProps = {
  row: RowProps;
};

function LandingRecentUpdatesRow({ row }: LandingRecentUpdatesRowProps) {
  const handleDelete = () => {
    console.log('DELETE', row.id);
  };

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CustomAvatar alt={row.name} src={row.avatar} name={row.name} />
          <Stack>
            <Typography variant="subtitle2">{row.typeOfUpdate}</Typography>
            <Typography variant="body2">{row.name}</Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <IconButtonAnimate sx={{ width: 52, height: 52 }} onClick={handleDelete}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButtonAnimate>
      </TableCell>
    </TableRow>
  );
}
