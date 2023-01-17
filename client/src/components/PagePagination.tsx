interface IProps {
  pageNumber: number;
  setPageNumber: any;
  rowsLength: number;
  rowsPerPage: number;
}
function PagePagination(props: IProps) {
  return (
    <>
      <div className="d-flex flex-column text-center">
        <span className="fs-3">رقم الصفحة :{props.pageNumber}</span>
        <nav aria-label="Page navigation example" className="fs-4">
          <ul className="pagination">
            {props.pageNumber > 1 && (
              <li className="page-item">
                <button
                  className="page-link fs-3"
                  onClick={() => {
                    props.setPageNumber(props.pageNumber - 1);
                  }}
                >
                  الصفحة السابقة
                </button>
              </li>
            )}
            {props.rowsLength >= props.rowsPerPage && (
              <li className="page-item">
                <button
                  className="page-link fs-3"
                  onClick={() => {
                    props.setPageNumber(props.pageNumber + 1);
                  }}
                >
                  الصفحةالتالية
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
export default PagePagination;
