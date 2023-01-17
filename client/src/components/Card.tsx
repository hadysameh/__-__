import { Link } from "react-router-dom";

interface IProps {
  cardTitle: string;
  link: string;
  backgroundColor?: string;
  textColor?: string;
}
export default function Card(props: IProps) {
  return (
    <div
      className="card card-stats mb-4 mb-xl-0 py-3 "
      style={{
        background: props.backgroundColor ? props.backgroundColor : "",
        color: props.textColor ? props.textColor : "#000",
      }}
    >
      <Link to={props.link} className="nav-link">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title text-uppercase  mb-0 fs-4">
                {props.cardTitle}
              </h5>
              <span className="h2 font-weight-bold mb-0">{}</span>
            </div>
            <div className="col-auto">
              <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                <i className="fas fa-chart-pie"></i>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
