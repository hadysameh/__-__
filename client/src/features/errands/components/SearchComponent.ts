import { useQuery } from "react-query";
import getCreateErrandsOptions from "../../../features/errands/serverApis/getCreateErrandsOptions";

interface IProps {
  sequenceNumber: any;
  fromDate: any;
  toDate: any;
  officer: any;
  errandType: any;
  destination: any;
  reason: any;
}
function SearchComponent(props: IProps) {
  const { data: errandOptions, isLoading: isErrandOptionsLoading } = useQuery(
    "getCreateErrandOptions",
    getCreateErrandsOptions,
    {
      staleTime: Infinity,
      cacheTime: 0,
    }
  );
}
export default SearchComponent;
