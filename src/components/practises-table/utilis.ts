import { RowProps } from "./PractisesTable";

export function applyFilter({
  inputData,
  comparator,
  filterPractiseName,
}: {
  inputData: RowProps[];
  comparator: (a: any, b: any) => number;
  filterPractiseName: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterPractiseName) {
    inputData = inputData.filter(
      (user) => user.practiseName.toLowerCase().indexOf(filterPractiseName.toLowerCase()) !== -1
    );
  }

  return inputData;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}