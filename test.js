const reportNames = R.pluck('name', reports).map((r, i) => {
    label: r,
    value: i
  }
);
