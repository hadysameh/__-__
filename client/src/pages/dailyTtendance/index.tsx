import { useQuery } from "react-query";
import getAttendance from "../../features/attendance/serverServices/getAttendance";
import { Table } from "react-bootstrap";
import getTodaysDate from "../../_helpers/getTodaysDate";

const splitDate = (date: any) => {
  return date.split("-");
};

const todaysDate = getTodaysDate();
const todaysDateParts = splitDate(todaysDate);

const checkYearAndMonth = (date: any): boolean => {
  if (date[0] == todaysDateParts[0] && date[1] == todaysDateParts[1]) {
    return true;
  }
  return false;
};

function DailyAttendance() {
  const {
    data: dailyAttendance,
    isSuccess: isDailyAttendanceSuccessed,
    error,
    refetch,
  } = useQuery(["dailyAttendance"], getAttendance, {
    staleTime: Infinity,
    cacheTime: 0,
  });

  return (
    <>
      {isDailyAttendanceSuccessed && (
        <>
          {!!dailyAttendance.todaysErrands.length && (
            <>
              <br />
              <h1>
                <u>مأموريات</u>
              </h1>
              <br />
              <Table
                striped
                bordered
                hover
                key={dailyAttendance.todaysErrands.id}
              >
                <thead className={""}>
                  <tr style={{ fontSize: "20px" }}>
                    <th scope="col" style={{ width: "10%" }}>
                      رتبة
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      اسم
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      الجهة
                    </th>
                    <th scope="col" style={{ width: "17%" }}>
                      من
                    </th>
                    <th scope="col" style={{ width: "17%" }}>
                      الى
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dailyAttendance.todaysErrands.map((errand: any) => {
                    return (
                      <tr style={{ fontSize: "20px" }} key={errand._id}>
                        <td>{errand.officer.rank.rank}</td>
                        <td>{errand.officer.name}</td>
                        <td>{errand.destination}</td>
                        <td>{errand.fromDate}</td>
                        <td>{errand.toDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          )}
          {!!dailyAttendance.todaysVacations.length && (
            <>
              <br />
              <h1>
                <u>الأجازات</u>
              </h1>
              <br />
              <Table
                striped
                bordered
                hover
                key={dailyAttendance.todaysVacations.id}
              >
                <thead className={""}>
                  <tr style={{ fontSize: "20px" }}>
                    <th scope="col" style={{ width: "10%" }}>
                      رتبة
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      اسم
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      نوع الاجازة
                    </th>
                    <th scope="col" style={{ width: "17%" }}>
                      من
                    </th>
                    <th scope="col" style={{ width: "17%" }}>
                      الى
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dailyAttendance.todaysVacations.map((vacation: any) => {
                    return (
                      <tr style={{ fontSize: "20px" }} key={vacation._id}>
                        <td>{vacation.officer.rank.rank}</td>
                        <td>{vacation.officer.name}</td>
                        <td>{vacation.type.vacationType}</td>
                        <td>{vacation.from}</td>
                        <td>{vacation.to}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          )}
          {!!dailyAttendance.AvailableOfficers.length && (
            <>
              <br />
              <h1>
                <u>الضباط المتواجدين</u>
              </h1>
              <br />
              <Table striped bordered hover>
                <thead className={""}>
                  <tr style={{ fontSize: "20px" }}>
                    <th scope="col">رتبة</th>
                    <th scope="col">اسم</th>
                    <th scope="col">الفرع</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyAttendance.AvailableOfficers.map((officer: any) => {
                    return (
                      <tr style={{ fontSize: "20px" }} key={officer._id}>
                        <td>{officer.rank.rank}</td>
                        <td>{officer.name}</td>
                        <td>{officer.branch.branchName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          )}
          {!!dailyAttendance.monthlyShift.length && (
            <>
              <br />
              <h1>
                <u>النوبتجيات</u>
              </h1>
              <br />
              <Table bordered hover>
                <thead className={""}>
                  <tr style={{ fontSize: "20px" }}>
                    <th>الزمن</th>
                    <th scope="col">قائد منوب</th>
                    <th scope="col">منوب القيادة الاستراتجية</th>
                    <th scope="col">ظابط نبطجى</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyAttendance.monthlyShift.map((shift: any) => {
                    const dateParts = splitDate(shift.date);
                    if (
                      Number(todaysDateParts[2]) - 1 ==
                      Number(dateParts[2])
                    ) {
                      return (
                        <tr style={{ fontSize: "20px" }} key={shift._id}>
                          {checkYearAndMonth(dateParts) && (
                            <>
                              <>
                                <td>امس</td>
                                <td>
                                  {shift.dutyManagerOfficer.rank.rank}/{" "}
                                  {shift.dutyManagerOfficer.name}
                                </td>
                                <td>
                                  {shift.strategicDutyManagerOfficer &&
                                    shift.strategicDutyManagerOfficer.rank
                                      .rank +
                                      "/ " +
                                      shift.strategicDutyManagerOfficer.name}
                                </td>
                                <td>
                                  {shift.shiftOfficer.rank.rank}/{" "}
                                  {shift.shiftOfficer.name}
                                </td>
                              </>
                            </>
                          )}
                        </tr>
                      );
                    }
                  })}
                  {dailyAttendance.monthlyShift.map((shift: any) => {
                    const dateParts = splitDate(shift.date);
                    return (
                      <tr style={{ fontSize: "20px" }} key={shift._id}>
                        {checkYearAndMonth(dateParts) && (
                          <>
                            {dateParts[2] == todaysDateParts[2] && (
                              <>
                                <td>اليوم</td>
                                <td>
                                  {shift.dutyManagerOfficer.rank.rank}/{" "}
                                  {shift.dutyManagerOfficer.name}
                                </td>
                                <td>
                                  {shift.strategicDutyManagerOfficer &&
                                    shift.strategicDutyManagerOfficer.rank
                                      .rank +
                                      "/ " +
                                      shift.strategicDutyManagerOfficer.name}
                                </td>
                                <td>
                                  {shift.shiftOfficer.rank.rank}/{" "}
                                  {shift.shiftOfficer.name}
                                </td>
                              </>
                            )}
                          </>
                        )}
                      </tr>
                    );
                  })}

                  {dailyAttendance.monthlyShift.map((shift: any) => {
                    const dateParts = splitDate(shift.date);
                    if (
                      Number(todaysDateParts[2]) + 1 ==
                      Number(dateParts[2])
                    ) {
                      return (
                        <tr style={{ fontSize: "20px" }} key={shift._id}>
                          {checkYearAndMonth(dateParts) && (
                            <>
                              <>
                                <td>باكر</td>
                                <td>
                                  {shift.dutyManagerOfficer.rank.rank}/{" "}
                                  {shift.dutyManagerOfficer.name}
                                </td>
                                <td>
                                  {shift.strategicDutyManagerOfficer &&
                                    shift.strategicDutyManagerOfficer.rank
                                      .rank +
                                      "/ " +
                                      shift.strategicDutyManagerOfficer.name}
                                </td>
                                <td>
                                  {shift.shiftOfficer.rank.rank}/{" "}
                                  {shift.shiftOfficer.name}
                                </td>
                              </>
                            </>
                          )}
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
    </>
  );
}
export default DailyAttendance;
