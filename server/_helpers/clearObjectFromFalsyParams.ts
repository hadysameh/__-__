function clearObjectFromFalsyParams(obj: any) {
  Object.entries(obj).reduce(
    (a: any, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
}
export default clearObjectFromFalsyParams;
