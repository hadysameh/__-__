import Card from "../../components/Card";

function Home() {
  return (
    <>
      <div className="" style={{ height: "80vh" }}>
        <div className="container" dir="rtl">
          <div className="row py-3 pt-3">
            <div className="col-xl-3 col-lg-6">
              <Card cardTitle="الأجازات " link="/vacations" />
            </div>
            <div className="col-xl-3 col-lg-6">
              <Card cardTitle="المأموريات" link="/errands" />
            </div>

            <div className="col-xl-3 col-lg-6">
              <Card cardTitle="النوبتاجيات" link="/shifts" />
            </div>
            <div className="col-xl-3 col-lg-6">
              <Card cardTitle="تمام الضباط" link="/dailyattendance" />
            </div>
          </div>
        </div>

        <div
          className="d-flex align-items-center flex-column mt-4"
          style={{ marginTop: "100px" }}
        >
          <img src="./edaraLogo.png" style={{ width: "25vw" }} />
          <div className="text-center fs-1">
            ادارة البحوث الفنية والتطوير
            <br />
            منظومة شئون الضباط
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
