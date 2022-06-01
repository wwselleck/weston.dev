export const classnames = (...classes: string[]) => {
  return classes.reduce((acc, curr) => {
    if(curr) {
      acc = acc + ' ' + curr;
    }
    return acc;
  }, '')
}
